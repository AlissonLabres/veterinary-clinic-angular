export interface BulletInterface {
  id: string;
  code: string;
}

export interface BulletEntityInterface {
  date: Date,
  hour: string
}

export interface BulletStateInterface {
  entities: BulletInterface[];
  date: Date | undefined;
  hour: string | undefined;
  error: string | undefined;
  created: string | undefined;
  isLoading: string;
}
