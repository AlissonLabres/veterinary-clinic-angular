import { TestBed } from '@angular/core/testing';
import { BulletRepositoryService } from './bullet-repository.service';
import { HttpClient } from '@angular/common/http';
import { BulletEntity } from '../../domain/entity/bullet.entity';
import { of, take } from 'rxjs';

describe('BulletRepository', () => {
  let service: BulletRepositoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BulletRepositoryService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(BulletRepositoryService);
    httpClient = TestBed.inject(HttpClient);
  });


  it('should return a value when dispatch getBulletsAvailable on success', () => {
    const outcome: BulletEntity[] = [
      { id: '0001', code: '2023-09-08T16:00' },
    ];

    (httpClient.get as jest.Mock).mockReturnValue(of({ bullets: outcome }));

    service.getBulletsAvailable()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
