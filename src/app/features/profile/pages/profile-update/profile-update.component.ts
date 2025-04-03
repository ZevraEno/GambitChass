import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Password} from 'primeng/password';
import {ProfileService} from '../../service/profile.service';
import {Router} from '@angular/router';
import {Card} from 'primeng/card';
import {ProfileUpdateFormModel} from '../../models/profile-update-form.model';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile-update',
  imports: [
    ReactiveFormsModule,
    Button,
    DatePicker,
    FloatLabel,
    InputText,
    Select,
    Password,
    Card
  ],
  styles: `
    :host {
      h2 {
        margin-block-start: 0;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
          display: flex;
          gap: 1rem;

          * {
            flex: 1;
          }
        }
      }

      .red {
        color: red;
      }
    }
  `,
  template: `
    <h2>Profile</h2>
    <form [formGroup]="updaterForm" (ngSubmit)="onSubmit()">
      @if (failure) {
        <p-card>
          <div class="red">
            {{ failure }}
          </div>
        </p-card>
      }
      <p-float-label variant="in">
        <input
          pInputText
          id="pseudonym"
          formControlName="pseudonym"
          fluid="true"/>
        <label for="pseudonym">Pseudonym</label>
      </p-float-label>
      <p-float-label variant="in">
        <input
          pInputText
          id="email"
          formControlName="email"
          fluid="true"/>
        <label for="email">Email</label>
      </p-float-label>
      <p-float-label variant="in">
        <p-password
          id="password"
          formControlName="password"
          toggleMask="true"
          feedback="false"
          fluid="true"/>
        <label for="password">Password</label>
      </p-float-label>
      <p-float-label variant="in">
        <p-date-picker
          id="birthDate"
          formControlName="birthDate"
          fluid="true"/>
        <label for="birthDate">Birth date</label>
      </p-float-label>
      <p-float-label variant="in">
        <p-select
          id="gender"
          optionLabel="label"
          formControlName="gender"
          dataKey="value"
          [options]="genders"
          fluid="true"
        />
        <label for="gender">Gender</label>
      </p-float-label>
      <div class="form-group">
        <p-button
          severity="danger"
          label="Delete"
          size="large"
          (click)="onDelete()"
          fluid="true"/>
        <p-button
          severity="info"
          label="Update"
          type="submit"
          size="large"
          fluid="true"/>
      </div>
    </form>
  `
})
export class ProfileUpdateComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _profileService: ProfileService = inject(ProfileService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  updaterForm: FormGroup;
  genders: any[];
  failure?: string;

  constructor() {
    this.updaterForm = this._fb.group({
      pseudonym: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      gender: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
    });
    this.genders = [
      {label: 'Female', value: 'FEMALE'},
      {label: 'Male', value: 'MALE'},
      {label: 'Unknown', value: 'UNKNOWN'},
    ];
  }

  onDelete() {
    this._profileService.delete().subscribe(
      {
        next: _ => {
          this._authService.logout();
          this._router.navigate(['/']).then();
        }
      }
    )
  }

  onSubmit() {
    this.updaterForm.markAllAsTouched();
    if (this.updaterForm.invalid) return;
    const formValue = this.updaterForm.value;
    const form: ProfileUpdateFormModel = {
      ...formValue,
      birthDate: formValue.birthDate.toISOString(),
      gender: formValue.gender.value as "MALE" | "FEMALE" | "UNKNOWN",
    };
    this._profileService.update(form).subscribe({
      next: _ => {
        this._authService.logout();
        this._router.navigate(['/login']).then();
      },
      error: err => {
        if (typeof err.error === "string") {
          this.failure = err.error;
        } else {
          this.failure = Object.entries(err.error)
            .map(([key, value]) => `The "${key}" value ${value}`)
            .toString();
        }
      }
    });
  }
}
