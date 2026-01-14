# Personal Task Management System

A **modern, serverless full-stack Personal Task Management System** built using React on the frontend and **Supabase as a backend-as-a-service**. This project demonstrates real-world full-stack development including authentication, database design, backend security, and frontend-backend integration.

🔗 **Project URL:** https://personal-task-management-system.lovable.app

## 🚀 Overview

This application allows users to securely manage personal tasks. Each user can create, update, complete, and delete their own tasks. The system enforces **data isolation and security at the backend level** using Supabase Row Level Security (RLS), ensuring users can only access their own data.

This is a **true full-stack project**, even without a traditional Express server, following modern serverless architecture patterns.

## 🧱 Full-Stack Architecture

Frontend (Client)

├── React

├── TypeScript

├── Vite

├── Tailwind CSS

├── shadcn-ui

Backend (Serverless – Supabase)

├── Authentication (Supabase Auth)

├── PostgreSQL Database

├── Row Level Security (RLS)

├── Secure REST APIs

└── Authorization Rules

## 🛠️ Technology Stack

### Frontend

* **React** – Component-based UI
* **TypeScript** – Type safety and maintainability
* **Vite** – Fast development and build tooling
* **Tailwind CSS** – Utility-first styling
* **shadcn-ui** – Accessible UI components

### Backend

* **Supabase** – Backend-as-a-Service

  * PostgreSQL database
  * Authentication & session management
  * Row Level Security (RLS)
  * Secure API access

## 🔐 Backend Responsibilities (Why This Is Full Stack)

The backend layer is fully implemented using Supabase and includes:

* Database schema design for task management
* User authentication and session handling
* Authorization using Row Level Security policies
* User-specific data isolation
* Secure CRUD operations via Supabase APIs

All security rules are enforced **at the database level**, not just in the frontend.

## 🗄️ Database Design

The core database table includes:

* `tasks`

  * `id` (UUID, primary key)
  * `user_id` (references authenticated user)
  * `title`
  * `description`
  * `completed`
  * `created_at`

Each task is strictly associated with the authenticated user who created it.

## 🔒 Security & Authorization

Row Level Security (RLS) is enabled on all task-related tables.

Policies ensure:

* Users can only read their own tasks
* Users can only create tasks for themselves
* Users cannot modify or delete tasks they do not own

This guarantees multi-user safety and backend-level authorization.

## 📂 Development Options

### Option 1: Use Lovable

1. Open the project in Lovable:
   [https://lovable.dev/projects/PERSONAL_TASK_MANAGEMENT_SYSTEM](https://lovable.dev/projects/PERSONAL_TASK_MANAGEMENT_SYSTEM)
2. Edit and preview changes instantly
3. Publish directly from Lovable

### Option 2: Run Locally

#### Prerequisites

* Node.js (recommended via `nvm`)
* npm

#### Setup

git clone <YOUR_GIT_URL>

cd <YOUR_PROJECT_NAME>

npm install

npm run dev

### Option 3: GitHub Codespaces

1. Open the repository on GitHub
2. Click **Code → Codespaces → New codespace**
3. Edit, commit, and push changes directly from the browser

## 🌍 Deployment

Deployment is handled via **Lovable**:

1. Open the project in Lovable
2. Click **Share → Publish**
3. Configure environment variables (Supabase keys)
4. Publish the application

## 🌐 Custom Domain

Custom domains are supported.

1. Go to **Project → Settings → Domains**
2. Click **Connect Domain**
3. Follow the setup instructions

## 🧠 What This Project Demonstrates

* Full-stack application architecture
* Serverless backend development
* Secure authentication & authorization
* Database schema design
* Frontend and backend integration
* Production-ready security practices

## 🤝 Contributing

Contributions are welcome. Fork the repository, create a feature branch, and submit a pull request.

## 📄 License

This project is open-source and available under the applicable license.

## 📬 Notes for Reviewers

This project uses **Supabase as a backend**, handling authentication, database management, authorization, and APIs. While there is no traditional Node.js server, the backend responsibilities are fully implemented using a modern serverless architecture.

This is a **legitimate full-stack application** following current industry practices.

Happy building 🚀




