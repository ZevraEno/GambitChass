import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RegisterFormModel } from '../models/register-form.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginFormModel } from '../models/login-form.model';
import { Observable, tap } from 'rxjs';
import { UserTokenDto } from '../models/user-token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http: HttpClient = inject(HttpClient);

  currentUser: WritableSignal<UserTokenDto | undefined>;

  constructor() {
    const jsonUser = localStorage.getItem('currentUser');
    this.currentUser = signal(jsonUser ? JSON.parse(jsonUser) : undefined);
  }

  register(form: RegisterFormModel): Observable<RegisterFormModel> {
    return this._http.post<RegisterFormModel>(`${environment.API_URL}/auth/register`, form);
  }

  login(form: LoginFormModel): Observable<UserTokenDto> {
    return this._http.post<UserTokenDto>(`${environment.API_URL}/auth/login`, form).pipe(
      tap(result => {
        this.currentUser.set(result);
        localStorage.setItem('currentUser', JSON.stringify(result));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.set(undefined);
  }

  getToken(): string | null {
    const user = this.currentUser();
    return user ? user.accessToken : null;
  }
}
