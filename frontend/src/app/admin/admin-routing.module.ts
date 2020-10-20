import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ViewRoleComponent } from './roles/view-role/view-role.component';
import { ViewRolesComponent } from './roles/view-roles/view-roles.component';
const routes: Routes = [
  {
    path: '', component: ViewRolesComponent
  },
  {
    path: 'viewRole/:id', component: ViewRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
