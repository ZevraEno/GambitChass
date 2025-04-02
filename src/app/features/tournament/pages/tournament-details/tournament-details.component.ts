import {Component, inject, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {TournamentDetailsDtoModel} from '../../models/tournament-details-dto.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {NgForOf, NgIf} from '@angular/common';
import {TournamentLeaderboardDtoModel} from '../../models/tournament-leaderboard-dto.model';
import {TableModule} from 'primeng/table';
import {TournamentMatchDtoModel} from '../../models/tournament-match-dto.model';
import {AuthService} from '../../../auth/services/auth.service';
import {MemberDetailsDtoModel} from '../../../auth/models/member-details-dto.model';

@Component({
  selector: 'app-tournament-details',
  imports: [
    Button,
    Tabs,
    TabList,
    Tab,
    NgIf,
    TabPanels,
    TabPanel,
    TableModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './tournament-details.component.html',
  standalone: true,
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent implements OnInit {

  private readonly _authService: AuthService = inject(AuthService);

  private readonly _tournamentService: TournamentService = inject(TournamentService);
  private readonly _ar: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);

  tournament!: TournamentDetailsDtoModel;
  standings!: TournamentLeaderboardDtoModel[] | null;
  matches!: TournamentMatchDtoModel[] | null;
  players!: MemberDetailsDtoModel[] | null;

  constructor() {}

  ngOnInit() {
    this.getTournament();
  }

  //TODO: ajouter l'UserTokenDTO
  startTournament(tournament: TournamentDetailsDtoModel) {
    this._tournamentService.startTournament(tournament).subscribe({
      next: () => this.getTournament(),
      error: err => console.log(err)
    });
  }

  //TODO: ajouter l'UserTokenDTO
  nextRound(tournament: TournamentDetailsDtoModel) {
    this._tournamentService.nextRound(tournament).subscribe({
      next: datas => this.tournament = datas,
      error: err => console.log(err)
    });
  }

  //TODO: ajouter l'UserTokenDTO
  deleteTournament(tournamentId: number) {
    this._tournamentService.deleteTournament(tournamentId).subscribe({
      next: () => this._router.navigate(['/tournament']),
      error: err => console.error(err)
    });
  }

  getTournament() {
    let id: number = this._ar.snapshot.params['id'];
    this._tournamentService.getTournamentById(id).subscribe(tournament => {
      this.tournament = tournament;
      this.matches = this.tournament.matches.length !== 0 ? this.tournament.matches : null;
      this.tournament.tournamentDTO.status !== "WAITING" ? this.getStandings(id) : this.standings = null;
      this.players = tournament.tournamentDTO.members.length !== 0 ? tournament.tournamentDTO.members : null;
    });
  }

  //TODO: ajouter l'UserTokenDTO
  registerTournament(tournamentId: number) {
  }

  //TODO: ajouter l'UserTokenDTO
  unregisterTournament(tournamentId: number) {
  }

  deletePlayer(memberId: number) {
    this._tournamentService.deletePlayerTournament(this.tournament.tournamentDTO.id, memberId).subscribe({
      next: () => this.getTournament(),
      error: err => console.error(err),
    });
  }

  getStandings(tournamentId: number) {
    this._tournamentService.getLeaderboard(tournamentId).subscribe(leaderboard => {
      this.standings = leaderboard;
    })
  }

  isAdmin() {
    return this._authService.currentUser()?.user.role === 'ADMIN';
  }

  isConnected() {
    return this._authService.currentUser()
  }
}
