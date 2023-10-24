import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../auth/user.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.deleteTaskById(id, user);
  }

  updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    return this.tasksRepository.updateTaskStatusById(
      id,
      updateTaskStatusDto,
      user,
    );
  }
}
