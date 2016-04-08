import {Component, Input, OnChanges} from 'angular2/core';

import './task.ts';

import {TaskView} from './task';

import {MeteorComponent} from 'angular2-meteor';

import {Tasks} from '../../tasks';

@Component({
  selector: 'task-list',
  template: `<div *ngIf="!isLoading">
    <ul *ngFor="#task of tasks">
      <task [data]="task"></task>
    </ul>
  </div>
  <div *ngIf="isLoading" class="loader">
    <span>loading...</span>
  </div>`,
  directives: [TaskView]
})
export class TaskList extends MeteorComponent implements OnChanges {
  tasks: Mongo.Cursor<Task>;
  @Input() hideCompleted: boolean = false;
  isLoading: boolean;

  constructor() {
    super();
    this.isLoading = true;
    this.subscribe('tasks.public', () => {
      this.isLoading = false;
    }, true);
  }

  ngOnChanges() {
    this.tasks = this._getTasks(this.hideCompleted);
  }

  _getTasks(hideCompleted) {
    if (hideCompleted) {
      return Tasks.find({
        checked: false
      });
    }
    return Tasks.find({});
  }
}
