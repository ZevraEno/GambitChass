import {TournamentShortDtoModel} from './tournament-short-dto.model';
import {TournamentMatchDtoModel} from './tournament-match-dto.model';

export interface TournamentDetailsDtoModel {
  tournamentDTO: TournamentShortDtoModel;
  matches: TournamentMatchDtoModel[];
}
