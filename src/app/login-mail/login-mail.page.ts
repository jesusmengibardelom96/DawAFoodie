import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-mail',
  templateUrl: './login-mail.page.html',
  styleUrls: ['./login-mail.page.scss'],
})
export class LoginMailPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
