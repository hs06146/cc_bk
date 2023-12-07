import { Injectable } from '@nestjs/common';
import { Allergy } from './entities/allergy.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IAllergiesServiceBulkInsert,
  IAllergiesServiceFindByNames,
} from './interfaces/allergies-service.interface';

@Injectable()
export class AllergiesService {
  constructor(
    @InjectRepository(Allergy)
    private readonly allergyRepository: Repository<Allergy>,
  ) {}

  findByNames({ allergies }: IAllergiesServiceFindByNames): Promise<Allergy[]> {
    return this.allergyRepository.find({
      where: { name: In(allergies) },
    });
  }

  bulkInsert({ names }: IAllergiesServiceBulkInsert) {
    return this.allergyRepository.insert(names); // bulk-insert(배열이 들어갔을 때 배열에 들어간 내용이 한 번에 저장됨)
  }
}
