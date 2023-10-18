import { Elysia, t } from 'elysia'
import {Task} from '../models/tasks'

export const taskController = (app: Elysia) =>
  app.group('', (app: Elysia) => 
    app
    .post('/', async (handler) => {
        try {
          const newTask = new Task(handler.body)
          const savedTask = await newTask.save()

          return savedTask
        } catch (e: any) {
          if (e.name === 'MongoServerError' && e.code === 11000) {
            handler.set.status = 422
            return {
              message: 'Resource already exists!',
              status: 422,
            }
          }

          handler.set.status = 500;
          return {
            message: 'Unable to save entry to the database!',
            status: 500,
          }
        }
      })
      .get('/', async ({ set }) => {
        try {
          const tasks = await Task.find({})
          return tasks
        } catch (e: unknown) {
          set.status = 500
          return {
            message: 'Unable to retrieve items from the database!',
            status: 500,
          };
        }
      })

      .get('/:id', async (handler) => {
        try {
          const { id } = handler.params

          const existingTask = await Task.findById(id)

          if (!existingTask) {
            handler.set.status = 404
            return {
              message: 'Requested resource was not found!',
              status: 404,
            };
          }

          return existingTask;
        } catch (e: unknown) {
          handler.set.status = 500
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          }
        }
      })

      .patch('/:id', async (handler) => {
        try {
        const { id } = handler.params
        const changes = handler.body 

        const updatedTask = await Task.findByIdAndUpdate(id, changes as { title?: string, description?: string, completed?: boolean }, {
            new: true,
        })

        if (!updatedTask) {
            handler.set.status = 404
            return {
                message: `User with id: ${id} was not found.`,
                status: 404,
            };
        }

          return updatedTask
        } catch (e: unknown) {
          handler.set.status = 500
          return {
            message: 'Unable to update resource!',
            status: 500,
          };
        }
      })

      .delete('/:id', async (handler) => {
        try {
          const { id } = handler.params;
          const existingUser = await Task.findById(id)

          if (!existingUser) {
            handler.set.status = 404
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            };
          }

          await Task.findByIdAndRemove(id);

          return {
            message: `Resource deleted successfully!`,
            status: 200,
          };
        } catch (e: unknown) {
          handler.set.status = 500;
          return {
            message: 'Unable to delete resource!',
            status: 500,
          };
        }
      })
  );
