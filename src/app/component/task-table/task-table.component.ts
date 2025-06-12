import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    RouterModule,
    IonCardTitle,
    IonCardSubtitle,
  ],
})
export class TaskTableComponent implements OnInit {
  @Input() tasks: any[] = [];

  constructor(private router: Router) {}

  goTaskForm(id: number) {
    this.router.navigate(['/task', id]);
  }

  ngOnInit() {}
}
