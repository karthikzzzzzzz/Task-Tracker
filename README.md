# Task Tracker

A simple task tracking application.


<img width="1437" alt="Screenshot 2025-02-21 at 7 17 09 PM" src="https://github.com/user-attachments/assets/a8c3c029-2282-491c-9019-d0084b4ffa06" />


## Features
- Create, update, and delete tasks.
- Mark tasks as complete.
- User authentication and session management.

## Setup

### Detailed Steps to Run with Docker

#### Prerequisites
Ensure Docker and Docker Compose are installed on your machine. If not, you can follow the instructions for installation from [Docker's website](https://www.docker.com/get-started).

#### Steps
1. **Clone the Repository:**
   Begin by cloning the repository to your local machine.
   ```bash
   git clone https://github.com/karthikzzzzzzz/Task-Tracker.git
   cd Task-Tracker


2. **Ensure Docker Compose is Setup: Inside the project, you should see a `docker-compose.yml` file. This file defines services for both the backend and frontend of the app**.

Build and Run the Application with Docker Compose: To build and run the application, use the following command:
```bash
docker-compose build
docker-compose up

This command does the following:
Builds the Docker images for the frontend and backend.
Starts the containers for both services.
Access the Application:
The frontend will be available at http://localhost:3000.
The backend will be available at http://localhost:5000.
You can open these URLs in your browser to interact with the application.
Stopping the Containers: To stop the running containers, use the following command:
bash
docker-compose down

```

