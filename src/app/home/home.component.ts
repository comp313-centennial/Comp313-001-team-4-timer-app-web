import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  timeLeft: number = 0;
  timeLeftForm: number = 0;
  interval: any;
  setupTimerForm: FormGroup;
  orginialTimerValue : number = 0;
  currentTimerValue: number = 0;

  @Output() islogout = new EventEmitter<void>()
  constructor(public firebaseservice: FirebaseService,private _formBuilder: FormBuilder,private router:Router) {
    this.setupTimerForm= new FormGroup({
      timeLeft:new FormControl(''),
    })
   }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user')!==null){
      this.router.navigateByUrl('/home');
    }
  }
  

  startTimer() {
    this.timeLeft = this.setupTimerForm.get('timeLeft')?.value;
    if(this.orginialTimerValue == 0)
      this.orginialTimerValue = this.setupTimerForm.get('timeLeft')?.value;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.currentTimerValue = this.timeLeft;
      } else {
        this.timeLeft = 0;
        this.currentTimerValue = this.timeLeft;
      }
    },1000)
  }

  pauseTimer() {    
    console.log(this.currentTimerValue)
    this.timeLeftForm = this.currentTimerValue;
    clearInterval(this.interval);
  }

  resetTimer()
  {    
    console.log(this.orginialTimerValue);
    this.timeLeft = this.orginialTimerValue;
    this.timeLeftForm = this.orginialTimerValue;
    clearInterval(this.interval);
  }
}
