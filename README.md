# Web Technologies Project

This project was developed as part of the "Web Technologies" course. It is built using VanillaJS, NodeJS, ExpressJS, and AJAX.
The goal of this project is to provide a web-based solution for professors at faculties to track student attendance.

## Getting Started

To run this project on your local machine, please follow the instructions below:

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine or download the source code as a ZIP file and extract it.
2. Open a terminal and navigate to the project directory.
3. Install the required packages by running the following command `npm install`
4. Once the installation is complete, start the server by running the following command: `node index.js`
5. The server will start running, and you should see a message indicating that it's listening on port 3000.
6. Open your web browser and visit `http://localhost:3000/` to access the project.

## Usage

The project is designed to be used by professors at faculties for tracking student attendance. Professors need to log in with their username and password. However, for testing purposes, you can use the following credentials to access all features of the project:

- Username: Profesor1
- Password: Sifra1

Once logged in, you will see a list of subjects where you are assigned as a professor. Clicking on a subject will display a table with the attendance of all students enrolled in that subject. The table is organized by weeks, and the current week column will contain green and red boxes to indicate if a student was present or not. Arrows are provided to navigate between past and future weeks.

For a visual demonstration, please check out our [Demo Video](https://youtu.be/CkWWloLQObU).

## Features

- User authentication: Professors can log in with their username and password to access the system.
- Subject selection: Professors can view a list of subjects they are assigned to and select a subject to view attendance details.
- Student attendance tracking: Professors can view attendance tables for selected subjects, organized by weeks. Current week column highlights student attendance with green and red boxes.
- Attendance cancellation: Professors can cancel the presence of students if needed.
- Week navigation: Arrows are provided to navigate between past and future weeks for easy access to attendance records.
- User-friendly interface: The project provides an intuitive interface for easy navigation and interaction.

## Acknowledgements

This project was developed as part of the "Web Technologies" course and benefited from the guidance and support of the course instructors.
Thank you for your interest in this project!
