import {Component, Input} from 'angular2/core';

import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'task',
  template: `<li [ngClass]="{checked: task.checked, private: task.private}">
    <button class="delete" (click)="deleteTask()">&times;</button>

    <input type="checkbox" #cb
      [ngModel]="task.checked"
      (change)="setChecked(cb.checked)"
      class="toggle-checked" />

    <button class="toggle-private" (click)="setAccess()">
      {{task.private ? "Private" : "Public"}}
    </button>

    <span class="text">
      <strong>{{task.username}}</strong>
      {{task.username ? '-' : ''}} {{task.text}}
    </span>
  </li>`
})
export class TaskView extends MeteorComponent {
  @Input('data') task: Task;

  setChecked(checked) {
    this.call('tasks.setChecked', this.task._id,
      checked);
  }

  setAccess() {
    this.call('tasks.setPrivate', this.task._id,
      !this.task.private);
  }

  deleteTask() {
    this.call('tasks.deleteTask', this.task._id);
  }
}
