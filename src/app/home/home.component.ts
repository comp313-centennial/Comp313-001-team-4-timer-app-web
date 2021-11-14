import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  timeLeft: number = 0;
  interval: any;
  setupTimerForm: FormGroup;

  @Output() islogout = new EventEmitter<void>()
  constructor(public firebaseservice: FirebaseService,private _formBuilder: FormBuilder) {
    this.setupTimerForm= new FormGroup({
      timeLeft:new FormControl(''),
    })
   }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('user'));
  }
  logout() {
    this.firebaseservice.logout();
    this.islogout.emit();
  }
  startTimer() {
    this.timeLeft = this.setupTimerForm.get('timeLeft')?.value;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}
