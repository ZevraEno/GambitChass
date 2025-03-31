import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProfileUpdateFormModel} from '../models/profile-update-form.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);

  delete() {
    return this._http.delete(`${environment.API_URL}/member/delete`)
  }

  update(form: ProfileUpdateFormModel) {
    return this._http.put(`${environment.API_URL}/member/update`, form)
  }
}
