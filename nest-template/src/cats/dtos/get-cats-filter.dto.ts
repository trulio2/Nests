import { IsString, IsOptional } from 'class-validator';

export class GetCatsFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  age?: number;
}
