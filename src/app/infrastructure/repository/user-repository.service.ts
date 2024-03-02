import { Injectable } from "@angular/core";
import { UserRepositoryInterface } from "../../domain/repository/user-repository.interface";
import { HttpClient } from "@angular/common/http";
import UserEntity from "../../domain/entity/user.entity";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";

@Injectable({ providedIn: 'root' })
export class UserRepositoryService implements UserRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  getUsers(): Observable<UserEntity[]> {
    return this.httpClient.get<UserEntity[]>(`${environment.api}/users`)
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.httpClient.post<UserEntity>(`${environment.api}/user`, user);
  }
}
