import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  leadedFeature: string = 'recipe'

  onNavigate(feature:string){
    this.leadedFeature = feature;
  }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCSmi1QRtjCvm0a9Z-AZQ-xokc4g4rsuN4",
      authDomain: "ng-recipe-book-78b02.firebaseapp.com"
    })
  }
}
