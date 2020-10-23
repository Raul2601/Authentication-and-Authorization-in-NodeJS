import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EditPermissionComponent } from './permissions/edit-permission/edit-permission.component';
import { ViewPermissionsComponent } from './permissions/view-permissions/view-permissions.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { ViewRoleComponent } from './roles/view-role/view-role.component';
import { ViewRolesComponent } from './roles/view-roles/view-roles.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'roles', component: ViewRolesComponent
      },
      {
        path: 'viewRole/:id', component: ViewRoleComponent
      },
      {
        path: 'editRole/:id', component: EditRoleComponent
      },
      {
        path: 'editPermission/:id', component: EditPermissionComponent
      },
      {
        path: 'permissions', component: ViewPermissionsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
