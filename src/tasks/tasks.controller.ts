import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // [GET] /tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // [GET] /tasks/:id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // send req post để tạo Task new
  // [POST] /tasks
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    // ở đây gọi createTask từ service
    return this.tasksService.createTask(createTaskDto);
    // khi send req post thì nhận lại
    //   {
    //     "id": "a446c39f-858a-4f8c-b5fd-96c7406ca6f0",
    //     "title": "Clean my room",
    //     "description": "Lots of cleaning has to be done",
    //     "status": "OPEN"
    // }
  }
}
