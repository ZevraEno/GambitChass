export interface TournamentShortDtoModel{
  id: number;
  name: string;
  place: string;
  startDate: Date;
  minElo: number;
  maxElo: number;
  nbrOfPlayer: number;
  maxPlayer: number;
  status: "WAITING" | "IN_PROGRESS" | "FINISHED";
}
