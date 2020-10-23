import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/admin/roles/role.service';
import { Role } from '../role';
import { Permission } from '../../permissions/permission'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  constructor(private rolesService: RoleService, private route: ActivatedRoute) { }

  role: Role;

  ngOnInit(): void {
    let roleId = this.route.snapshot.paramMap.get('id');

    this.rolesService.getById(roleId)
      .then((data: Role) => {
        this.role = data['role']
      });
  }

  addRow() {
    let permission: Permission = { _id: '', name: '', description: '', value: null };
    this.role.permissions.push(permission);
  }

  async deleteRow(x) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.role.permissions.splice(x, 1);
      await this.rolesService.createOrUpdate(this.role._id, this.role);
    }
  }

  async updateRow() {
    await this.rolesService.createOrUpdate(this.role._id, this.role)
  }


}
