import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    RouterLink
  ],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = {
      email: this.email, password: this.password
    };

    this.http.post<{
      token: string
    }>('/api/auth/login', loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwt', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = "Identifiants incorrects. Veuillez réessayer.";
        }
      });
  }
}
