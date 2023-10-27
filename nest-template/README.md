# NestJS Template Project

This project provides a template for creating a new application using the NestJS framework. Follow the instructions below to get started with this template.

## Quickstart

This section guides you through the steps needed to set up the project locally for development purposes.

### Prerequisites

- Node.js
- Yarn
- Docker

### Installation

1. **Install Dependencies:**

    Execute the following command to install the project dependencies:

    ```bash
    yarn install
    ```

2. **Start Docker Services:**

    Utilize Docker to run the database. Run the command:

    ```bash
    docker-compose up
    ```

3. **Run Migrations:**

    After starting the services, you need to run the database migrations using the command:

    ```bash
    yarn migration:run
    ```

4. **Start in Development Mode:**

    Now, you can start the application in development mode by running:

    ```bash
    yarn start:dev
    ```

## 🛂 Authentication

This template comes with built-in authentication features. Below are the details for using the authentication endpoints.

### Register a New User (Sign Up)

Create a new user account by sending a POST request to the following endpoint:

- Endpoint: `[POST] http://localhost:3000/auth/signup`

- Payload:

    ```json
    {
      "username": "desired_username",
      "password": "YourSecurePassword123!",
      "email": "youremail@example.com",
      "firstName": "YourFirstName",
      "lastName": "YourLastName"
    }
    ```

### User Login (Sign In)

Authenticate and log in a user by sending a POST request to the following endpoint:

- Endpoint: `[POST] http://localhost:3000/auth/signin`

- Payload:

    ```json
    {
      "username": "your_username",
      "password": "YourSecurePassword123!"
    }
    ```
