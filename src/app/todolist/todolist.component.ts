import { NgFor } from '@angular/common';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})


export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTask: string = '';
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  constructor() { }

  ngOnInit(): void {
      const storedTodoList = localStorage.getItem('todoList');
      
      //The if statement below is short for if storedTodoList is not null
      // then parse todoList's array into a JSON and assign it to this.todoList
      if (storedTodoList) {
          this.todoList = JSON.parse(storedTodoList);
      }
  }

  addTask(text: string): void {
      //The if statement below is specific to test if 
      // text is an empty string
      if (text.trim() !== '') {
          //Creates an object
          const newTodoItem: TodoItem = {
              //Unique id with timestamp
              id: Date.now(),
              //Trimmed text
              task: text.trim(),
              completed: false
          };
          //This push() function statement
          // adds the newTodoItem into todoList
          this.todoList.push(newTodoItem);

          //This makes the 'nativeElement.value' = nothing
          // in other words it clears the input field
          this.todoInputRef.nativeElement.value = '';

          //This function saves the TodoList into localstorage
          // *this function is defined below
          this.saveTodoList();
      }
  }

  deleteTask(id: number): void {
      //This function filters out this.todoList 
      // to EXCLUDE the item with a specific id
      this.todoList = this.todoList.filter(item => item.id !== id);
      //Then it saves this.todoList in its current state
      this.saveTodoList();
  }

  toggleCompleted(id: number): void {
      //Creates an object with type todoItem 
      // declares that this object is the item in todoItem
      // with a specific id using the find() function
      const todoItem = this.todoList.find(item => item.id === id);

      //if todoItem exists
      if (todoItem) {
          //then toggle the value of the completed variable
          todoItem.completed = !todoItem.completed;
          //invokes the saveTodoList method
          this.saveTodoList();
      }
  }

  //This defines the method of save TodoList
  saveTodoList(): void {
      //converts the todoList into a JSON string
      // and saves it to local storage under the keyword 'todoList'
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  
}

export class TodoItem{
    id: number = 0;
    task: string = '';
    completed: boolean = false;
  
  }
