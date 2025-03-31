export interface ProfileUpdateFormModel {
  pseudonym: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
}
