#Visitor Management System - Assessment 1 IFN636

## Description
JIRA:https://devhburnett.atlassian.net/jira/software/projects/VMS/boards/34
EC2: https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#InstanceDetails:instanceId=i-0fdefdcf1d81ede67

This is a CRUD application designed to  handle visitor check-ins. It features a React frontend that communicates with a Node.js/Express backend, with data stored in a MongoDB database. The system allows for user registration and authentication, and provides separate functionalities for managing tasks and visitors.

## Features

*   **User Authentication:** Secure user registration and login using JWT.
*   **Visitor Check-in:** A public-facing form for visitors to check in.
*   **Visitor Management:** A protected dashboard for authenticated users to view, search, edit, and delete visitor records.
*   **Responsive UI:** The application is designed to be used on various screen sizes.

## Tech Stack

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web framework for Node.js.
*   **MongoDB:** NoSQL database for data storage.
*   **Mongoose:** ODM library for MongoDB.
*   **JWT (JSON Web Token):** For handling user authentication.
*   **cors:** For enabling Cross-Origin Resource Sharing.
*   **dotenv:** For managing environment variables.

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **React Router:** For handling client-side routing.
*   **Axios:** For making HTTP requests to the backend API.
*   **Tailwind CSS:** For styling the user interface.

## Project Structure

```
.
├── backend/      # Contains the Node.js/Express server, models, routes, and controllers.
└── frontend/     # Contains the React application, components, and pages.
```

## Setup and Installation

To get this project running locally, follow these steps:

### Prerequisites

*   Node.js and npm installed.
*   MongoDB installed and running, or a MongoDB Atlas cluster URI.


