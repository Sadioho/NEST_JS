import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './dto/task.entity';
import { TasksRepository } from './dto/tasks.repository';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    //  inject thằng tasksRepository vào đây
    //  kiểu khai báo cái store từ task.entity[chỉ là 1 cái table] -> tasksRepository rồi lôi vào đây sử dụng
    //  thay cho lúc trước phải khai báo như thế này private tasks: Task[] = [];
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterDto: FilterDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto, user);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" "${user}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
