import { HttpClient } from "@angular/common/http";
import { UserRepositoryService } from "./user-repository.service";
import { TestBed } from "@angular/core/testing";
import UserEntity from "../../domain/entity/user.entity";
import { of, take } from "rxjs";

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(UserRepositoryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value when dispatch getUsers on success', () => {
    const outcome: UserEntity = {
      user_email: 'testing@mock.com.br',
      user_name: 'Mock User',
      user_phone: '00000000000',
      user_animals: [],
    };

    jest.spyOn(httpClient, 'get').mockReturnValue(of(outcome));

    service.getUsers()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });

  it('should return a value when dispatch createUser on success', () => {
    const user = {
      user_email: 'testing@mock.com.br',
      user_name: 'Mock User',
      user_phone: '00000000000',
      user_animals: [],
    };

    jest.spyOn(httpClient, 'post').mockReturnValue(of(user));

    service.createUser(user)
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(user));
  });
});
