import {Component, inject} from '@angular/core';
import {TournamentService} from '../../services/tournament.service';
import {TournamentDetailsDtoModel} from '../../models/tournament-details-dto.model';
import {ActivatedRoute} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-tournament-details',
  imports: [
    Button
  ],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent {

  private readonly _tournamentService: TournamentService = inject(TournamentService);
  private readonly _ar: ActivatedRoute = inject(ActivatedRoute);

  tournament!: TournamentDetailsDtoModel;

  constructor() {
    let id: number = this._ar.snapshot.params['id'];
    this._tournamentService.getTournamentById(id).subscribe(tournament => {
      this.tournament = tournament;
    })
  }
}
