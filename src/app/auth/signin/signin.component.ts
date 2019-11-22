import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';



import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	signInForm : FormGroup;
	errorMessage : string;

	constructor(
					private authService : AuthService,
					private formBuilder : FormBuilder, 
					private router : Router) { }

	ngOnInit() {
		this.initForm();
	}

	initForm(){
		this.signInForm = this.formBuilder.group(
			{
				email : ['', [Validators.required, Validators.email]],
				password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
			}
		);
	}

	onSignIn(){
		const email = this.signInForm.get('email').value;
		const password = this.signInForm.get('password').value;

		this.authService.signInUser(email, password).then( //On appelle la fonction d'ajout de l'user ; On ajoute un "then" car la méthode est asynchrone
	  		() => { //Si tout se passe bien
	  			this.router.navigate(["/self", "list-cadeau"]); // On redirige
	  		},
	  		(error) => { // S'il y a une erreur
	  			this.errorMessage = error; // On affiche cette erreur dans le template
	  		}
	  	);

	}
}
