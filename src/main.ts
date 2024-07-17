import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TodoListComponent } from './app/todolist/todolist.component';

bootstrapApplication(TodoListComponent, appConfig)
  .catch((err) => console.error(err));
