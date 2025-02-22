import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GetLoadingAnimal,
  GetAllAnimalsByUserSelector,
} from '../../redux/animal/animal.selector';
import { GetAllAnimalsByUser } from '../../redux/animal/animal.action';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.scss'],
})
export class ListAnimalComponent implements OnInit {
  store = inject(Store);
  loading$ = this.store.select(GetLoadingAnimal);
  animals$ = this.store.select(GetAllAnimalsByUserSelector);

  constructor(private readonly activateRouter: ActivatedRoute) {}

  ngOnInit() {
    this.activateRouter.params.pipe(take(1)).subscribe(({ id }) => {
      this.store.dispatch(GetAllAnimalsByUser({ user_id: id }));
    });
  }

  ngOnDestroy() {
    // this.store.dispatch(RestoreUser());
  }
}
