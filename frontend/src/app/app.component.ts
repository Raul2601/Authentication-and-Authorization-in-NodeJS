import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  people: any[] = [];

  API = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllPeople();
  }

  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .subscribe((people: any) => {
        console.log(people)
        this.people = people.people
      })
  }
}
