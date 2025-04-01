export interface TournamentMatchDtoModel{
  id: number;
  roundNumber: number;
  matchResult: "WAITING" | "BLACK" | "WHITE" | "DRAW";
  tournamentName: string;
  tournamentId: number;
  whitePlayer: {
    pseudonym: string;
    birthDate: Date;
    elo: number;
  }
  blackPlayer: {
    pseudonym: string;
    birthDate: Date;
    elo: number;
  }
}
