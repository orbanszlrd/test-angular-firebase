import { Component } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollectionGroup,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public rtdbPeaks$;
  public fsPeaks$;

  constructor(
    private rtdb: AngularFireDatabase,
    private fs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.rtdbPeaks$ = this.rtdb
      .list('places/peaks', (ref) => ref.orderByValue())
      .valueChanges();

    this.fsPeaks$ = this.fs
      .collection('places')
      .doc('peaks')
      .collection('peak', (ref) => ref.orderBy('elevation', 'desc'))
      .valueChanges();

    //    let peak = { name: 'Východná Vysoká', elevation: 2429 };
    //    this.addPeak(peak);
  }

  ngOnDestroy(): void {}

  addPeak(peak): void {
    // Realtime Database
    this.rtdb.list('places/peaks').push(peak);

    // Cloud Firestore
    this.fs.collection('places').doc('peaks').collection('peak').add(peak);
  }

  deletePeak() {}

  updatePeak() {}
}
