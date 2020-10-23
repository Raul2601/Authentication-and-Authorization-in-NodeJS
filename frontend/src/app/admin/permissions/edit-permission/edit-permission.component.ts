import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '../permission';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {

  permission: Permission;
  constructor(private permissionService: PermissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let permissionId = this.route.snapshot.paramMap.get('id');

    this.permissionService.getById(permissionId)
      .then((data) => {
        this.permission = data['permission'];
      })
  }

  save() {
    this.permissionService.createOrUpdate(this.permission._id, this.permission)
      .then(() => {
        window.location.href = '/admin/permissions';
      })
  }

}
