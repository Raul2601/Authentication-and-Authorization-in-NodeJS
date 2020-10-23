import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Permission } from './permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get<Permission[]>(`${this.API}/permissions`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getById(permissionId) {
    return new Promise((resolve, reject) => {
      this.http.get<Permission>(`${this.API}/permissions/` + permissionId).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  createOrUpdate(permissionId, permission) {
    return new Promise(async (resolve, reject) => {
      if (permissionId == null || permissionId == "" || await this.getById(permissionId) == null) {
        this.http.post(`${this.API}/permissions`, permission).subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        });
      }
      else {
        this.http.put(`${this.API}/permissions/` + permissionId, permission).subscribe(() => {
          resolve();
        }, err => {
          reject(err);
        })
      }
    });
  }

  delete(permissionId) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.API}/permissions/` + permissionId).subscribe(() => {
        resolve();
      }, err => {
        reject(err);
      })
    })
  }

}
