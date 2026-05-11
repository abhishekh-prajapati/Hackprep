'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { 
  verticalListSortingStrategy,
  SortableContext, 
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Task, Column } from '@/types';
import { TaskCard } from './TaskCard';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/app/workspace/page.module.css';

const defaultCols: Column[] = [
  { id: 'planning', title: 'Planning' },
  { id: 'design', title: 'Design' },
  { id: 'developing', title: 'Developing' },
  { id: 'testing', title: 'Testing' },
  { id: 'completed', title: 'Completed' },
];

interface TaskBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  userProfile: { name: string; avatar: string };
  projectId: string;
  members?: any[];
}

export function TaskBoard({ tasks, setTasks, userProfile, projectId, members = [] }: TaskBoardProps) {
  const { user, token } = useAuth();
  const [columns] = useState<Column[]>(defaultCols);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    const topScroll = topScrollRef.current;
    if (!board || !topScroll) return;

    const handleBoardScroll = () => { topScroll.scrollLeft = board.scrollLeft; };
    const handleTopScroll = () => { board.scrollLeft = topScroll.scrollLeft; };

    board.addEventListener('scroll', handleBoardScroll);
    topScroll.addEventListener('scroll', handleTopScroll);

    return () => {
      board.removeEventListener('scroll', handleBoardScroll);
      topScroll.removeEventListener('scroll', handleTopScroll);
    };
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    if (!isActiveATask) return;

    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isOverATask) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === activeId);
        const overIndex = prevTasks.findIndex((t) => t.id === overId);

        if (prevTasks[activeIndex].columnId !== prevTasks[overIndex].columnId) {
          prevTasks[activeIndex].columnId = prevTasks[overIndex].columnId;
        }

        return arrayMove(prevTasks, activeIndex, overIndex);
      });
    }

    if (isOverAColumn) {
      setTasks((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === activeId);
        prevTasks[activeIndex].columnId = overId as string;
        return arrayMove(prevTasks, activeIndex, activeIndex);
      });
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);

    if (over && active.id !== over.id) {
      const activeTask = tasks.find(t => t.id === active.id);
      if (activeTask) {
        // Background sync
        fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/tasks/${activeTask.id}`, {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ columnId: activeTask.columnId }),
        }).catch(err => console.error('Drag sync failed:', err));
      }
    }
  }

  async function deleteTask(id: string) {
    const originalTasks = [...tasks];
    // Optimistic update
    setTasks(tasks.filter(t => t.id !== id));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Delete failed');
    } catch (error) {
      console.error('Failed to delete task:', error);
      setTasks(originalTasks); // Rollback
    }
  }

  async function updateTask(id: string, updates: Partial<Task>) {
    const originalTasks = [...tasks];
    // Optimistic update
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Update failed');
      const updatedTask = await response.json();
      // Sync with server data (id, timestamps, etc)
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedTask, isNew: false } : t));
    } catch (error) {
      console.error('Failed to update task:', error);
      setTasks(originalTasks); // Rollback
    }
  }

  async function createTask(columnId: string) {
    const tempId = 'temp-' + Date.now();
    const optimisticTask: Task = {
      id: tempId,
      projectId,
      columnId,
      content: '',
      priority: 'medium',
      assignee: user?.name || 'Unassigned',
      assigneePhoto: user?.profilePhoto || null,
      reactions: 0,
      tags: [],
      isNew: true,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, optimisticTask]);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api'}/tasks`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          projectId, 
          task: { columnId, content: '', priority: 'medium', assignee: user?.name || 'Unassigned', assigneePhoto: user?.profilePhoto || null } 
        }),
      });
      
      if (response.ok) {
        const newTask = await response.json();
        setTasks(prev => prev.map(t => t.id === tempId ? { ...newTask, isNew: true } : t));
      } else {
        throw new Error('Create failed');
      }
    } catch (error) {
      console.error('Failed to create task:', error);
      setTasks(prev => prev.filter(t => t.id !== tempId)); // Rollback
    }
  }

  const totalWidth = (columns.length * 272) + ((columns.length - 1) * 12) + 40;

  return (
    <div className="flex flex-col gap-2">
      <div ref={topScrollRef} className={styles.topScrollbar}>
        <div style={{ width: `${totalWidth}px`, height: '1px' }} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div ref={boardRef} className={styles.boardContent} style={{ overflowX: 'auto', paddingBottom: '10px' }}>
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              tasks={tasks.filter((t) => t.columnId === col.id)}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              userProfile={userProfile}
              members={members}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard 
              task={activeTask} 
              deleteTask={deleteTask} 
              updateTask={updateTask} 
              members={members} 
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function ColumnContainer({ column, tasks, createTask, deleteTask, updateTask, userProfile, members }: any) {
  const tasksIds = useMemo(() => tasks.map((t: any) => t.id), [tasks]);
  const { setNodeRef } = useSortable({ id: column.id, data: { type: 'Column', column } });

  return (
    <div ref={setNodeRef} className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          <div className={styles.columnDot} />
          {column.title}
          <span className={styles.columnCount}>{tasks.length}</span>
        </div>
      </div>

      <div className={styles.taskList}>
        <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task: any) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              deleteTask={deleteTask} 
              updateTask={updateTask} 
              members={members}
            />
          ))}
        </SortableContext>
      </div>

      {column.id === 'planning' && (
        <div className="p-3 mt-auto">
          <button 
            onClick={() => createTask(column.id)} 
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-brand-border text-brand-grey hover:border-brand-orange hover:text-brand-orange transition-all duration-200 group"
          >
            <Plus size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-wider">Add New Task</span>
          </button>
        </div>
      )}
    </div>
  );
}
