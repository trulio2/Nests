import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { CreateEventDto, UpdateEventDto } from './dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventsRepository.findOne(id);

    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    return event;
  }

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsRepository.create(createEventDto);
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);

    return this.eventsRepository.update(event, updateEventDto);
  }

  async remove(id: string): Promise<Event> {
    const event = await this.findOne(id);

    return this.eventsRepository.remove(event);
  }
}
