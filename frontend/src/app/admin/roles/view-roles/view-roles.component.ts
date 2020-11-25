import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/admin/roles/role.service';
import { Role } from '../role';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.css']
})
export class ViewRolesComponent implements OnInit {

  constructor(private rolesService: RoleService) { }

  roles: Role[] = [];

  displayedColumns: string[] = ['position', 'name'];
  dataSource: any;

  ngOnInit(): void {
    this.rolesService.getAll()
      .then((data: Role[]) => {
        if (data['roles'].length > 0) {
          this.roles = data['roles'];
          this.dataSource = this.roles;
        }
      });
  }

}

