import { Injectable, inject } from '@angular/core';
import { AnimalRepositoryToken } from '../../../config/injection-token.repositories';
import { map, Observable } from 'rxjs';
import { AnimalOutput } from './animal-output';

@Injectable({ providedIn: 'root' })
export class GetAllAnimalsByUserUsecase {
  protected animalRepository = inject(AnimalRepositoryToken);

  execute(user_id: number): Observable<AnimalOutput[]> {
    return this.animalRepository
      .getAllAnimalsByUser(user_id)
      .pipe(map(({ animals }) => animals));
  }
}
