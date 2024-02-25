import { Injectable } from "@angular/core";
import { UserRepositoryInterface } from "../../domain/repository/user-repository.interface";
import { HttpClient } from "@angular/common/http";
import UserEntity from "../../domain/entity/user.entity";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserRepositoryService implements UserRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  getUsers(): Observable<UserEntity[]> {
    return this.httpClient.get<UserEntity[]>('http://localhost:3000/users')
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.httpClient.post<UserEntity>('http://localhost:3000/user', user);
  }
}
