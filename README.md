# Assignment Management System

A responsive Assignment Management System built using **React.js and Tailwind CSS**, designed for two user roles: Admin (Professor) and Student.

The application allows Admins to create and manage assignments, assign them to students, and monitor submission progress. Students can view their assignments, track pending tasks, and confirm their submissions.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/vinaysunkari30/Assignment-Management-System.git
```

**2. Navigate to the project directory**

```bash
cd YOUR_PROJECT_FOLDER
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
    or 
npm start
```

**5. Open the application**

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```


## Project Structure
 
 ```text
src/
│
├── components/       
│   ├── FormField.jsx
│   ├── MobileMenu.jsx
│   ├── Modal.jsx
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   └── Toast.jsx
│
├── data/
│   ├── seededAssignments.js
│   ├── seededUsers.js
│   └── tabsList.jsx
│
├── Layout/
│   └── Outlet.jsx
│
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── Assignments.jsx
│   │   ├── Students.jsx
│   │   └── Progress.jsx
│   │
│   └── student/
│       ├── StudentDashboard.jsx
│       ├── StudentAssignments.jsx
│       ├── Pendings.jsx
│       └── Submitted.jsx
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── App.jsx
└── main.jsx
```


## Features

 1. Login and Role Management

 2. Admin Dashboard

 3. Student Dashboard

## Tech Stack

| Technology        | Purpose                        |
| ----------------- | ------------------------------ |
| React.js          | Frontend development           |
| JavaScript (ES6+) | Application logic              |
| Tailwind CSS      | Styling and responsive design  |
| React Router DOM  | Navigation and routing         |
| React Hooks       | State and lifecycle management |
| React Icons       | Icons and visual elements      |
| localStorage      | Client-side data persistence   |



## Component Architecture

The application follows a component-based architecture to keep the code organized, reusable, and maintainable.

### Components

Contains reusable UI elements and role-specific dashboard components.

- **FormField:** Reusable form input component.
- **Modal:** Displays confirmation dialogs and forms.
- **Toast:** Displays success and error messages.
- **Sidebar:** Provides navigation links.
- **Navbar:** Displays the application navigation.
- **MobileMenu:** Handles mobile navigation.

### Pages

Contains the main application screens.

- **Admin pages:** AdminDashboard, Assignments, Students, and Progress.
- **Student pages:** StudentDashboard, StudentAssignments, Pendings, and Submitted.

### Data

Contains seeded user data, assignment data, and navigation tab configurations.

### Layout

Contains the shared layout structure used to display navigation and page content.

### Routes

Handles application navigation and role-based route protection.

- **AppRoutes:** Defines application routes.
- **ProtectedRoute:** Restricts access to authenticated users with the appropriate role.
- **PublicRoute:** Handles routes accessible without authentication.

## Key Design Decisions

### 1. Role-Based Access

Separate Admin and Student experiences provide role-specific functionality and prevent users from accessing unrelated dashboard sections.

### 2. Component Reusability

Common UI elements and dashboard sections are separated into reusable components to reduce code duplication and improve maintainability.

### 3. localStorage for Data Persistence

Since the assignment does not require a backend, localStorage is used to store users, assignments, and submission information. This allows application data to persist across page refreshes.

### 4. Two-Step Submission Confirmation

A confirmation process is used before updating an assignment to Submitted. This helps prevent accidental submissions.

### 5. Responsive Design

Tailwind CSS responsive utilities are used to provide a consistent experience across mobile, tablet, and desktop screens.

### 6. Assignment Ownership

Admins can manage only the assignments they created, while students can access only assignments assigned to them.


## Deployment

The application was deployed using Vercel.

**Live Demo:** - https://vinay-assignment-management-system.vercel.app

## Author

**Vinay Sunkari**

Full Stack/MERN Stack Developer

