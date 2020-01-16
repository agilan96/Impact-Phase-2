import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private httpService: HttpClient) { }
  message :string;
  ngOnInit() {
  }
  Logout() {
    this.httpService.get<Message>('https://localhost:44308/api/data/forall').subscribe(value => {
    this.message="Logged out"; 
  });
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);

  }

}
