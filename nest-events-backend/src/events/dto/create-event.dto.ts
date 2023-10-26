import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(3, 250)
  name: string;

  @IsString()
  @Length(3, 250)
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  @Length(3, 250)
  address: string;
}
