import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemForm;
  items;
  user;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });

    this.afAuth.authState.subscribe(user => this.user = user);
    this.afs.collection('spaces').valueChanges().subscribe(items => this.items = items );
  }

  ngOnInit() {
  }

  addItem(item) {
    item.id = this.afs.createId();
    return this.afs.collection('spaces').doc(item.id).set(item);
  }

  deleteItem(item) {
    return this.afs.collection('spaces').doc(item.id).delete();
  }

  onSubmit(): void {
    this.addItem(this.itemForm.value);
    this.itemForm.reset();
  }

}
