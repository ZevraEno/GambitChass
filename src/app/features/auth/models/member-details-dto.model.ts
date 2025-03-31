export interface MemberDetailsDtoModel {
  pseudonym: string;
  email: string;
  birthDate: Date;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  elo: number;
  role: "ADMIN" | "USER";
}
