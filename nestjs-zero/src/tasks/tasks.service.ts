import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    return this.tasks.filter((task) => {
      if (status && task.status !== status) {
        return false;
      }

      if (
        search &&
        !task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
        !task.description
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    const task = this.tasks[taskIndex];

    this.tasks.splice(taskIndex, 1);

    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);

    task.status = status;

    return task;
  }
}
