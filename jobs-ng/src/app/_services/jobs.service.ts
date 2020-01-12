import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  baseUrl = environment.apiUrl + 'jobs/';

  constructor(private http: HttpClient) {}

  fetchJobs() {
    return this.http.get(this.baseUrl);
  }

  fetchJob(id: number) {
    return this.http.get(this.baseUrl + id);
  }

  applyforAJob(model: any) {
    return this.http.post(environment.apiUrl + 'userjobs/', model);
  }

  getUserJobs(id: number) {
    return this.http.get(environment.apiUrl + 'userjobs/' + id);
  }
}
