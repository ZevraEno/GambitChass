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
import {RegisterFormModel} from '../../../auth/models/register-form.model';
import {TournamentCreateFormModel} from '../../models/tournament-create-form.model';
import {TournamentService} from '../../services/tournament.service';

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
    Button
  ],
  templateUrl: './tournament-create.component.html',
  styleUrl: './tournament-create.component.scss'
})
export class TournamentCreateComponent {

  private readonly _tournamentService: TournamentService = inject(TournamentService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);

  tournamentForm: FormGroup;
  categories: any[];

  constructor() {
    this.tournamentForm = this._fb.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      place: [null, [Validators.required, Validators.maxLength(100)]],
      minPlayer: [null, [Validators.required, Validators.min(2)]],
      maxPlayer: [null, [Validators.required]],
      minElo: [null, [Validators.required, Validators.min(0)]],
      maxElo: [null, [Validators.required, Validators.max(3000)]],
      categories: [[], [Validators.required]],
      startDate: [null, [Validators.required]],
      womenOnly: [null, [Validators.required]],
    });
    this.categories = [
      { name: 'Junior', code: 'JUNIOR' },
      { name: 'Senior', code: 'SENIOR' },
      { name: 'Veteran', code: 'VETERAN' },
      { name: 'Openbar', code: 'OPENBAR' },
    ];
    this.tournamentForm.patchValue({categories: this.categories});
  }

  onSubmit() {
    this.tournamentForm.markAllAsTouched();
    if (this.tournamentForm.invalid) {
      return;
    }


  }

}
