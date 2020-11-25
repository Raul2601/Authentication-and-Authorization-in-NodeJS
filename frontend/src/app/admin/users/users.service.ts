import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.API}/users`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }
}
