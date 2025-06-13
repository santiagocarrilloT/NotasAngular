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
  IonButton,
  IonIcon,
  IonText,
  MenuController,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
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
    IonButton,
    IonIcon,
    IonText,
  ],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      logOutOutline,
    });
  }

  onLogout() {
    this.menu.close();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
