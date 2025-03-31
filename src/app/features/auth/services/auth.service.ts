import {inject, Injectable} from '@angular/core';
import {RegisterFormModel} from '../models/register-form.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import { LoginRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http: HttpClient = inject(HttpClient);

  constructor() {}

  login(form: LoginFormModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data);
  }

  register(form: RegisterFormModel) {
    return this._http.post<RegisterFormModel>(`${environment.API_URL}/auth/register`, form);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}
