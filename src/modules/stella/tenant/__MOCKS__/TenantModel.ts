/* eslint-disable @typescript-eslint/no-unused-vars */
import { TenantCreateDto } from '../dto/tenant.create.dto';

export class MockTenantModel {
  constructor(public data?: TenantCreateDto & { _id: string }) {}

  save() {
    return this.data;
  }

  async create(data?: TenantCreateDto) {
    this.data = { ...data, _id: '646a97180cb6a35a81925bdd' };
    return this.data;
  }

  findOne({ _id }) {
    return this.data;
    // test
  }
}
