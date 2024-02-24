import { Observable } from "rxjs";
import UserEntity from "../entity/user.entity";

export interface UserRepositoryInterface {

  getUsers(): Observable<UserEntity[]>;

  createUser(user: UserEntity): Observable<UserEntity>;

}
