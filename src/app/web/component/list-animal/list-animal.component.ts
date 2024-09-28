import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GetLoadingAnimal,
  GetAllAnimalsByUserSelector,
} from '../../redux/animal/animal.selector';
import { GetAllAnimalsByUser } from '../../redux/animal/animal.action';

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.scss'],
})
export class ListAnimalComponent implements OnInit {
  store = inject(Store);
  loading$ = this.store.select(GetLoadingAnimal);
  animals$ = this.store.select(GetAllAnimalsByUserSelector);

  ngOnInit() {
    this.store.dispatch(GetAllAnimalsByUser({ user_id: 1 }));
  }

  ngOnDestroy() {
    // this.store.dispatch(RestoreUser());
  }
}
