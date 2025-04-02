export interface UserTokenDto {
 token: string;
 user: UserSessionDto;
}

export interface UserSessionDto {
  id: number;
  pseudonym: string;
  role: string;
}
