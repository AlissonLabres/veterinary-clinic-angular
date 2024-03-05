import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environments';

import { BulletEntity } from '../../domain/entity/bullet.entity';
import { BulletRepositoryInterface } from '../../domain/repository/bullet-repository.interface';

@Injectable({ providedIn: 'root' })
export class BulletRepositoryService implements BulletRepositoryInterface {

  constructor(private readonly httpClient: HttpClient) { }

  getBulletsAvailable(): Observable<BulletEntity[]> {
    return this.httpClient.get(`${environment.api}/bullets`)
      .pipe(
        map(({ bullets }: any) => bullets.map((bullet: any) => BulletEntity.restore(bullet)))
      )
  }
}
