import { AbstractRepo } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel as IM } from '@nestjs/mongoose';
import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationsRepo extends AbstractRepo<ReservationDocument> {
  protected readonly logger = new Logger(ReservationsRepo.name);

  constructor(@IM(ReservationDocument.name) model: Model<ReservationDocument>) {
    super(model);
  }
}
