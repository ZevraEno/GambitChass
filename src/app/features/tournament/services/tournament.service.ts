import {inject, Injectable} from '@angular/core';
import {TournamentShortDtoModel} from '../models/tournament-short-dto.model';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TournamentPagesDtoModel} from '../models/tournament-pages-dto.model';
import {TournamentDetailsDtoModel} from '../models/tournament-details-dto.model';

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

}
