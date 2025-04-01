import {Component, inject, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {TournamentDetailsDtoModel} from '../../models/tournament-details-dto.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {NgForOf, NgIf} from '@angular/common';
import {TournamentLeaderboardDtoModel} from '../../models/tournament-leaderboard-dto.model';
import {TableModule} from 'primeng/table';
import {TournamentMatchDtoModel} from '../../models/tournament-match-dto.model';

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
    NgForOf
  ],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent implements OnInit {

  private readonly _tournamentService: TournamentService = inject(TournamentService);
  private readonly _ar: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);

  tournament!: TournamentDetailsDtoModel;
  standings!: TournamentLeaderboardDtoModel[] | null;
  matches!: TournamentMatchDtoModel[] | null;

  constructor() {}

  ngOnInit() {
    this.getTournament();
  }

  //TODO: ajouter l'UserTokenDTO
  startTournament(tournament: TournamentDetailsDtoModel) {
    this._tournamentService.startTournament(tournament).subscribe({
      next: () => {
        this.getTournament();
      },
      error: err => console.log(err)
    });
    this.getStandings(this.tournament.tournamentDTO.id);
  }

  //TODO: ajouter l'UserTokenDTO
  nextRound(tournament: TournamentDetailsDtoModel) {
    this._tournamentService.nextRound(tournament).subscribe({
      next: datas => this.tournament = datas,
      error: err => console.log(err)
    });
    this.getStandings(this.tournament.tournamentDTO.id);
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
      this.tournament.matches.length === 0 ? this.matches = null : this.matches = this.tournament.matches;
      this.tournament.tournamentDTO.status !== "WAITING" ? this.getStandings(id) : this.standings = null;
    });
  }

  //TODO: ajouter l'UserTokenDTO
  registerTournament(tournamentId: number) {
  }

  //TODO: ajouter l'UserTokenDTO
  unregisterTournament(tournamentId: number) {
  }

  getStandings(tournamentId: number) {
    this._tournamentService.getLeaderboard(tournamentId).subscribe(leaderboard => {
      this.standings = leaderboard;
    })
  }
}
