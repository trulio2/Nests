import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Task } from './task.entity';
import { GetTasksFilterDto, CreateTaskDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private baseRepository: Repository<Task>,
  ) {}

  private logger = new Logger('TasksRepository');

  async find(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
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

  findOne(id: string, user: User): Promise<Task> {
    return this.baseRepository.findOneBy({ id, user });
  }

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.baseRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    return this.baseRepository.save(task);
  }

  delete(task: Task): Promise<Task> {
    return this.baseRepository.remove(task);
  }

  update(task: Task): Promise<Task> {
    return this.baseRepository.save(task);
  }
}
