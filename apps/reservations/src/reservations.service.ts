import { Injectable } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepo } from './reservations.repo';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationsRepo) {}

  async create(createReservationDto: CreateReservationDto) {
    return await this.reservationRepo.create({
      ...createReservationDto,
      userId: '1', // TODO: get user id from request
    });
  }

  async findAll() {
    return await this.reservationRepo.find({});
  }

  async findOne(_id: string) {
    return await this.reservationRepo.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepo.findOneAndUpdate(
      { _id },
      updateReservationDto,
    );
  }

  async remove(_id: string) {
    return await this.reservationRepo.findOneAndDelete({ _id });
  }
}
