export interface MemberDetailsDtoModel {
  id: number;
  pseudonym: string;
  email: string;
  birthDate: Date;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  elo: number;
  role: "ADMIN" | "USER";
}
