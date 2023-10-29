import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities';
import { CatsService } from './cats.service';
import { CreateCatDto, UpdateCatDto, GetCatsFilterDto } from './dto';
import { Cat } from './entities';

@Controller('cats')
@UseGuards(AuthGuard())
export class CatsController {
  private readonly logger = new Logger('CatsController');

  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(
    @Body() createCatDto: CreateCatDto,
    @GetUser() user: User,
  ): Promise<Cat> {
    const cat = await this.catsService.create(createCatDto, user);
    this.logger.verbose(`Created cat with ID "${cat.id}"`);

    return cat;
  }

  @Get()
  async findAll(
    @Query() filterDto: GetCatsFilterDto,
    @GetUser() user: User,
  ): Promise<Cat[]> {
    const cats = await this.catsService.findAll(filterDto, user);
    this.logger.verbose(`Found ${cats.length} cats`);

    return cats;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Cat> {
    const cat = await this.catsService.findOne(id, user);
    this.logger.verbose(`Found cat with ID "${id}"`);

    return cat;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCatDto: UpdateCatDto,
    @GetUser() user: User,
  ): Promise<Cat> {
    const cat = await this.catsService.update(id, updateCatDto, user);
    this.logger.verbose(`Updated cat with ID "${id}"`);

    return cat;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Cat> {
    const cat = await this.catsService.remove(id, user);
    this.logger.verbose(`Removed cat with ID "${id}"`);

    return cat;
  }
}
