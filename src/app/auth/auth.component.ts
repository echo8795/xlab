import { Component, OnInit } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	profile:any;
  constructor() { }

  ngOnInit() { }
 //  onSignIn(googleUser) {
	// 	this.profile = googleUser.getBasicProfile();
	// 	console.log('ID: ' + this.profile.getId()); // Do not send to your backend! Use an ID token instead.
	// 	console.log('Name: ' + this.profile.getName());
	// 	console.log('Image URL: ' + this.profile.getImageUrl());
	// 	console.log('Email: ' + this.profile.getEmail()); // This is null if the 'email' scope is not present.
	// }
	ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'light',
        'onsuccess': param => this.onSignIn(param)
    });
}
public onSignIn(googleUser) {
	console.log(googleUser.getId());
    // var user : User = new User();

    // ((u, p) => {
    //     u.id            = p.getId();
    //     u.name          = p.getName();
    //     u.email         = p.getEmail();
    //     u.imageUrl      = p.getImageUrl();
    //     u.givenName     = p.getGivenName();
    //     u.familyName    = p.getFamilyName();
    // })(user, googleUser.getBasicProfile());

    // ((u, r) => {
    //     u.token         = r.id_token
    // })(user, googleUser.getAuthResponse());

    // user.save();
    // this.goHome();
};
	signOut() {
	  var auth2 = gapi.auth2.getAuthInstance();
	  auth2.signOut().then(function () {
	  console.log('User signed out.');
    	});
	}
}
