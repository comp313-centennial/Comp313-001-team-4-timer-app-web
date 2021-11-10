import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import { validateCallback } from '@firebase/util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(public firebaseservice:FirebaseService,private router:Router,private _formBuilder: FormBuilder) {
    this.loginForm=new FormGroup({
      txtemail:new FormControl('',[Validators.required,Validators.email]),
      txtpassword:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')!==null){
      this.router.navigateByUrl('/home');
    }
   
  }
  get f(){
    return this.loginForm.controls;
  }
  onSignin(){
    if(this.loginForm.valid){
      this.firebaseservice.signin(this.loginForm.get('txtemail')?.value,this.loginForm.get('txtpassword')?.value).then(res=>{
        console.log(this.firebaseservice.isLoggedIn);
        this.router.navigateByUrl('/home');
      })

    }
   
  }

}
