import {MemberDetailsDtoModel} from '../../auth/models/member-details-dto.model';

export interface TournamentShortDtoModel{
  id: number;
  name: string;
  place: string;
  startDate: Date;
  minElo: number;
  maxElo: number;
  nbrOfPlayer: number;
  minPlayer: number;
  maxPlayer: number;
  status: "WAITING" | "IN_PROGRESS" | "FINISHED";
  categories: ("JUNIOR" | "SENIOR" | "VETERAN" | "OPENBAR")[];
  currentRound: number;
  members: MemberDetailsDtoModel[];
}
