import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../auth/entities';
import { CatsRepository } from './cats.repository';
import { CreateCatDto, UpdateCatDto, GetCatsFilterDto } from './dtos';
import { Cat } from './entities';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  create(createCatDto: CreateCatDto, user: User): Promise<Cat> {
    return this.catsRepository.create(createCatDto, user);
  }

  async findAll(filterDto: GetCatsFilterDto, user: User): Promise<Cat[]> {
    try {
      const cats = await this.catsRepository.find(filterDto, user);

      return cats;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string, user: User): Promise<Cat> {
    const cat = await this.catsRepository.findOne(id, user);

    if (!cat) {
      throw new NotFoundException(`Cat with ID "${id}" not found`);
    }

    return cat;
  }

  async update(
    id: string,
    updateCatDto: UpdateCatDto,
    user: User,
  ): Promise<Cat> {
    const cat = await this.findOne(id, user);

    return this.catsRepository.update(cat, updateCatDto);
  }

  async remove(id: string, user: User): Promise<Cat> {
    const cat = await this.findOne(id, user);

    return this.catsRepository.remove(cat);
  }
}
