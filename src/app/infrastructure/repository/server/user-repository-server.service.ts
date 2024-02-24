import { Injectable } from "@angular/core";
import { UserRepositoryInterface } from "../../../domain/repository/user-repository.interface";
import { HttpClient } from "@angular/common/http";
import UserEntity from "../../../domain/entity/user.entity";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserRepositoryServerService implements UserRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  getUsers(): Observable<UserEntity[]> {
    return this.httpClient.get<UserEntity[]>('http://localhost:3000/users')
  }

  createUser(user: UserEntity): Observable<UserEntity> {
    return this.httpClient.post<UserEntity>('http://localhost:3000/user', user);
  }

  // getAllSchedules(): Observable<ScheduleEntity[]> {
  //   return this.httpClient.get<ScheduleEntity[]>('http://localhost:3000/schedule/1')
  // }

  // sendSchedule(bullet: BulletEntity): Observable<void> {
  //   const input = {
  //     user_id: 1,
  //     medical_id: 1,
  //     animal_id: 1,
  //     bullet_code: bullet.code
  //   };

  //   return this.httpClient.post<void>('http://localhost:3000/schedule/appointment', input);
  // }

  // getBulletsAvailable(): Observable<BulletEntity[]> {
  //   return this.httpClient.get<{ bullets: BulletEntity[] }>('http://localhost:3000/bullets')
  //     .pipe(map(({ bullets }) => bullets))
  // }
}
