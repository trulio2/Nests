import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  age: number;
}
