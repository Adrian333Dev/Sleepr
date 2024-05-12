import { Module } from '@nestjs/common';

import { DBModule, LoggerModule } from '@app/common';

import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepo } from './reservations.repo';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

@Module({
  imports: [
    DBModule,
    DBModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepo],
})
export class ReservationsModule {
  constructor() {
    console.log('ReservationsModule loaded!!!');
  }
}
