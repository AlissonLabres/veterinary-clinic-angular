import { Observable } from "rxjs";
import { AnimalRepositoryInterface } from "../../repository/animal-repository.interface";
import { Injectable, inject } from "@angular/core";
import { AnimalRepositoryToken } from "../../../config/injection-token.repositories";


@Injectable({ providedIn: 'root' })
export class CreateAnimalUsecase {

  private readonly animalRepository: AnimalRepositoryInterface = inject(AnimalRepositoryToken);

  execute(input: any): Observable<any> {
    const animal = {
      user_id: input.user_id,
      animal_name: input.name,
      animal_age: input.age,
      animal_weight: input.weight,
      animal_type: input.type,
      animal_breed: input.breed,
    };

    return this.animalRepository.createAnimal(animal);
  }
}
