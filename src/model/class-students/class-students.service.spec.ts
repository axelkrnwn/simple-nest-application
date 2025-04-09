import { Test, TestingModule } from '@nestjs/testing';
import { ClassStudentsService } from './class-students.service';

describe('ClassStudentsService', () => {
  let service: ClassStudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassStudentsService],
    }).compile();

    service = module.get<ClassStudentsService>(ClassStudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
