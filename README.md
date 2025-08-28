# Time Capsule Project

## Introduction

Time Capsule is a web application that allows users to preserve their memories and thoughts by creating digital time capsules. Users can upload images, videos, and messages, select an unlock date in the future, and personalize their capsules with themes and cover images. This project aims to create a nostalgic and meaningful experience for users by allowing them to revisit their past at a chosen future date.

## Project Type

Fullstack

## Deployed App

Deployed Link: https://digital-time-capsul.netlify.app/

## Directory Structure

```bash
Digital Capsule/
├─ src/
│  ├─ components/
|  ├─ firebase/
│  ├─ pages/
│  ├─ contexts/
│  ├─ styles/
│  ├─ utils/
│  └─ App.jsx
```

## Video Walkthrough of the project

https://youtu.be/Ir0I3pwJPMI

## Features

- Created multiple time capsules with different unlock dates
- Add text message, images, videos to each capsule
- Upload a cover image for each capsule
- Choose from customizable themes to personalize capsules
- View all capsules in a clean dashboard
- Capsules remain locked until their unlock date

## Design Decisions or Assumptions

- Firebase is used for auth and Firestore for real-time DB
- Cloudinary is used to store media and cover images
- Capsules can only be edited before being saved
- Capsules are locked until their unlock date (only metadata shown)
- All users must log in to create and view their own capsules

## Installation & Getting Started

Clone the repository and install dependencies for both frontend and backend.

# Clone repo

```bash
git clone https://github.com/yogitaj-30/Digital-Time-Capsule.git
cd Digital-Time-Capsule
```

### Frontend

```bash
npm install
npm run dev
```

### Firebase

- Set up Firebase Auth, Firestore
- Update `firebase/config.js` with your credentials

### Cloudinary

- Set up an account and create upload presets for media and cover images
- Update utility function with your `cloud_name` and `upload_preset`

## Usage

1. Sign up or log in
2. Create a new time capsule
3. Add a title, message, unlock date
4. Upload optional cover image and media
5. Choose a theme and save the capsule
6. View all capsules from dashboard (media is hidden until unlock date)

## Credentials

- Email: `demo@example.com`
- Password: `demo123`

## APIs Used

- Firebase Auth (for authentication)
- Firebase Firestore (for storing capsules)
- Cloudinary (for storing media)

## API Endpoints

Handled by Firebase Firestore SDK:

- `GET /capsules` - Fetch all user capsules
- `POST /capsules` - Create a new capsule
- `GET /capsules/:id` - Fetch capsule by ID

## Technology Stack

- React.js
- Firebase Auth
- Firebase Firestore
- Cloudinary (media storage)
- TailwindCSS (styling)
- SweetAlert2 (alerts)

---
