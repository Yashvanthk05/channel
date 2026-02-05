<img src="./assets/channel_banner.png" style="border-radius:5px"/>

## Channel: Markdown Blogging Platform

A modern, fast, and secure markdown-based blogging platform built with Bun, React, and Node.js. It supports rich content creation, authentication, SEO-friendly slugs, and real-time markdown rendering.

## Tech Stack

| Category           | Technology                      |
| ------------------ | ------------------------------- |
| **Runtime**        | Bun                             |
| **Frontend**       | React, Tailwind CSS             |
| **Backend**        | Node.js, Express                |
| **Database**       | MongoDB                         |
| **Validation**     | Zod                             |
| **Authentication** | JWT, Cookie Parser              |
| **Content**        | React Markdown, Remark / Rehype |
| **SEO**            | Slugify                         |

## API Endpoints

### Authentication (`/v1/auth`)

- `POST /register` - User registration with validation
- `POST /login` - User login with JWT token generation
- `POST /logout` - User logout

### Blog (`/v1/blog`)

- `GET /` - Fetch all blog posts
- `GET /:slug` - Fetch blog post by slug
- `POST /` - Create new blog post (authenticated)
- `PUT /:id` - Update blog post (authenticated)
- `DELETE /:id` - Delete blog post (authenticated)

## Project Structure

```
backend/
├── controllers/     # Route logic (auth, blog)
├── middlewares/     # Auth & validation middleware
├── models/          # MongoDB schemas (User, Blog)
├── routes/          # API route definitions
├── schemas/         # Zod validation schemas
├── utils/           # Database & JWT utilities
└── index.js         # Server entry point
```
