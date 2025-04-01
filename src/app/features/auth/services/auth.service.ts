import {inject, Injectable} from '@angular/core';
import {RegisterFormModel} from '../models/register-form.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthResponse, LoginFormModel} from '../models/login-form.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http: HttpClient = inject(HttpClient);

  constructor() {
  }

  login(form: LoginFormModel) {
    return this._http.post<UserTokenDto>(`${environment.API_URL}/login`,form).pipe(
      tap(result => {
        this.currentUser.set(result);
        localStorage.setItem("currentUser", JSON.stringify(result));
      }),
    );
  }

  register(form: RegisterFormModel) {
    return this._http.post<RegisterFormModel>(`${environment.API_URL}/auth/register`, form);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUser.set(undefined);
  }
}
