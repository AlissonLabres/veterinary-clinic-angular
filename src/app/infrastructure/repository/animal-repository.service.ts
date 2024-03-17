import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environments";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AnimalRepositoryService {

  constructor(private httpClient: HttpClient) { }

  createAnimal(input: any) {
    return this.httpClient
      .post(`${environment.api}/animal`, input)
      .pipe();
  }
}
