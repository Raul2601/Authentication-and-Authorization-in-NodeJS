import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/admin/roles/role.service';
import { Role } from '../role';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  constructor(private rolesService: RoleService, private route: ActivatedRoute) { }

  role: Role;

  ngOnInit(): void {
    let roleId = this.route.snapshot.paramMap.get('id');

    this.rolesService.getById(roleId)
      .then((data: Role) => {
        this.role = data['role']
      });
  }

}
