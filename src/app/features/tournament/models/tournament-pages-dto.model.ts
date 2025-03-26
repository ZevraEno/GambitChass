import {TournamentShortDtoModel} from './tournament-short-dto.model';

export interface TournamentPagesDtoModel {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  number: number;
  first: boolean;
  last: boolean;
  content: TournamentShortDtoModel[];
}


