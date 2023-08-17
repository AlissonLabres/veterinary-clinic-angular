export interface PetshopCalendarDateStateInterface {
  id: string;
  code: string;
}

export interface PetshopCalendarStateInterface {
  entities: PetshopCalendarDateStateInterface[];
  isLoading: boolean;
}
