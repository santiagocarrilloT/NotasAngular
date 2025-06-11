import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonMenuButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.page.html',
  styleUrls: ['./form-component.page.scss'],
  standalone: true,
  imports: [
    IonMenuButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class FormComponentPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
