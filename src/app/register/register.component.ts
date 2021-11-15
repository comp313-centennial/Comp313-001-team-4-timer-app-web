import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Canada];
  maxNumber:number=10;
  signupForm:FormGroup;
  name:string='';
  phone:any;
  email:string='';
  password:string='';
  user={};
 
  constructor(private _formBuilder: FormBuilder,public firebaseservice:FirebaseService,private router:Router) { 
    this.signupForm= new FormGroup({
      txtname:new FormControl('',[Validators.required]),
      txtemail:new FormControl('',[Validators.required,Validators.email]),
      txtphone:new FormControl(undefined,[Validators.required,Validators.maxLength(10)]),
      txtpassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')!==null){
      this.router.navigateByUrl('/home');
    }
  }
  get f(){
    return this.signupForm.controls;
  }
  signup(){
    if(this.signupForm.valid){
      this.name=this.signupForm.get('txtname')?.value;
      this.phone=this.signupForm.get('txtphone')?.value?.e164Number;
      this.email=this.signupForm.get('txtemail')?.value;
      this.password=this.signupForm.get('txtpassword')?.value;
      this.user={
        'phone':this.phone,
        'email':this.email,
        'name':this.name,
        'password':this.password
      };
      this.firebaseservice.signup(this.user).subscribe((res:any)=>{
        if(res)
        {
          if(res?.displayName){
            sessionStorage.setItem('user',JSON.stringify(res));
            this.router.navigateByUrl('/home');
          }
        }
      },(error)=>{
        alert(error.message);
      })

    }
  }
}
