import { HttpClient } from "@angular/common/http";
import { AnimalRepositoryService } from "./animal-repository.service";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environments";
import { of } from "rxjs";

describe('AnimalRepositoryService', () => {

  let service: AnimalRepositoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalRepositoryService,
        {
          provide: HttpClient,
          useValue: { post: jest.fn() },
        },
      ],
    });

    service = TestBed.inject(AnimalRepositoryService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the createAnimal endpoint', () => {
    const input = {};
    const spy = jest.spyOn(httpClient, 'post').mockReturnValue(of({}));

    service.createAnimal(input);

    expect(spy).toHaveBeenCalledWith(`${environment.api}/animal`, {});
  });
});
