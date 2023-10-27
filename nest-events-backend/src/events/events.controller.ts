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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { Event } from './entities/event.entity';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger('EventsController');

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    const events = await this.eventsService.findAll();
    this.logger.verbose(`Found ${events.length} events`);

    return events;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    const event = await this.eventsService.findOne(id);
    this.logger.verbose(`Found event with ID "${id}"`);

    return event;
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    const event = await this.eventsService.create(createEventDto);
    this.logger.verbose(`Created event with ID "${event.id}"`);

    return event;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.eventsService.update(id, updateEventDto);
    this.logger.verbose(`Updated event with ID "${id}"`);

    return event;
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    const event = await this.eventsService.remove(id);
    this.logger.verbose(`Removed event with ID "${id}"`);

    return event;
  }
}
