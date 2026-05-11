'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Priority } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/app/workspace/page.module.css';
import { Edit2, Trash2, ThumbsUp, X, Check } from 'lucide-react';
import { Avatar } from './Avatar';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  userProfile?: any;
  filterUser?: string | null;
  members: any[];
}

export function TaskCard({ task, deleteTask, updateTask, filterUser, members = [] }: TaskCardProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(task.isNew || false);
  const [editContent, setEditContent] = useState(task.content);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const isDimmed = filterUser && task.assignee !== filterUser;

  const dndStyle = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : (isDimmed ? 0.4 : 1),
    zIndex: isDragging ? 1000 : 1,
  } as React.CSSProperties;

  const handleSave = () => {
    if (editContent.trim() === '') return; // Prevent saving empty content

    updateTask(task.id, { 
      content: editContent, 
      isNew: false,
      isEdited: true 
    });
    setIsEditing(false);
  };

  const cyclePriority = () => {
    const priorities: Priority[] = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(task.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    updateTask(task.id, { priority: priorities[nextIndex] });
  };

  const getPriorityStyleClass = (priority: Priority) => {
    return ''; // Priority color strip removed for cleaner look
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={dndStyle} className={`${styles.taskCard} ${getPriorityStyleClass(task.priority)}`} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={dndStyle}
      className={`${styles.taskCard} ${getPriorityStyleClass(task.priority)}`}
      {...attributes}
      {...listeners}
    >
      <div className={styles.taskHeader}>
        <div className="flex items-center gap-2 flex-1">
          {task.assignee && (
            <div title={task.assignee} className="cursor-help">
              <Avatar 
                username={task.assignee} 
                src={(() => {
                  const member = (members ?? []).find(m => m.name === task.assignee);
                  return member?.profilePhoto || task.assigneePhoto || (task.assignee === user?.name ? user?.profilePhoto : null);
                })()} 
                size={22} 
              />
            </div>
          )}
        </div>

        <div className={styles.taskActions}>
          <button 
            className={styles.taskActionBtn}
            onPointerDown={(e) => { e.stopPropagation(); setEditContent(task.content); setIsEditing(true); }}
          >
            <Edit2 size={12} />
          </button>
          <button 
            className={styles.taskActionBtn}
            onPointerDown={(e) => { e.stopPropagation(); deleteTask(task.id); }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {isEditing ? (
        <div 
          onPointerDown={(e) => e.stopPropagation()} 
          onKeyDown={(e) => e.stopPropagation()} // Stop spacebar/etc from triggering DnD
          className="flex flex-col"
        >
          <textarea
            autoFocus
            className={styles.editInput}
            value={editContent}
            placeholder="Describe the objective..."
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
              if (e.key === 'Escape') setIsEditing(false);
            }}
          />
          {(members ?? []).length > 1 && (
            <div className="flex flex-col gap-1 mt-4 mb-2 px-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assign Member</label>
              <select 
                className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 outline-none focus:border-brand-orange/30 transition-all"
                value={task.assignee}
                onChange={(e) => {
                  const name = e.target.value;
                  const member = (members ?? []).find(m => m.name === name);
                  if (member) {
                    updateTask(task.id, { 
                      assignee: member.name, 
                      assigneePhoto: member.profilePhoto 
                    });
                  }
                }}
              >
                {members.map(m => (
                  <option key={m.id} value={m.name}>
                    {m.name} {m.id === user?.id ? '(You)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-end mt-4 px-1 pt-4 border-t border-slate-50 gap-2">
            <button 
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"
              onPointerDown={() => {
                if (task.isNew) deleteTask(task.id);
                else setIsEditing(false);
              }}
            >
              <X size={14} />
            </button>
            <button 
              className={cn(
                "px-6 py-2 rounded-xl text-white font-black text-[11px] uppercase tracking-wider transition-all",
                editContent.trim() === '' 
                  ? "bg-slate-200 cursor-not-allowed shadow-none" 
                  : "bg-brand-orange shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95"
              )}
              disabled={editContent.trim() === ''}
              onPointerDown={(e) => {
                if (editContent.trim() !== '') handleSave();
              }}
            >
              Save Objective
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.taskContent}>
          {task.content || <span className="text-slate-300 italic font-medium">No description provided...</span>}
        </div>
      )}

      <div className={styles.taskFooter}>
        <div 
          className={styles.reactionBox}
          onPointerDown={(e) => { 
            e.stopPropagation(); 
            updateTask(task.id, { 
              reactions: (task.reactions || 0) + (task.hasLiked ? -1 : 1), 
              hasLiked: !task.hasLiked 
            });
          }}
        >
          <ThumbsUp 
            size={12} 
            className={task.hasLiked ? 'fill-current' : ''}
          />
          <span>{task.reactions || 0}</span>
        </div>
        
        {task.isEdited && (
          <span className="text-[10px] font-bold text-slate-300 italic">Edited</span>
        )}
      </div>
    </div>
  );
}
