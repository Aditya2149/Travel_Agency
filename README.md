# Travel Agency Booking System

## Project Overview

This is a full-stack travel agency booking application built as part of a MERN stack internship assignment. The application allows users to browse tour packages, make bookings, and provides an admin panel for package management.

## Features

### User Features
- Browse available tour packages
- View detailed package information
- Book tour packages
- Generate booking invoices

### Admin Features
- Add new tour packages
- Update existing packages
- Delete packages
- View all bookings

## Tech Stack

- **Frontend:** React.js
- **Styling:** TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSql
- **Additional Libraries:** 
  - Axios for API calls
  - pg for PostgreSql interactions

## Prerequisites

- Node.js (v14 or later)
- npm
- PostgreSql

## Installation

### Clone the Repository
```bash
git clone https://github.com/Aditya2149/Travel_Agency.git
cd Travel_Agency
```

### Backend Setup
```bash
cd backend
npx nodemon server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` files in backend directories with necessary configurations:

**Backend `.env`:**
```
DB_HOST = your PostgreSQL host
DB_PORT = your PostgreSQL port
DB_USER = your PostgreSQL username
DB_PASSWORD = your PostgreSQL password
DB_NAME = your database name
DB_SSL_CA=your certificate
PORT=3000
```

## API Endpoints

### Public Endpoints
- `GET api/packages`: Retrieve all tour packages
- `GET api/packages/:id`: Retrieve specific package details
- `POST api/bookings`: Submit a package booking

### Admin Endpoints
- `POST /admin/packages`: Add new package
- `PUT /admin/packages/:id`: Update package
- `DELETE /admin/packages/:id`: Delete package

## Admin Access
- **Route:** `/admin`
- **Credentials:** Hardcoded for demo purposes

## Bonus Features
- Responsive design
- Basic invoice generation

## Project Structure
```
Travel_Agency/
│
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── services/
│
├── backend/            # Node.js backend
|   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
```

## Future Improvements
- Implement user authentication
- Add advanced booking analytics
- Generate downloadable PDF invoices
- Enhance search and filter capabilities

## Deployment
Deployed on: [(https://travel-agency-1-i7d2.onrender.com/)]

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
[Aditya Kumar] - [aroy86606@gmail.com]

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/travel-agency.git
   cd travel-agency
