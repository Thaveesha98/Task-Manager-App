# Task Manager API

A robust Node.js backend application for managing tasks, built with Express.js and MongoDB. Features secure user authentication, task management, file uploads, and email notifications.

## 🌟 Features

- **User Authentication**
  - Secure JWT-based authentication
  - User registration and login
  - Password encryption and token management

- **Task Management**
  - Create, read, update, and delete tasks
  - Task filtering and pagination
  - Task status tracking

- **File Management**
  - Profile picture uploads using Multer
  - Automatic image optimization with Sharp
  - Support for multiple file formats

- **Notifications**
  - Email notifications via SendGrid
  - Welcome emails for new users
  - Task reminder notifications

## 🚀 Live Demo

Access the live application at: [Task Manager App](https://thavee-task-manager-f4d1fb5590fd.herokuapp.com)

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- MongoDB (v4.0.0 or higher)
- NPM or Yarn package manager
- Heroku CLI (for deployment)

## ⚙️ Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install

   # Using Yarn
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   MONGODB_URL=mongodb://127.0.0.1:27017/task-manager

   # Authentication
   JWT_SECRET=your_jwt_secret_key

   # Email Service
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. **Start the Application**
   ```bash
   # Development mode
   npm run dev
   # OR
   yarn dev

   # Production mode
   npm start
   # OR
   yarn start
   ```

## 🔄 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Register a new user |
| POST | `/users/login` | User login |
| POST | `/users/logout` | User logout |
| POST | `/users/logoutAll` | Logout from all devices |

### User Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get user profile |
| PATCH | `/users/me` | Update user profile |
| DELETE | `/users/me` | Delete user account |
| POST | `/users/me/avatar` | Upload profile picture |
| DELETE | `/users/me/avatar` | Delete profile picture |

### Task Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create new task |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| PATCH | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

## 🚀 Deployment

### Deploying to Heroku

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URL=your_mongodb_url
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set SENDGRID_API_KEY=your_sendgrid_key
   ```

4. **Deploy Application**
   ```bash
   git push heroku main
   ```

## 🛠️ Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer
- **Image Processing**: Sharp
- **Email Service**: SendGrid
- **Environment Management**: env-cmd
- **Validation**: Validator.js

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📮 Contact

For questions or support, please [open an issue](https://github.com/thaveesha98/Task-Manager-App/issues) or contact the maintainer.
