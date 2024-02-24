import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MESSAGE_EXCEPTIONS } from './create-user-exception';
import { Store } from '@ngrx/store';
import { CreateUser } from '../../redux/user/user.action';
import { UserCreated, GetLoadingUser, GetErrorUser } from '../../redux/user/user.selector';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  store = inject(Store);
  formBuilder = inject(NonNullableFormBuilder);

  exceptions = MESSAGE_EXCEPTIONS;

  user: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, this.validateName]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, this.validatePhone]],
  });

  loading$ = this.store.select(GetLoadingUser);
  error$ = this.store.select(GetErrorUser);
  userCreated$ = this.store.select(UserCreated);
  destroy$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.userCreated$.pipe(takeUntil(this.destroy$)).subscribe(
      (created) => {
        if (created) {
          this.user.reset();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  sendForm() {
    const { name, email, phone } = this.user.value;

    this.store.dispatch(CreateUser({
      entity: {
        user_name: name,
        user_email: email,
        user_phone: phone
      }
    }));
  }

  private validateName(control: AbstractControl) {
    const name = control.value;
    const message = {
      'validateName': true
    };

    return name.length < 3 ? message : null;
  }

  private validatePhone(control: AbstractControl) {
    const phone = control.value.replace(/\D/g, '');
    const hasNumber = /[0-9]{11}/.test(phone);
    const message = {
      'validatePhone': true
    };

    return hasNumber ? null : message;
  }
}
