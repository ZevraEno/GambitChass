import {inject, Injectable} from '@angular/core';
import {RegisterFormModel} from '../models/register-form.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http: HttpClient = inject(HttpClient);

  register(form: RegisterFormModel) {
    return this._http.post<RegisterFormModel>(`${environment.API_URL}/auth/register`, form);
  }
}
