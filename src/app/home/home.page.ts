import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** For accessing Firestore **/
import { Observable } from 'rxjs';
import { Account } from '../models/account.interface';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public accountList;

  constructor(
    private firestore: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountList = this.firestore.getAccountList().valueChanges();
  }
}
