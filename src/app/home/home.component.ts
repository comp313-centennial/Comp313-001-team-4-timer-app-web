import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';
import {DefaultTimer} from '../default-timer.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  timerDefault:any=[];
  timeLeft: number = 0;
  timeLeftForm: number = 0;
  interval: any;
  setupTimerForm: FormGroup;
  orginialTimerValue : number = 0;
  currentTimerValue: number = 0;
  playSound:boolean=false;
  
  @Output() islogout = new EventEmitter<void>()
  constructor(public firebaseservice: FirebaseService,private _formBuilder: FormBuilder,private router:Router) {
    this.setupTimerForm= new FormGroup({
      timeLeft:new FormControl(''),
    })
   }

  ngOnInit(): void {
    // console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user')!==null){
      this.router.navigateByUrl('/home');
    }
    this.firebaseservice.getDefaultTimer().subscribe(res=>{
      this.timerDefault = res.map(function(r){
        console.log(r.payload.doc.data());
        return r.payload.doc.data();
      })
     
    })
   
  }
  
  //method for startTimer
  startTimer(time:any) {
    // this.timeLeft = this.setupTimerForm.get('timeLeft')?.value;
    if(time==undefined){
      this.timeLeft = this.setupTimerForm.get('timeLeft')?.value;
      this.orginialTimerValue = this.setupTimerForm.get('timeLeft')?.value;
    }
    else{
      this.setupTimerForm.controls['timeLeft'].setValue(time);
      this.timeLeft=time;
      this.orginialTimerValue = time;
    } 
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.currentTimerValue = this.timeLeft;
      } else {
        this.timeLeft = 0;
        this.currentTimerValue = this.timeLeft;
        if(!this.playSound)
        {
          let audio: HTMLAudioElement = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
          audio.play();
          this.playSound=true;
        }
      }
    },1000)
    this.playSound=false;
  }

  // method for PauseTimer
  pauseTimer() {    
    console.log(this.currentTimerValue)
    this.timeLeftForm = this.currentTimerValue;
    clearInterval(this.interval);
  }

  // method for resetTimer
  resetTimer()
  {    
    console.log(this.orginialTimerValue);
    this.timeLeft = this.orginialTimerValue;
    this.timeLeftForm = this.orginialTimerValue;
    clearInterval(this.interval);
    this.playSound=false;
  }
 
}
