# Angular & Firebase

## Basic Firebase CRUD Operations in Angular



Before you use any Firebase services, you need to have a firebase project.

Copy your Firebase SDK snippet and pase it into the _environment.ts_  and/or the _enviroment.prod.ts_ (use here your own)

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBBelCEwydvvB22rxGZAjtzzi-FegOtD5M',
    authDomain: 'tatry-hu.firebaseapp.com',
    databaseURL: 'https://tatry-hu-default-rtdb.firebaseio.com',
    projectId: 'tatry-hu',
    storageBucket: 'tatry-hu.appspot.com',
    messagingSenderId: '462378136237',
    appId: '1:462378136237:web:bc0ccf7d597ba8ae004c24',
    measurementId: 'G-6HTCG2STRD',
  },
}
```


Than you need to import the firebase modules into the app.module.ts

```ts
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'; // for Realtime Database
import { AngularFirestoreModule } from '@angular/fire/firestore'; // for Cloud Firestore
```
and initialise  the module in the imports section of the file.

```ts
  imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ...
  ],
```

After everything is set up, you can use it in any component file.

First import the needed packages

```ts
import {
  AngularFirestore,
  AngularFirestoreCollectionGroup,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
```

or

```ts
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
```

then inject them into the constructor

```ts
  constructor(
    private fs: AngularFirestore
  ) {}
```

or 

```ts
  constructor(
    private rtdb: AngularFireDatabase,
  ) {}
```

For listing the data use

```ts
    this.fsPeaks$ = this.fs
      .collection('places')
      .doc('peaks')
      .collection('peak', (ref) => ref.orderBy('elevation', 'desc'))
      .valueChanges();

```

for Firestore and

```ts
    this.rtdbPeaks$ = this.rtdb
      .list('places/peaks', (ref) => ref.orderByValue())
      .valueChanges();
```

for Realtime Database


After your are don with this, list the data in the html file of the component:


```html
<h2>Realtime Database</h2>
<ul>
  <li *ngFor="let peak of rtdbPeaks$ | async">
    {{ peak.name }}, {{ peak.elevation }}m
  </li>
</ul>
```
or

```html
<h2>Cloud Firestore</h2>
<ul>
  <li *ngFor="let peak of fsPeaks$ | async">
    {{ peak.name }}, {{ peak.elevation }}m
  </li>
</ul>
```

These are just examples, you need to use your own collections and documents data.
