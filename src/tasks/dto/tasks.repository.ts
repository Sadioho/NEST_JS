/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from '../task-status.enum';
import { CreateTaskDto } from './create-task.dto';
import { FilterDto } from './get-tasks-filter.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: FilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      //tasks?status='OPEN'
      query.andWhere('task.status=:status', { status });
    }
    if (search) {
      //tasks?status='OPEN'
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
