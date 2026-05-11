import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query('projectId') projectId: string) {
    return this.tasksService.findAll(projectId);
  }

  @Post()
  create(@Body('projectId') projectId: string, @Body('task') task: Partial<Task>) {
    return this.tasksService.create(projectId, task);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updates: Partial<Task>) {
    return this.tasksService.update(id, updates);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
