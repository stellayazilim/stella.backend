import { isByteLength } from 'class-validator';
import { ParseObjectIdPipe } from '../parse.objectid.pipe';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
describe('Test parseObjectId pipe', () => {
  let pipe: ParseObjectIdPipe;

  beforeEach(() => {
    pipe = new ParseObjectIdPipe();
  });

  it('should transfor valid string objectid to mongoose.Types.ObjectId', () => {
    const spy = jest.spyOn(Types.ObjectId, 'isValid');
    const result = pipe.transform('6469a1f65dfe850a92a0b303');
    expect(spy).toBeCalledWith('6469a1f65dfe850a92a0b303');
    expect(result).toBeInstanceOf(Types.ObjectId);
  });

  it('should throw BadRequestException on invalid string', () => {
    try {
      pipe.transform('12345');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
