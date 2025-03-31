import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ProfileUpdateFormModel} from '../models/profile-update-form.model';
import {ProfileStatsDtoModel} from '../models/profile-stats-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly _http: HttpClient = inject(HttpClient);

  getStats(id: number) {
    return this._http.get<ProfileStatsDtoModel>(`${environment.API_URL}/member/${id}/stats`);
  }

  delete() {
    return this._http.delete(`${environment.API_URL}/member/delete`)
  }

  update(form: ProfileUpdateFormModel) {
    return this._http.put(`${environment.API_URL}/member/update`, form)
  }
}
