import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser, RestoreUser } from '../../redux/user/user.action';
import {
  GetLoadingUser,
  GetUsersSelector,
} from '../../redux/user/user.selector';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  store = inject(Store);
  loading$ = this.store.select(GetLoadingUser);
  users$ = this.store.select(GetUsersSelector);

  ngOnInit() {
    this.store.dispatch(GetUser());
  }

  ngOnDestroy() {
    this.store.dispatch(RestoreUser());
  }
}
