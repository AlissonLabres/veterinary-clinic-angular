import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimalRepositoryService {
  constructor(private httpClient: HttpClient) {}

  createAnimal(input: any) {
    return this.httpClient.post(`${environment.api}/animal`, input);
  }

  getAllAnimalsByUser(user_id: number): Observable<any> {
    return this.httpClient.get(`${environment.api}/animal/${user_id}`);
  }
}
