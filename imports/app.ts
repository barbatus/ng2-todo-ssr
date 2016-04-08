import {Component, provide, enableProdMode} from 'angular2/core';

import {Tasks} from '../tasks';

import './components/task-list.ts';

import {TaskList} from './components/task-list';

enableProdMode();

@Component({
  selector: 'app',
  template: `<div class="container">
    <header>
      <h1>Todo List ({{todoCount}})</h1>

      <label class="hide-completed">
        <input type="checkbox" [(ngModel)]="hideCompleted"/>
          Hide Completed Tasks
      </label>

      <form class="new-task" (submit)="addTask(newTask); newTask = null;">
        <input [(ngModel)]="newTask" type="text" placeholder="Type to add new tasks" />
      </form>
    </header>

    <task-list [hideCompleted]="hideCompleted"></task-list>
  </div>`,
  directives: [TaskList]
})
export class Todos {
  addTask(text) {
    Tasks.insert({
      text: text,
      checked: false,
      private: false
    });
  }

  get todoCount() {
    return Tasks.find({
      checked: false
    }).count();
  };
}
