import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private userService: UsersService) { }

  displayedColumns: string[] = ['position', 'name', 'email', 'role'];
  dataSource: any;

  ngOnInit(): void {
    this.userService.getAll()
      .then((data: User[]) => {
        if (data['users'].length > 0) {
          this.dataSource = data['users'];
        }
      })
  }

}
