import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // [GET] /tasks
  @Get()
  getTasks(@Query() filterDto: FilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  // [GET] /tasks/:id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // [DELETE] /tasks/:id
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  // [UPDATE] /tasks/:id/status
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
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
