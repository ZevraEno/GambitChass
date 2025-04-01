import {Component, inject} from '@angular/core';
import {ProfileService} from '../../service/profile.service';
import {UIChart} from 'primeng/chart';
import {ChartData} from 'chart.js';

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
  private readonly _profileService: ProfileService = inject(ProfileService);
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
    // TODO: Get current user id
    this._profileService.getStats(2).subscribe({
      next: res => {
        this.chartData = {
          labels: ['Played', 'Won', 'Lost', 'Drawn'],
          datasets: [
            {
              label: 'Matches',
              data: [
                res.nbrOfMatchsPlayed + 3,
                res.nbrOfMatchsWon + 1,
                res.nbrOfMatchsLost + 2,
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
