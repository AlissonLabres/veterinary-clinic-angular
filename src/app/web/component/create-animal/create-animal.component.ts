import {
  debounce,
  debounceTime,
  filter,
  map,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  GetErrorAnimal,
  GetLoadingAnimal,
  GetSuccessAnimal,
} from '../../redux/animal/animal.selector';
import { GetUser } from '../../redux/user/user.action';
import { GetUserSelector } from '../../redux/user/user.selector';
import { MESSAGE_EXCEPTIONS } from './create-animal-exception';
import { CreateAnimal } from '../../redux/animal/animal.action';

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.scss'],
})
export class CreateAnimalComponent implements OnInit, OnDestroy {
  router = inject(Router);
  activateRouter = inject(ActivatedRoute);
  formBuilder = inject(NonNullableFormBuilder);

  store = inject(Store);

  exceptions = MESSAGE_EXCEPTIONS;
  userSelector?: number = undefined;

  error$ = this.store.select(GetErrorAnimal);
  success$ = this.store.select(GetSuccessAnimal);
  loading$ = this.store.select(GetLoadingAnimal);

  animal: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, this.validateName]],
    age: [0, [Validators.required, Validators.min(0)]],
    weight: [0, [Validators.required, Validators.min(0)]],
    type: ['', [Validators.required]],
    breed: ['', [Validators.required]],
  });

  destroy$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.store.dispatch(GetUser());

    this.activateRouter.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => this.store.select(GetUserSelector(params['id']))),
        filter((user) => !!user?.user_id)
      )
      .subscribe((user_id) => (this.userSelector = user_id?.user_id));

    this.success$
      .pipe(
        takeUntil(this.destroy$),
        filter((success) => !!success)
      )
      .subscribe(() => {
        this.animal.reset();
        this.router.navigate([`/users/${this.userSelector}/animals`]);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  sendForm() {
    const payload = {
      ...this.animal.value,
      user_id: this.userSelector,
    };

    this.store.dispatch(CreateAnimal({ payload }));
  }

  isInvalid(controlName: string) {
    return {
      'is-invalid':
        this.animal.get(controlName)?.invalid &&
        this.animal.get(controlName)?.touched,
    };
  }

  private validateName(control: AbstractControl) {
    const name = control.value;
    const message = {
      validateName: true,
    };

    return name.length < 3 ? message : null;
  }
}
