import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  row = [
    {
      id: '',
      name: '',
      email: ''
    },
    {
      id: '',
      name: '',
      email: ''
    },
    {
      id: '',
      name: '',
      email: ''
    }
  ];

  addTable() {
    const obj = {
      id: '',
      name: '',
      email: ''
    }
    this.row.push(obj)
  }

  deleteRow(x) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      this.row.splice(x, 1);
    }
  }
}
