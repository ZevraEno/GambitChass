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
      minElo: [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      maxElo: [null, [Validators.required, Validators.min(0), Validators.max(3000)]],
      categories: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      womenOnly: [false, [Validators.required]],
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
    let codes: any[] = []
    this.categories.forEach((c) => {
      codes.push(c.code);
    })

    const testForm= this.tournamentForm.value;
    const form: TournamentCreateFormModel = {
      ...testForm,
      categories: codes,
      startDate: testForm.startDate.toISOString(),
    }
    console.log(form);

    this._tournamentService.createTournament(form).subscribe({
      next: () => this._router.navigate(['/tournament']).then()
    })

  }

}
