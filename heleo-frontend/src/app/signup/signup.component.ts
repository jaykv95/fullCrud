import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { MustMatch } from '../helpers/must-match.validators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private fb: FormBuilder, private authService: AuthServiceService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [ Validators.required,Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
  }
    )
  }
  get f() { return this.registerForm.controls }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.registerForm.value)
    this.authService.signUp(this.registerForm.value).subscribe(data => {
      console.log(data)
      this.router.navigate(['home']);
    }, err => {
      console.log(err)
    })
  }
}
