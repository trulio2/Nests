import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}

  find(): Promise<Event[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Event> {
    return this.repository.findOneBy({ id });
  }

  create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.repository.create(createEventDto);

    return this.repository.save(event);
  }

  update(event: Event, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.repository.save({ ...event, ...updateEventDto });
  }

  remove(event: Event): Promise<Event> {
    return this.repository.remove(event);
  }
}
