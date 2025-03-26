import {Component, inject} from '@angular/core';
import {TournamentShortDtoModel} from '../../../tournament/models/tournament-short-dto.model';
import {TournamentService} from '../../../tournament/services/tournament.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private readonly _tournamentService: TournamentService = inject(TournamentService);

  tournaments!: TournamentShortDtoModel[];

  constructor() {
    this._tournamentService.getRecentTournaments().subscribe({
      next: datas => {
        this.tournaments = datas;
      },
      error: err => {
        console.error(err);
      }
    });
  }


}
