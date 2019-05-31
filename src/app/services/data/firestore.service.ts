import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Account } from '../../models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore,
              private filestorage: AngularFireStorage) {}

  createAccount(
    fname: string,
    lname: string,
    email: string,
    image: File
  ): Promise<void> {
    const id = this.firestore.createId();
    const fileId = Math.random().toString(36).substring(2);
    console.log(id);

    return this.filestorage.ref(fileId).put(image).then(ref => {
      return this.firestore.doc(`trial_accounts/${id}`).set({
        id: id,
        first_name: fname,
        last_name: lname,
        email: email,
        file_id: fileId
      });
    });
  }

  getAccountList(): AngularFirestoreCollection<Account> {
    return this.firestore.collection('trial_accounts');
  }

  getAccountDetail(accountId: string): any {
    return this.firestore.collection('trial_accounts').doc(accountId).ref.get().then(doc => {
      return doc.data();
    });
  }

  deleteAccount(accountId: string): Promise<void> {
    return this.firestore.doc(`trial_accounts/${accountId}`).delete();
  }

  getAccountPictureURL(fileId: string): any {
    return this.filestorage.ref(fileId).getDownloadURL();
  }
}
