# Gym Management Project

Welcome to the Gym Management Project – a comprehensive, state-of-the-art fitness management system designed to streamline gym operations and enhance member engagement. Built with a robust Django backend and an intuitive React frontend, this project offers a seamless and efficient experience for gym administrators and users alike.

The system consists of a single module with an admin superuser who manages all data and system operations.

## Project Structure

- **Backend**: Django REST API with JWT authentication, SQLite database, and Gmail SMTP email configuration.
- **Frontend**: React app with routes for Home, Features, Offers, Contact, Login and a backend Sidebar.

This project is an excellent showcase of full-stack development capabilities, combining powerful backend functionality with a rich, responsive user interface — perfect for demonstrating skills in web application development and modern UI/UX design.

## Backend

### Requirements
- Python packages listed in `Backend/backendprj/requirements.txt`

### Setup & Run
1. Navigate to the backend directory:
   ```
   cd Backend/backendprj
   ```
2. (Optional) Create and activate a virtual environment
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run Django migrations:
   ```
   python manage.py migrate
   ```
5. Run development server:
   ```
   python manage.py runserver
   ```

## Frontend

### Requirements
- Node.js with dependencies listed in `Frontend/package.json`

### Setup & Run
1. Navigate to the frontend directory:
   ```
   cd Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run React development server:
   ```
   npm start
   ```
4. Open your browser to `http://localhost:3000`

### Available Routes
- `/` - Home page
- `/features` - Features page
- `/offer` - Offer page
- `/contact` - Contact page
- `/login` - Login page
- `/sidebar` - Backend sidebar (admin/dashboard related)

### Backend (Admin) Module (`/sidebar`)
After login, the `/sidebar` route loads the admin dashboard and management pages, located in `Frontend/src/Components/Backend/`. This module allows the admin superuser to manage gym data, including:
- Dashboard overview
- Enquiries: View, add, edit
- Plans: View, add, edit
- Equipment: View, add, edit
- Members: View, add, edit
- Sidebar navigation with intuitive UI for easy data management

## Notes

- Backend API supports CORS from frontend `localhost:3000`.
- Configured to use Gmail SMTP for email features (update email credentials in backend settings).
- Uses JWT authentication for API security.

## License

MIT License
