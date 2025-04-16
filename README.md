# truthnet-project
TruthNet Project
# Overview
TruthNet is a web-based platform designed for crowdsourcing the assessment of URL and content credibility. The platform allows users to vote on the credibility of online content, providing labels such as “Accurate,” “Unclear,” “Inaccurate,” and “Misleading.” This system leverages user input to aggregate feedback on the credibility of various online sources, offering a way for users to contribute to the evaluation of web content in an open-source manner.

# Features
Content Rating System: Users can rate the credibility of URLs and content with predefined labels.

User Authentication: Built-in authentication system for users to log in and vote.

Crowdsourcing Votes: Multiple users can vote on content, and votes are aggregated to provide credibility scores.

Real-time Updates: Credibility scores are updated immediately after a vote is cast.

Demo Environment: Uses an H2 database for demo purposes (for actual implementation, a cloud database solution is recommended).

# Technologies Used
Frontend: Angular

Backend: Spring Boot with JPA

Database: H2 for demo purposes

Authentication: Microsoft Multi-Factor Authentication (MFA)

Version Control: Git, GitHub

# Setup
Prerequisites
Make sure you have the following installed:

Node.js (for frontend)

Java (for backend)

Maven (for backend dependency management)

Git (for version control)

## 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/KaijieWan/truthnet-project.git
cd truthnet-project

## 2. Set Up the Backend
Navigate to the backend directory.

Run the Spring Boot application.

bash
Copy
Edit
cd backend
mvn spring-boot:run
The backend should now be running at http://localhost:8080.

## 3. Set Up the Frontend
Navigate to the frontend directory.

Install dependencies.

bash
Copy
Edit
cd frontend
npm install
Run the Angular app.

bash
Copy
Edit
ng serve
The frontend should now be running at http://localhost:4200.

# Usage
Frontend: Visit http://localhost:4200 in your browser to interact with the platform.

Backend: The backend API is accessible at http://localhost:8080 for CRUD operations related to content credibility and voting.

# Cloud Integration
In potential implementations, the backend can be deployed to the cloud with cloud-based database solutions (e.g., PostgreSQL on AWS or Azure). The demo version uses an H2 database for local testing.

# Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure that any changes are well-documented.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
Angular

Spring Boot

H2 Database

Microsoft MFA
