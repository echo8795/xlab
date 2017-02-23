import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare const gapi: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	profile:any;
  constructor(private router:Router) { }

  ngOnInit() { }
  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': user => this.onSignIn(user)
    });
  }

  onSignIn(googleUser) {
    if(googleUser)
    {
	    console.log(googleUser.getBasicProfile());
      this.router.navigate(['/dashboard']);
    }
    console.log("e");
  }

	signOut() {
	  let auth2 = gapi.auth2.getAuthInstance();
	  auth2.signOut().then(function () {
	  	console.log('User signed out.');
    });
    this.router.navigate(['/']);
	}
}
