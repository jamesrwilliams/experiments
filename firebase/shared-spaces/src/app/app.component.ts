import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shared-spaces';

  loggedIn = false;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {

    console.log('Hello World');

  }

}
