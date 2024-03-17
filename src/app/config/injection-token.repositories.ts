import { InjectionToken, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserRepositoryService } from "../infrastructure/repository/user-repository.service";
import { BulletRepositoryService } from "../infrastructure/repository/bullet-repository.service";
import { ScheduleRepositoryService } from "../infrastructure/repository/schedule-repository.service";
import { AnimalRepositoryService } from "../infrastructure/repository/animal-repository.service";

export const BulletRepositoryToken = new InjectionToken(
  "BulletRepository",
  { providedIn: "root", factory: () => new BulletRepositoryService(inject(HttpClient)) }
)

export const ScheduleRepositoryToken = new InjectionToken(
  "ScheduleRepository",
  { providedIn: "root", factory: () => new ScheduleRepositoryService(inject(HttpClient)) }
);

export const UserRepositoryToken = new InjectionToken(
  "UserRepository",
  { providedIn: "root", factory: () => new UserRepositoryService(inject(HttpClient)) }
);

export const AnimalRepositoryToken = new InjectionToken(
  "AnimalRepository",
  { providedIn: "root", factory: () => new AnimalRepositoryService(inject(HttpClient)) }
);
