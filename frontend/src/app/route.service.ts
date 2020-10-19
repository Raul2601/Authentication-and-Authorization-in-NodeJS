import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllRoutes() {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${this.API}/routes`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}
