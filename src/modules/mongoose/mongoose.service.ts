import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class MongooseService implements MongooseOptionsFactory {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri:
        'mongodb://localhost:27017/' + (this.request.query.tenant || 'stella'),
    };
  }
}
