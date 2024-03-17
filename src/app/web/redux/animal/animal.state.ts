export interface AnimalInterface {
  name: string;
  age: number;
  weight: number;
  type: string;
  breed: string;
  user_id: number;
}

export interface AnimalStateInterface {
  isLoading: boolean;
  entities: AnimalInterface[];
  success: boolean | undefined;
  error: string | undefined;
}
