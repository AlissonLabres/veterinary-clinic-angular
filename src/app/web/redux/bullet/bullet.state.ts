export interface BulletInterface {
  id: string;
  code: string;
}

export interface BulletStateInterface {
  entities: BulletInterface[];
  success: boolean | undefined;
  error: string | undefined;
  isLoading: boolean | undefined;
}
