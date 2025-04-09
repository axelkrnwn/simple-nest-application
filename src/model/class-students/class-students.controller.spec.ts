import { Test, TestingModule } from '@nestjs/testing';
import { ClassStudentsController } from './class-students.controller';
import { ClassStudentsService } from './class-students.service';

describe('ClassStudentsController', () => {
  let controller: ClassStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassStudentsController],
      providers: [ClassStudentsService],
    }).compile();

    controller = module.get<ClassStudentsController>(ClassStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
