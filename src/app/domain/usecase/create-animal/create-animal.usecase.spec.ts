import { TestBed } from '@angular/core/testing';

import { AnimalRepositoryToken } from '../../../config/injection-token.repositories';
import { AnimalRepositoryInterface } from '../../repository/animal-repository.interface';
import { CreateAnimalUsecase } from './create-animal.usecase';

describe('CreateAnimalUsecase', () => {
  let usecase: CreateAnimalUsecase;
  let repository: AnimalRepositoryInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AnimalRepositoryToken,
          useValue: { createAnimal: jest.fn() },
        },
      ],
    });

    repository = TestBed.inject(AnimalRepositoryToken);
    usecase = TestBed.inject(CreateAnimalUsecase);
  });

  it('should create an animal', () => {
    const input = {
      user_id: 1,
      name: 'Dog',
      age: 2,
      weight: 10,
      type: 'Dog',
      breed: 'Bulldog',
    };
    const output = {
      user_id: 1,
      animal_name: 'Dog',
      animal_age: 2,
      animal_weight: 10,
      animal_type: 'Dog',
      animal_breed: 'Bulldog',
    };

    usecase.execute(input);

    expect(repository.createAnimal).toHaveBeenCalledWith(output);
  });
});
