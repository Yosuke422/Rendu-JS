import { Elysia} from 'elysia'
import { setupRoutes } from './routes/taskRouters'
import { userController } from './controllers/userControllers'
import { authentication } from './middleware/auth'


const app = new Elysia()
const mongoose = require("mongoose")

// Set up routes
setupRoutes(app)
userController(app)

// Start the application
app.listen(3000, () => {
  console.log('Server is running on port 3000')
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://youssefcharafeddine:jSfA1hgs14fL2PSK@cluster0.mdhh0e7.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err))

