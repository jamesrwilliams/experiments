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
  spaceForm;
  shareForm;

  spaces;
  userSpaces;
  items;
  user;

  currentItems;
  activeSpace;
  itemsCollectionRef;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.itemForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });

    this.spaceForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });

    this.shareForm = new FormGroup({
      user: new FormControl('', Validators.required),
    });

    this.afAuth.authState.subscribe(user => {
      this.user = user;

      // All spaces ref.
      this.afs.collection('spaces').valueChanges().subscribe(spaces => this.spaces = spaces );

      this.afs.collection('users').doc(user.uid).collection('spaces').valueChanges().subscribe( userSpaces => {
        this.userSpaces = userSpaces;
      });

      // Active space
      this.afs.collection('users').doc(user.uid).valueChanges().subscribe(( userMeta: any ) => {

        if (userMeta && typeof userMeta.activeSpace !== 'undefined') {

          console.log(`Active Space ID: ${userMeta.activeSpace.id}`);

          // Is this active space valid?
          this.afs.collection('spaces').doc(userMeta.activeSpace.id).get().toPromise().then(() => {
            this.activeSpace = userMeta.activeSpace;
          }).catch(error => {
            console.log(error);
            this.updateActiveSpace(this.userSpaces[0]);
          });
        } else {
          if ( this.userSpaces.length > 0 ) {
            this.updateActiveSpace(this.userSpaces[0]);
          } else {
            console.log(`Creating new space:`);
            this.addSpace({title: 'My First space'});
          }
        }

        if (userMeta.activeSpace) {
          this.afs.collection('spaces').doc(userMeta.activeSpace.id).collection('items').valueChanges().subscribe((items) => {
            this.currentItems = items;
          });
        } else {
          console.log(userMeta.activeSpace);
        }

      });

    });

  }

  ngOnInit() {
  }

  addItem(item) {
    item.id = this.afs.createId();
    return this.afs.collection('spaces').doc(this.activeSpace.id).collection('items').doc(item.id).set(item);
  }

  deleteItem(item) {
    return this.afs.collection('spaces').doc(this.activeSpace.id).collection('items').doc(item.id).delete().catch((error) => {
      console.warn(error);
    });
  }

  itemOnSubmit(): void {
    this.addItem(this.itemForm.value);
    this.itemForm.reset();
  }

  addSpace(space) {
    space.id = this.afs.createId();
    const createSpace = this.afs.collection('spaces').doc(space.id).set(space).catch(error => console.warn(error));
    const createSpaceRef = this.afs.collection('users').doc(this.user.uid).collection('spaces').doc(space.id).set({
      title: space.title,
      id: space.id
    });

    const activeSpace = this.updateActiveSpace(space);

    return Promise.all([createSpace, createSpaceRef, activeSpace]).catch(error => console.log(error));

  }

  updateActiveSpace(newActiveSpace) {
    return this.afs.collection('users').doc(this.user.uid).set({
      activeSpace: newActiveSpace
    }).then(pass => {
      this.activeSpace = newActiveSpace;
    });
  }

  deleteSpace(spaceID) {

    const spaceRef = this.afs.collection('spaces').doc(spaceID).delete();
    const spaceUserRef = this.afs.collection('users').doc(this.user.uid).collection('spaces').doc(spaceID).delete();

    return Promise.all([spaceRef, spaceUserRef]);
  }

  spaceOnSubmit(): void {
    this.addSpace(this.spaceForm.value);
    this.spaceForm.reset();
  }

  addUserToSpace(): void {
    const recpient = this.shareForm.value.user;
    this.spaceForm.reset();

    this.afs.collection('users').doc(recpient).collection('spaces').doc(this.activeSpace.id).set(this.activeSpace);

  }

  getSpace(id) {
    return this.afs.collection('spaces').doc(id).get().toPromise();
  }

  async isValidSpace(id) {
    return new Promise((resolve, error) => {
      this.afs.collection('spaces').doc(id).collection('items');
    });
  }

}
