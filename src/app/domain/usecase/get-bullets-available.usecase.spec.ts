import { TestBed } from '@angular/core/testing';
import { GetBulletsAvailableUsecase } from './get-bullets-available.usecase';
import { of, take } from 'rxjs';
import { BulletOutput } from './bullets-output';
import { BulletRepositoryToken } from '../../config/injection-token.repositories';
import { BulletRepositoryInterface } from '../repository/bullet-repository.interface';

describe('GetBulletsAvailableUsecase', () => {
  let usecase: GetBulletsAvailableUsecase;
  let bulletRepository: BulletRepositoryInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetBulletsAvailableUsecase,
        {
          provide: BulletRepositoryToken,
          useValue: { getBulletsAvailable: jest.fn() }
        }
      ]
    });

    usecase = TestBed.inject(GetBulletsAvailableUsecase);
    bulletRepository = TestBed.inject(BulletRepositoryToken);
  });


  it('should return a value when execute getBulletsAvailable on success', () => {
    const outcome: BulletOutput[] = [
      { id: '0001', code: '2023-09-08T16:00' }
    ];

    (bulletRepository.getBulletsAvailable as jest.Mock).mockReturnValue(
      of([{ id: '0001', code: '2023-09-08T16:00' }])
    );

    usecase.execute()
      .pipe(take(1))
      .subscribe(response => expect(response).toEqual(outcome));
  });
});
