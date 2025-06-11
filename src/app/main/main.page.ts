import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonMenuButton,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRouterOutlet,
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRouterOutlet,
    RouterModule,
  ],
})
export class MainPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
