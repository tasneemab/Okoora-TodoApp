import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/api/todo.service';
import { SnackBarService } from 'src/app/components/snackbar/snackbar.component';
import { Task } from 'src/app/routes/dashboard/task';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  /**
    * boolean var that shows whether all tasks displayed or just completed
    * bydefault get false, which means displays all tasks
    */
  public completed: boolean = false;

  /**
    * object to hold all tasks
    */
  public tasks: any[] = [];

  /**
    * show the tasks number
    */
  public tasksNo: number = 0;

  /**
    * object to holds a temp version of tasks object
    */
  public tempTasks: any[] = [];

  constructor(
    private todoService: TodoService,
    private snackbarService: SnackBarService,
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.fetchUserToDos();
  }

  /**
    * add new task to the existing list
    */
  addTask() {
    this.matDialog.open(DialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((res: any) => {
      if (!res) { return };
      const data = {
        id: this.tasks.length + 1,
        title: res,
        completed: false,
      };

      this.todoService.store(data).subscribe((res: any) => {
        this.tasks.unshift(data);
        this.snackbarService.saveSucceeded();
      }, (_error: any) => {
        this.snackbarService.tryAgain();
      });
    });
  }

  /**
    * marks task as completed
    */
  completeTask(task: Task) {
    task.completed = !task.completed;
  }

  /**
    * fetch user's to-do list
    */
  fetchUserToDos() {
    const params = {
      q: ''
    }
    this.todoService.index(1, params).subscribe((res: any) => {
      this.tasks = res
      this.tempTasks = res;
      this.tasksNo = res.length;
    });
  }

  /**
    * delete task
    */
  removeTask(task: any) {
    this.todoService.delete(task.id).subscribe((res: any) => {
      this.tempTasks.splice(this.tempTasks.indexOf(task), 1);
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.snackbarService.deleteSucceeded();
    }, (_error: any) => {
      this.snackbarService.tryAgain();
    });
  }

  /**
    * display only completed taks
    */
  showCompletedTasks() {
    let temp_tasks: any[] = [];
    // get a deep clone of the current tasks object
    const tasks = JSON.parse(JSON.stringify(this.tasks));
    if (!this.completed) {
      temp_tasks = tasks.filter((task: Task) => task.completed);
      this.completed = true;
    }
    else {
      temp_tasks = tasks;
      this.completed = false
    }
    this.tempTasks = temp_tasks;
  }

  /**
    * show tasks according to the number the user choose
    */
  showSomeTasks(amount: number) {
    this.tasksNo = amount;
    this.tempTasks = this.tasks.slice(0, amount);
  }
}
function Dialog(Dialog: any, arg1: { width: string; enterAnimationDuration: any; exitAnimationDuration: any; }) {
  throw new Error('Function not implemented.');
}
