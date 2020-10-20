import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewRoleComponent } from './roles/view-role/view-role.component';
import { ViewRolesComponent } from './roles/view-roles/view-roles.component';


@NgModule({
  declarations: [AdminComponent, ViewRoleComponent, ViewRolesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
