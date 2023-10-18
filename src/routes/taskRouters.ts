import { Elysia } from 'elysia'
import { taskController } from '../controllers/taskControllers'

export const setupRoutes = (app: Elysia) => {
  taskController(app)
}
