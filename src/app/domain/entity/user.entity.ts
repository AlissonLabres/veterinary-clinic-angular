export default class UserEntity {
  constructor(
    public user_name: string,
    public user_email: string,
    public user_phone: string,
    public user_animals: number[],
    public user_id?: number,
  ) { }
}
