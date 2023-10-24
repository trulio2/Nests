import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private baseRepository: Repository<Task>,
  ) {}

  private logger = new Logger('TasksRepository');

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.baseRepository.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to getTasks "${user.username}" ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.baseRepository.findOneBy({ id, user });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.baseRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return this.baseRepository.save(task);
  }

  async deleteTaskById(id: string, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    return this.baseRepository.remove(task);
  }

  async updateTaskStatusById(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    const { status } = updateTaskStatusDto;

    task.status = status;

    return this.baseRepository.save(task);
  }
}
