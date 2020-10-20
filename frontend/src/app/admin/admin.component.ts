import { Component, OnInit } from '@angular/core';
import { RoleService } from './roles/role.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private rolesService: RoleService) { }

  roles: IRoles[] = [];

  ngOnInit(): void {

    this.rolesService.getAllRoles()
      .then((data) => {

        if (data['roles'].length > 0) {
          for (const role of data['roles']) {
            let tempRole: IRoles = { id: '', name: '', permissions: [] };
            tempRole.id = role._id;
            tempRole.name = role.name;
            for (const perm of role.permissions) {
              let tempPerm: IPermission = { name: '', description: '', value: '' };
              tempPerm.name = perm.name;
              tempPerm.description = perm.description;
              tempPerm.value = perm.value;
              tempRole.permissions.push(tempPerm);
            }
            this.roles.push(tempRole);
          }
        }
        else {
          let tempRole: IRoles = { id: '', name: 'hr', permissions: [] };
          let tempPerm: IPermission = { name: '', description: '', value: '' };
          tempRole.permissions.push(tempPerm);
          this.roles.push(tempRole);
        }
      });

  }

  addRow(index) {
    let permission: IPermission = { name: '', description: '', value: '' };
    this.roles[index].permissions.push(permission);
  }

  addRole() {
    let tempRole: IRoles = { id: '', name: 'tpl', permissions: [] };
    let tempPerm: IPermission = { name: '', description: '', value: '' };
    tempRole.permissions.push(tempPerm);
    this.roles.push(tempRole);
  }

  async deleteRow(x, index) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.roles[index].permissions.splice(x, 1);
      await this.rolesService.createOrUpdate(this.roles[index].id, this.roles[index])
    }
  }

  async updateRow(index) {
    await this.rolesService.createOrUpdate(this.roles[index].id, this.roles[index])
  }
}

export interface IRoles {
  id: string,
  name: string;
  permissions: IPermission[];
}
export interface IPermission {
  name: string;
  description: string;
  value: string;
}