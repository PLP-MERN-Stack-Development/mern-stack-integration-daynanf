# MERN Blog — Submission

## Overview
A full-stack MERN blog application demonstrating:
- Express + MongoDB REST API
- React front-end (Vite) styled with Tailwind CSS
- JWT authentication (register/login)
- Full CRUD for posts, image uploads, comments
- Protected routes and role-based actions (author-only update/delete)

## Setup

### Server
1. `cd server`
2. `cp .env.example .env` and set `MONGO_URI` and `JWT_SECRET`
3. `npm install`
4. `npm run dev` (runs nodemon on port 5000)

### Client
1. `cd client`
2. `npm install`
3. `npm run dev` (Vite dev server)

## Usage
- Register a user (POST `/api/auth/register`), then login to receive a token.
- Use the token in `Authorization: Bearer <token>` for protected endpoints (create/update/delete posts, comment).

## Notes
- Images stored locally in `server/uploads` for dev. See `server/middleware/upload.js`.
- To use S3: configure `multer-s3` and environment AWS variables (instructions in docs).

## Screenshots
Add screenshots of the running app and MongoDB Compass / Atlas.

## Grading checklist
- [x] REST API endpoints implemented
- [x] React components and hooks used
- [x] Auth implemented (JWT)
- [x] Image upload implemented
- [x] Comments implemented
