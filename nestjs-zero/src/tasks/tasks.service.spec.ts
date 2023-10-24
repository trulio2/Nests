import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';

const mockTasksRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Test user',
  id: 'Test-id',
  password: 'Test-password',
  tasks: [],
};

const mockTask = {
  title: 'Test task',
  description: 'Test description',
  id: 'Test-id',
  status: TaskStatus.OPEN,
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.find.mockResolvedValue('mockValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('mockValue');
    });
  });

  describe('getTasksById', () => {
    it('calls TasksRepository.getTasksById and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('mockId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TasksRepository.getTasksById and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('mockId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
