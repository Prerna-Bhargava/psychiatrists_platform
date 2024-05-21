#  psychiatrists_platform

## Overview

This project is a Node.js and Express-based application with MySQL as the database. It provides a RESTful API for creating a new patient with validation check on name,address,email, phone number , password and photo.
Photo should be a base64 image string

## Major Libraries/Frameworks Used

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used for building fast and scalable network applications.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It’s used for building the RESTful API.
- **MySQL**: A relational database management system. It is used for storing user data.

### Specific Reasons for Using These Libraries/Frameworks

- **Node.js**: Offers non-blocking, event-driven architecture, which makes it ideal for building real-time applications.
- **Express**: Simplifies the development process with its robust routing and middleware options. It also has a large ecosystem of plugins.
- **MySQL**: Provides a reliable, scalable, and easy-to-use database solution. It's widely used and well-supported.

## API Endpoints


### Create a New User

- **POST /patients/register**
  - **Description**: Register a based.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "address": "string",
      "email": "string",
      "password": "string",
      "photo": "string (base64)",
      "phone": "string (optional)"
    }
    ```
  - **Responses**:
    - `200/201 Created`: User successfully created.
    - `400 Bad Request`: Missing or invalid fields.

#### Fetch all the psychiatrists, their count along with IDs and patient details for a hospital. 

- **POST /psychiatrists/details**
  - **Request Body**:
    ```json
    {
      "hospitalId": 1,
    }
    ```

  - **Responses**:
    - `200 OK`: Succesful resonse with the required details.
    ```json
      {
        "hospitalName": "Jawaharlal Nehru Medical College and Hospital",
        "totalPsychiatrists": 3,
        "totalPatients": 10,
        "psychiatristDetails": [
          {
            "id": "1",
            "name": "Dr. John Doe",
            "patientsCount": 4,
            "patients": [
              {
                "id": "1001",
                "name": "Patient A",
                "patient_count": 2
              }, {
                "id": "1002",
                "name": "Patient B",
                "patient_count": 6
              },
              {
                "id": "1003",
                "name": "Patient C",
                "patient_count": 2
              }
            ]
          }
        ]
      }
    ```

## Postman/Swagger Link

You can test the API using the following link:
- [Postman Collection](https://www.postman.com/galactic-spaceship-104152/workspace/psychiatrists/collection/20570774-776c1ee9-8fcf-46a2-8771-c88912c3d4f7?action=share&creator=20570774) 

## Setup

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Prerna-Bhargava/psychiatrists_platform

2. Update MySQL Database Credentials in the .env folder
3. Database Dump:
Inside the database folder of the cloned repository, there is a database dump file ( Dump.sql). You can import this dump file into your MySQL Workbench to set up the database schema and initial data. Open MySQL Workbench, create a new database (if not already created), and then import the dump file into this new database.Dump the database dump file(inside the database folder) in the sql workbench
4. Start the project
   ```sh
   npm start
