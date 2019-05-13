import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Form and Firestore Import **/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createAccountForm: FormGroup;
  
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createAccountForm = formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  async createAccount() {
    const loading = await this.loadingCtrl.create();

    const fname = this.createAccountForm.value.fname;
    const lname = this.createAccountForm.value.lname;
    const email = this.createAccountForm.value.email;

    this.firestoreService
      .createAccount(fname, lname, email)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          console.error(error);
        }
      );

    return await loading.present();
  }

  ngOnInit() {
  }

}
