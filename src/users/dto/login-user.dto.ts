import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LoinUserDto {
  @ApiProperty()
  @IsString()
  public_address: string;

  @ApiProperty()
  @IsString()
  signature?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  signature_message?: string;
}
