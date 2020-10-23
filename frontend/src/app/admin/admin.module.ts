import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewRoleComponent } from './roles/view-role/view-role.component';
import { ViewRolesComponent } from './roles/view-roles/view-roles.component';
import { ViewPermissionsComponent } from './permissions/view-permissions/view-permissions.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { EditPermissionComponent } from './permissions/edit-permission/edit-permission.component';


@NgModule({
  declarations: [AdminComponent, ViewRoleComponent, ViewRolesComponent, ViewPermissionsComponent, EditRoleComponent, EditPermissionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
