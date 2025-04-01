import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {UserTokenDto} from '../../auth/models/user-token-dto';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService: AuthService = inject(AuthService);
  let currentUser: UserTokenDto | undefined = authService.currentUser();
  if(currentUser) {
    let token = currentUser.token;
    if(token) {
      let clone = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });
      return next(clone);
    }
  }
  return next(req);
};
