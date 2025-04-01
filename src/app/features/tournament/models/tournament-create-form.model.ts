export interface TournamentCreateFormModel{
  name: string;
  place: string;
  minPlayer: number;
  maxPlayer: number;
  minElo: number;
  maxElo: number;
  categories: ("JUNIOR" | "SENIOR" | "VETERAN" | "OPENBAR")[];
  startDate: Date;
  womenOnly: boolean;
}
