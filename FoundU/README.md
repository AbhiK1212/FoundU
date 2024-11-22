# FoundU - Lost UCard Finder App

FoundU is a full-stack mobile application designed to help recover lost university identification cards (UCards) for students. The app enables users to take a photo of a found UCard, automatically detect the student's name using Google Vision API, and then notify the rightful owner by email. Using Puppeteer, the app automates the process of extracting email addresses from a university directory.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Capture a picture of the found UCard.
- Extract the student's name using Google Vision API.
- Scrape email addresses from the university directory using Puppeteer.
- Send emails to the detected student to inform them of their lost UCard.
- Provide the user with options on whether they kept or left the card at a particular location.

## Technologies Used

### Frontend (Mobile App)
- **React Native**: For building the cross-platform mobile application.
- **Expo**: To simplify development and deployment for Android and iOS.
- **React Native Elements**: For reusable UI components.
- **Google Vision API**: For Optical Character Recognition (OCR) to detect the name from the UCard image.

### Backend
- **Node.js** and **Express.js**: For setting up the server to handle image uploads and send emails.
- **Multer**: For handling file uploads in Node.js.
- **Nodemailer**: For sending email notifications to students.
- **Puppeteer**: For scraping email addresses from the university directory.

### Environment Management
- **dotenv**: For managing sensitive credentials and API keys.

## Installation

### Prerequisites

- **Node.js** and **npm** or **yarn** installed on your machine.
- **Expo CLI** installed globally: `npm install -g expo-cli`.

### Clone the Repository

```bash
$ git clone https://github.com/username/FoundU.git
$ cd FoundU
