export interface UserTokenDto {
  accessToken: string;
  user: UserSessionDto;
}

export interface UserSessionDto {
  id: number;
  username: string;
  email: string;
}
