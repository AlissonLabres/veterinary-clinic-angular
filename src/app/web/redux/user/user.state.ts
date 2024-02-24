export interface UserInterface {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_id?: number;
  user_animals?: number[];
}

export interface UserStateInterface {
  isLoading: string;
  entities: UserInterface[];
  entity: UserInterface | null;
  error: string | null;
}
