import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn=false;

  constructor(public firebaseAuth:AngularFireAuth,private http:HttpClient,private angularFirestore: AngularFirestore) { }
   signin(email:string,password:string){
     return this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      
      this.isLoggedIn=true;
      sessionStorage.setItem('user',JSON.stringify(res.user))
    })
  }
  signup(user:any){
    
   const newheaders = { 'content-type': 'application/json'}  
    
     return this.http.post(`https://us-central1-timerapp-2c41e.cloudfunctions.net/user/registerUser`,user,
     {headers:newheaders})
  }
  logout(){
    this.firebaseAuth.signOut();
    sessionStorage.removeItem('user');
    this.isLoggedIn=false;
  }
  getDefaultTimer(){
    return this.angularFirestore.collection('timer_defaults').snapshotChanges();
  }
}
