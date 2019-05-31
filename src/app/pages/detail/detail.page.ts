import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../../models/account.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  // @ViewChild('profile') profile: ElementRef;

  public account: any;
  public accountId: string;
  public imageURL: any;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.account = this.firestore.getAccountDetail(this.accountId);
  }

  ngAfterViewInit() {
    this.account.then(ref => {
      console.log(ref.file_id);
      return ref.file_id;
    }).then(file_id => {
      this.imageURL = this.firestore.getAccountPictureURL(file_id);
    });
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete the account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestore.deleteAccount(this.accountId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
