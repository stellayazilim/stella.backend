import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
describe('App module', () => {
  let appModule: AppModule;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = app.get<AppModule>(AppModule);
  });

  it('should defined', () => {
    expect(appModule).toBeDefined();
  });
});
