# Blog Posts CRUD Application

A simple web application built with **Next.js**, **Laravel**, and **MySQL** that allows user authentication and enables users to view, search, and manage posts. This application features a **dashboard** that lists all posts, displays detailed content, and allows for filtering posts by their title. Authenticated users can navigate to an edit page to modify posts.

![Login Form](https://i.imgur.com/2D1tLsn.png)

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces, used for the front-end of the application.
- **TypeScript**: Provides type safety and autocompletion for better development experience.
- **Next.js**: A React framework that enables server-side rendering, routing, and other essential features for building React applications.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application with a custom design and making it responsive.
- **Axios**: A promise-based HTTP client used to fetch data from an API endpoint.

### Backend
- **Laravel**: A PHP framework for building the backend API to manage posts, handling database operations, and providing RESTful routes for fetching posts.
- **MySQL**: A relational database management system used to store posts and other necessary data.
  
## Features

- **User Authentication**: Users can register and log in to the application using email and password.
- **Email Verification**: New users must verify their email addresses before they can access the application.
- **Posts Listing**: Displays a list of all posts with their titles, content previews, and creation dates.
- **Search Functionality**: Allows users to filter posts by title as they type in the search bar.
- **Post Details**: Clicking on a post redirects the user to the post's detailed page.
- **Edit Posts**: Only authenticated users can edit their own posts.

![Post Listing](https://github.com/user-attachments/assets/273185ec-3d9a-4cf3-9e3d-f36b0a271781)
![Add New Posts](https://github.com/user-attachments/assets/5d267a11-c4bd-41ca-b8e2-86443b3313b0)


## Requirements

### Frontend:
- **Node.js** (v16.x or higher)
- **npm** (or **yarn**) for package management

### Backend:
- **PHP** (v8.4 or higher)
- **Composer** for dependency management
- **Laravel** (v11.x or higher)
- **MySQL** or **MariaDB** for the database

## Installation

Follow the steps below to get the application up and running:

### 1. Clone the Repository
```bash
git clone https://github.com/YuKiFdo/Blog-Website-CRUD
```
### 2. Install Front end dependacies
```bash
#Navigate to frontend
cd Blog-Website-CRUD/blog-frontend

#intall dependencies
npm install

# Run Frontend Application
npm run dev
```
### 3. Backend Setup
```bash
#Navigate to backend
cd Blog-Website-CRUD/blog-backend

#install php dependencies
composer install

* Configure .env file with your DB_Connections and SMTP Connection

# Generate application key
php artisan key:generate

# Run Database migrations
php artisan migrate

# Start Laravel Server
php artisan serve
```

5. Access the Application
 - The frontend will be available at http://localhost:3000.
 - The backend will be available at http://localhost:8000.


## API Endpoints
The frontend communicates with the following API endpoints:

- **POST /login**: Logs in an existing user (authentication required via Sanctum).
- **POST /register**: Registers a new user (authentication required via Sanctum).
- **GET /api/posts**: Fetches a list of all posts (authentication required).
- **GET /api/posts/{id}**: Fetches the details of a specific post (authentication required).
- **POST /api/posts**: Creates a new post (authentication required).
- **PUT /api/posts/{id}**: Updates an existing post (authentication required).
- **DELETE /api/posts/{id}**: Deletes a specific post (authentication required).
- **GET /api/authposts**: Fetches posts that belong to the authenticated user (authentication required).

## License
This project is licensed under the **MIT** License
