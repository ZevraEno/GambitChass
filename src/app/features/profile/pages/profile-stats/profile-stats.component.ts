import {Component, inject, WritableSignal} from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {UIChart} from 'primeng/chart';
import {ChartData} from 'chart.js';
import {UserTokenDto} from '../../../auth/models/user-token-dto';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  imports: [
    UIChart
  ],
  styles: `
    :host {
      h2 {
        margin-block-start: 0;
      }
    }
  `,
  template: `
    <h2>Stats</h2>
    <p-chart
      type="bar"
      [data]="chartData"
      [options]="chartOptions"/>
  `
})
export class ProfileStatsComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _profileService: ProfileService = inject(ProfileService);
  currentUser: WritableSignal<UserTokenDto | undefined>;
  chartData: ChartData | undefined;
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor() {
    this.currentUser = this._authService.currentUser;
    this._profileService.getStats(this.currentUser()!.user.id).subscribe({
      next: res => {
        this.chartData = {
          labels: ['Played', 'Won', 'Lost', 'Drawn'],
          datasets: [
            {
              label: 'Matches',
              data: [
                res.nbrOfMatchsPlayed,
                res.nbrOfMatchsWon,
                res.nbrOfMatchsLost,
                res.nbrOfMatchsDrawn
              ],
              backgroundColor: [
                'rgba(249, 115, 22, 0.2)',
                'rgba(6, 182, 212, 0.2)',
                'rgb(107, 114, 128, 0.2)',
                'rgba(139, 92, 246, 0.2)',
              ],
              borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
              borderWidth: 1,
            }
          ]
        };
      },
    })
  }
}
