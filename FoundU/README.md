FoundU - Lost UCard Finder App

FoundU is a full-stack mobile application designed to help recover lost university identification cards (UCards) for students. The app enables users to take a photo of a found UCard, automatically detect the student's name using Google Vision API, and then notify the rightful owner by email. Using Puppeteer, the app automates the process of extracting email addresses from a university directory.

Table of Contents

Features

Technologies Used

Installation

Usage

Contributing

License

Features

Capture a picture of the found UCard.

Extract the student's name using Google Vision API.

Scrape email addresses from the university directory using Puppeteer.

Send emails to the detected student to inform them of their lost UCard.

Provide the user with options on whether they kept or left the card at a particular location.

Technologies Used

Frontend (Mobile App)

React Native: For building the cross-platform mobile application.

Expo: To simplify development and deployment for Android and iOS.

React Native Elements: For reusable UI components.

Google Vision API: For Optical Character Recognition (OCR) to detect the name from the UCard image.

Backend

Node.js and Express.js: For setting up the server to handle image uploads and send emails.

Multer: For handling file uploads in Node.js.

Nodemailer: For sending email notifications to students.

Puppeteer: For scraping email addresses from the university directory.

Environment Management

dotenv: For managing sensitive credentials and API keys.

Installation

Prerequisites

Node.js and npm or yarn installed on your machine.

Expo CLI installed globally: npm install -g expo-cli.

Clone the Repository

$ git clone https://github.com/username/FoundU.git
$ cd FoundU

Install Dependencies

Backend

$ cd server
$ npm install

Frontend

$ cd ../client
$ npm install

Set Up Environment Variables

Create a .env file in the server folder with the following values:

GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
API_KEY=your-google-vision-api-key

Usage

Running the Backend Server

$ cd server
$ npm start

The server will start on http://localhost:3000.

Running the Mobile App

$ cd client
$ expo start

Scan the QR code to run the app on your mobile device via Expo Go.

Project Flow

Capture the UCard Image: The app prompts the user to take a photo of the found UCard.

Detect the Name: The Google Vision API extracts the name from the card.

Retrieve Student Email: The name is sent to the backend, which scrapes the university directory using Puppeteer to get the student's email.

Send Notification: An email is sent to the student, notifying them of their lost UCard, with additional details such as location and contact information.

Contributing

FoundU is open for contributions. If you would like to contribute, feel free to submit a pull request. Please make sure your code follows the project's standards.

License

This project is licensed under the MIT License.

