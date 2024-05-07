import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepo<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(data: Omit<TDocument, '_id'>): Promise<TDocument> {
    this.logger.debug(`Creating a new document...`);
    return this.model.create(data);
  }

  async findOne(filter: FilterQuery<TDocument>): Promise<TDocument> {
    this.logger.debug(`Finding a document...`);
    const document = await this.model.findOne(filter).lean<TDocument>(true);
    if (!document) {
      this.logger.warn(
        `Document with filter ${JSON.stringify(filter)} not found`,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filter: FilterQuery<TDocument>,
    data: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.debug(`Finding and updating a document...`);
    const document = await this.model
      .findOneAndUpdate(filter, data, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn(
        `Document with filter ${JSON.stringify(filter)} not found`,
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filter: FilterQuery<TDocument>): Promise<TDocument[]> {
    this.logger.debug(`Finding documents...`);
    return this.model.find(filter).lean<TDocument[]>(true);
  }

  async findOneAndDelete(filter: FilterQuery<TDocument>): Promise<TDocument> {
    this.logger.debug(`Finding and deleting a document...`);
    return this.model.findOneAndDelete(filter).lean<TDocument>(true);
  }
}
