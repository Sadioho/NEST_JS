import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // send req post để tạo Task new
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    // gọi service truyền dữ liệu qua service để lưu lại
    return this.tasksService.createTask(title, description);
    // khi send req post thì nhận lại
    //   {
    //     "id": "a446c39f-858a-4f8c-b5fd-96c7406ca6f0",
    //     "title": "Clean my room",
    //     "description": "Lots of cleaning has to be done",
    //     "status": "OPEN"
    // }
  }
}
