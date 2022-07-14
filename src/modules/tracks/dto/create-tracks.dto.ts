import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { isNull } from 'lodash';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  artistId: string | null;

  @ValidateIf((_, value) => !isNull(value))
  @IsUUID('4')
  albumId: string | null;
}
