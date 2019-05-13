import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Account } from '../../models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

  createAccount(
    fname: string,
    lname: string,
    email: string
  ): Promise<void> {
    const id = this.firestore.createId();

    console.log(id);

    return this.firestore.doc(`trial_accounts/${id}`).set({
      id: id,
      first_name: fname,
      last_name: lname,
      email: email
    });
  }

  getAccountList(): AngularFirestoreCollection<Account> {
    return this.firestore.collection('trial_accounts');
  }

  getAccountDetail(accountId: string): AngularFirestoreDocument<Account> {
    return this.firestore.collection('trial_accounts').doc(accountId);
  }

  deleteAccount(accountId: string): Promise<void> {
    return this.firestore.doc(`trial_accounts/${accountId}`).delete();
  }
}
