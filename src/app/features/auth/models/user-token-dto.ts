export interface UserTokenDto {
  user: UserSessionDto;
  token: string;
}

export interface UserSessionDto {
  id: number;
  pseudonym: string;
  role: string;
}
