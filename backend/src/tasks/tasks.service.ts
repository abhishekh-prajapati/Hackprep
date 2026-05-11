import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(projectId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { projectId } });
  }

  async create(projectId: string, task: any): Promise<Task> {
    const { isNew, isEdited, hasLiked, ...taskData } = task;
    const newTask = this.tasksRepository.create({
      ...taskData,
      projectId,
      content: taskData.content || '',
      columnId: taskData.columnId || 'planning',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || 'Unassigned',
      assigneePhoto: taskData.assigneePhoto || null,
      reactions: 0,
      tags: [],
    });
    return this.tasksRepository.save(newTask) as unknown as Promise<Task>;
  }

  async update(id: string, updates: Partial<Task>): Promise<Task | null> {
    // Strip out frontend-only properties before updating DB
    const { isNew, isEdited, hasLiked, ...dbUpdates }: any = updates;
    await this.tasksRepository.update(id, dbUpdates);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);
    return result.affected! > 0;
  }
}
