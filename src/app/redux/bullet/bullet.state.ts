export interface BulletInterface {
  id: string;
  code: string;
}

export interface BulletStateInterface {
  entities: BulletInterface[];
  select: Date | undefined;
  isLoading: string;
}
