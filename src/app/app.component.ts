import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonRouterOutlet,
    RouterModule,
  ],
})
export class AppComponent {
  constructor() {}
}
