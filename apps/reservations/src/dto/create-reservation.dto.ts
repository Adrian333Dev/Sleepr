import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  invoiceId: string;
}
