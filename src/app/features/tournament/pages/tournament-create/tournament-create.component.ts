import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {MultiSelect} from 'primeng/multiselect';
import {NgStyle} from '@angular/common';
import {DatePicker} from 'primeng/datepicker';
import {Checkbox} from 'primeng/checkbox';
import {Button} from 'primeng/button';
import {TournamentService} from '../../services/tournament.service';
import {TournamentCreateFormModel} from '../../models/tournament-create-form.model';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-tournament-create',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    InputNumber,
    MultiSelect,
    NgStyle,
    DatePicker,
    Checkbox,
    Button,
    Card
  ],
  templateUrl: './tournament-create.component.html',
  styleUrl: './tournament-create.component.scss'
})
export class TournamentCreateComponent {

  private readonly _tournamentService: TournamentService = inject(TournamentService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  tournamentForm: FormGroup;
  categories = [
    { name: 'Junior', code: 'JUNIOR' },
    { name: 'Senior', code: 'SENIOR' },
    { name: 'Veteran', code: 'VETERAN' },
    { name: 'Openbar', code: 'OPENBAR' },
  ];
  minDate: Date = new Date();
  failure?: string;

  constructor() {
    this.minDate.setDate(this.minDate.getDate() + 7);
    this.tournamentForm = this._fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      place: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      minPlayer: [null, [Validators.required, Validators.min(2)]],
      maxPlayer: [null, [Validators.required]],
      minElo: [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      maxElo: [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      categories: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      womenOnly: [false, [Validators.required]],
    });
  }

  onSubmit() {

    this.tournamentForm.markAllAsTouched();
    if (this.tournamentForm.invalid) {
      return;
    }

    const formValue = this.tournamentForm.value;

    const form: TournamentCreateFormModel = {
      ...formValue,
      categories: formValue.categories?.map((c: any) => c.code) || [],
      startDate: formValue.startDate ? formValue.startDate.toISOString() : null,
    };

    this._tournamentService.createTournament(form).subscribe({
      next: () => this._router.navigate(['/tournament']).then(),
      error: err => {
        if (typeof err.error === "string") {
          this.failure = err.error;
        } else {
          this.failure = Object.entries(err.error)
            .map(([key, value]) => `The "${key}" value ${value}`)
            .toString();
        }
      }
    })

  }

}
