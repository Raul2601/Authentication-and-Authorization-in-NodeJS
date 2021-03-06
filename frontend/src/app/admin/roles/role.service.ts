import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from './role'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get<Role[]>(`${this.API}/roles`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getById(roleId) {
    return new Promise((resolve, reject) => {
      this.http.get<Role>(`${this.API}/roles/` + roleId).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  createOrUpdate(roleId, newRole) {
    return new Promise(async (resolve, reject) => {
      if (roleId == "" || await this.getById(roleId) == null) {
        this.http.post(`${this.API}/roles`, newRole).subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        });
      }
      else {
        this.http.put(`${this.API}/roles/` + roleId, newRole).subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        })
      }
    });
  }

  delete(roleId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.API}/roles/` + roleId).subscribe(() => {
        resolve();
      }, err => {
        reject(err);
      })
    })
  }

}
