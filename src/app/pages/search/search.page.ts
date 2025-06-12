import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskSearchComponent } from 'src/app/component/task-search/task-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TaskSearchComponent],
})
export class SearchPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
