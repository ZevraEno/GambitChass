import {Component, inject, OnInit} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {TournamentDetailsDtoModel} from '../../models/tournament-details-dto.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {TournamentLeaderboardDtoModel} from '../../models/tournament-leaderboard-dto.model';
import {TableModule} from 'primeng/table';
import {TournamentMatchDtoModel} from '../../models/tournament-match-dto.model';
import {AuthService} from '../../../auth/services/auth.service';
import {MemberDetailsDtoModel} from '../../../auth/models/member-details-dto.model';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {MatchResultFormModel} from '../../models/match-result-form.model';

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
    RouterLink,
    Dialog,
    Select,
    ReactiveFormsModule,
    FloatLabel,
    NgStyle
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
  private readonly _fb: FormBuilder = inject(FormBuilder);

  tournament!: TournamentDetailsDtoModel;
  standings!: TournamentLeaderboardDtoModel[] | null;
  matches!: TournamentMatchDtoModel[] | null;
  players!: MemberDetailsDtoModel[] | null;

  visible: boolean = false;

  results: any[] | undefined;
  selectedResult: FormGroup;

  constructor() {
    this.selectedResult = this._fb.group({
      id: [null, []],
      matchResult: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getTournament();
    this.results = [
      {name: 'Waiting', code: 'WAITING'},
      {name: 'White', code: 'WHITE'},
      {name: 'Black', code: 'BLACK'},
      {name: 'Draw', code: 'DRAW'}
    ];
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
      next: () => this.getTournament(),
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

  registerTournament(tournamentId: number) {
    this._tournamentService.registerTournament(tournamentId).subscribe({
      next: () => {
        alert('Registered successfully!')
        this.getTournament();
      },
      error: (err) => console.error('Error registering:', err)
    });
  }

  unregisterTournament(tournamentId: number) {
    this._tournamentService.unregisterTournament(tournamentId).subscribe({
      next: () => {
        alert('Unregistered successfully!')
        this.getTournament();
      },
      error: (err) => console.error('Error unregistering:', err)
    });
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

  showDialog(matchId: number) {
    this.selectedResult.setValue({
      id: matchId,
      matchResult: null
    });
    this.visible = true;
  }

  setMatch() {
    this.selectedResult.markAllAsTouched();

    if (this.selectedResult.invalid) {
      return;
    }

    const formvalue = this.selectedResult.value;
    const form: MatchResultFormModel = {
      ...formvalue,
      matchResult: formvalue.matchResult.code,
    }

    console.log(form);

    this._tournamentService.updateMatchResult(form).subscribe({
      next: () => {
        this.getTournament();
        this.visible = false;
        this.selectedResult.reset();
      },
      error: err => console.error(err),
    })

  }

  roundIsOver(round: number) {
    if (this.matches) {
      for (let match of this.matches) {
        if (match.roundNumber !== round) {
          continue;
        }

        if (match.matchResult === "WAITING") {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  isRegistered() {
    let isRegistered = false;
    if (this.players) {
      this.players.forEach((player) => {
        if (player.id === this._authService.currentUser()?.user.id){
          isRegistered = true;
          console.log("is registered");
          return;
        }
      })
    }
    return isRegistered;
  }
}
