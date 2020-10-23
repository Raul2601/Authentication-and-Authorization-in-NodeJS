import { Component, OnInit } from '@angular/core';
import { Permission } from '../permission';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrls: ['./view-permissions.component.css']
})
export class ViewPermissionsComponent implements OnInit {

  constructor(private permissionService: PermissionService) { }

  permissions: Permission[] = []

  ngOnInit(): void {
    this.permissionService.getAll()
      .then((data: Permission) => {
        this.permissions = data['permissions'];
      })
  }

  addRow() {
    let tempPerm: Permission = { _id: null, name: '', description: '', value: null };
    this.permissions.push(tempPerm);
  }

  async deleteRow(index) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      await this.permissionService.delete(this.permissions[index]._id);
      this.permissions.splice(index, 1);
    }
  }

  async updateRow(index) {
    await this.permissionService.createOrUpdate(this.permissions[index]._id, this.permissions[index]);
  }

}
