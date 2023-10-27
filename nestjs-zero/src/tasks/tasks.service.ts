import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { User } from '../auth/user.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.find(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne(id, user);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.create(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne(id, user);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return this.tasksRepository.delete(task);
  }

  async updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne(id, user);
    const { status } = updateTaskStatusDto;

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    task.status = status;

    return this.tasksRepository.update(task);
  }
}
