import { Injectable } from '@angular/core';
import { UserRepositoryInterface } from '../../domain/repository/user-repository.interface';
import { HttpClient } from '@angular/common/http';
import UserEntity from '../../domain/entity/user.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class UserRepositoryService implements UserRepositoryInterface {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<UserEntity[]> {
    return this.httpClient
      .get<UserEntity[]>(`${environment.api}/users`)
      .pipe(
        map((users: UserEntity[]) =>
          users.filter(
            (user: UserEntity) => user.user_animals.filter(Number).length > 0
          )
        )
      );
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.httpClient.post<UserEntity>(`${environment.api}/user`, user);
  }
}
