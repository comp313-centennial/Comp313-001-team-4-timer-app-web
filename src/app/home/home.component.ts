import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @Output() islogout=new EventEmitter<void>()
  constructor(public firebaseservice:FirebaseService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('user'));
  }
  logout(){
    this.firebaseservice.logout();
    this.islogout.emit();
  }
}
