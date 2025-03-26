export interface RegisterFormModel {
  pseudonym: string;
  email: string;
  birthDate: Date;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  elo: number;
}
