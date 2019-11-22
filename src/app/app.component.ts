import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(){
		// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyBaFYnPhKYDlUV2DlcIOSrRgb-K7ORLwrQ",
			authDomain: "appli-cadeaux.firebaseapp.com",
			databaseURL: "https://appli-cadeaux.firebaseio.com",
			projectId: "appli-cadeaux",
			storageBucket: "appli-cadeaux.appspot.com",
			messagingSenderId: "896973375910",
			appId: "1:896973375910:web:2911adff0bf9e507a22767"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
	}
}
