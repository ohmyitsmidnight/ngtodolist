import { bootstrapApplication } from '@angular/platform-browser';
import { TodoListComponent } from './app/todolist/todolist.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(TodoListComponent, config);

export default bootstrap;
