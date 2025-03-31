import {inject, Injectable} from '@angular/core';
import {TournamentShortDtoModel} from '../models/tournament-short-dto.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TournamentPagesDtoModel} from '../models/tournament-pages-dto.model';
import {TournamentDetailsDtoModel} from '../models/tournament-details-dto.model';
import {TournamentLeaderboardDtoModel} from '../models/tournament-leaderboard-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private readonly _http: HttpClient = inject(HttpClient);


  getRecentTournaments() {
    return this._http.get<TournamentShortDtoModel[]>(`${environment.API_URL}/tournaments/recent`);
  }

  getAllTournaments() {
    return this._http.get<TournamentPagesDtoModel>(`${environment.API_URL}/tournaments`);
  }

  getPage(page: number) {
    return this._http.get<TournamentPagesDtoModel>(`${environment.API_URL}/tournaments?page=${page}`);
  }

  getTournamentById(tournamentId: number) {
    return this._http.get<TournamentDetailsDtoModel>(`${environment.API_URL}/tournaments/${tournamentId}`);
  }

  startTournament(tournament: TournamentDetailsDtoModel) {
    return this._http.post<TournamentDetailsDtoModel>(`${environment.API_URL}/admin/tournaments/${tournament.tournamentDTO.id}/start`, tournament);
  }

  nextRound(tournament: TournamentDetailsDtoModel) {
    return this._http.patch<TournamentDetailsDtoModel>(`${environment.API_URL}/admin/tournaments/${tournament.tournamentDTO.id}/next-round`, tournament);
  }

  deleteTournament(tournamentId: number) {
    return this._http.delete<void>(`${environment.API_URL}/admin/tournaments/${tournamentId}`);
  }

  //TODO: ajouter l'UserTokenDTO
  registerTournament(tournamentId: number) {
    return this._http.post<void>(`${environment.API_URL}/tournaments/${tournamentId}/member/add`, {})
  }

  //TODO: ajouter l'UserTokenDTO
  unregisterTournament(tournamentId: number) {
    return this._http.delete<void>(`${environment.API_URL}/tournaments/${tournamentId}/member/delete`);
  }

  getLeaderboard(tournamentId: number) {
    return this._http.get<TournamentLeaderboardDtoModel[]>
    (`${environment.API_URL}/tournaments/${tournamentId}/leaderboard?tournamentId=${tournamentId}`);
  }

}
