# API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
All protected routes require authentication. Include credentials in requests:
```javascript
axios.defaults.withCredentials = true;
```

## User Endpoints

### Register User
```http
POST /user/register
```

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123",
  "role": "student" // or "recruiter"
}
```

**Response:**
```json
{
  "message": "Account created successfully",
  "user": {
    "_id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "role": "student"
  },
  "success": true
}
```

### Login User
```http
POST /user/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Get User Profile
```http
GET /user/profile
```
*Requires authentication*

### Update User Profile
```http
POST /user/profile/update
```
*Requires authentication*

**Request Body (FormData):**
```
fullname: "Updated Name"
email: "updated@example.com"
phoneNumber: "9876543210"
bio: "Updated bio"
skills: "JavaScript,React,Node.js"
file: [resume file]
```

### Logout User
```http
POST /user/logout
```
*Requires authentication*

## Job Endpoints

### Get All Jobs
```http
GET /job/get?keyword=developer
```

**Query Parameters:**
- `keyword` (optional): Search term for jobs

**Response:**
```json
{
  "jobs": [
    {
      "_id": "job_id",
      "title": "Frontend Developer",
      "description": "Job description",
      "position": "5",
      "jobType": "Full-time",
      "salary": "12",
      "location": "Bangalore",
      "companyID": {
        "_id": "company_id",
        "companyName": "Tech Corp",
        "logo": "logo_url"
      }
    }
  ],
  "success": true
}
```

### Get Job by ID
```http
GET /job/get/:id
```

### Create Job
```http
POST /job/create
```
*Requires authentication (recruiter only)*

**Request Body:**
```json
{
  "title": "Backend Developer",
  "description": "We are looking for a skilled backend developer",
  "position": "3",
  "jobType": "Full-time",
  "salary": "15",
  "location": "Mumbai",
  "experience": "2-3 years",
  "companyID": "company_id"
}
```

### Get Admin Jobs
```http
GET /job/getadminjobs
```
*Requires authentication (recruiter only)*

### Update Job
```http
PUT /job/update/:id
```
*Requires authentication (recruiter only)*

## Company Endpoints

### Get All Companies
```http
GET /company/get
```

### Get Company by ID
```http
GET /company/get/:id
```

### Register Company
```http
POST /company/register
```
*Requires authentication (recruiter only)*

**Request Body:**
```json
{
  "companyName": "Tech Solutions Inc",
  "description": "Leading technology company",
  "website": "https://techsolutions.com",
  "location": "San Francisco"
}
```

### Update Company
```http
PUT /company/update/:id
```
*Requires authentication (recruiter only)*

**Request Body (FormData):**
```
companyName: "Updated Company Name"
description: "Updated description"
website: "https://updated-website.com"
location: "Updated Location"
file: [logo file]
```

## Application Endpoints

### Apply to Job
```http
POST /application/apply/:jobId
```
*Requires authentication (student only)*

### Get User Applications
```http
GET /application/get
```
*Requires authentication (student only)*

### Get Job Applicants
```http
GET /application/:jobId/applicants
```
*Requires authentication (recruiter only)*

### Update Application Status
```http
POST /application/status/:applicationId/update
```
*Requires authentication (recruiter only)*

**Request Body:**
```json
{
  "status": "accepted" // or "rejected"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "All fields are required",
  "success": false
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized access",
  "success": false
}
```

### 403 Forbidden
```json
{
  "message": "You are not authorized to perform this action",
  "success": false
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "success": false
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "success": false
}
```

## File Upload Guidelines

### Supported Resume Formats
- PDF (.pdf)
- Word Document (.doc, .docx)
- Maximum size: 5MB

### Supported Image Formats (Company Logo)
- JPEG (.jpg, .jpeg)
- PNG (.png)
- Maximum size: 2MB
- Recommended dimensions: 200x200px (square)

## Rate Limiting
- Maximum 100 requests per 15 minutes per IP
- Authentication endpoints: 5 requests per 15 minutes

## CORS Configuration
The API accepts requests from:
- `http://localhost:5173` (development)
- Your production frontend domain

## Security Features
- JWT tokens expire after 24 hours
- Passwords are hashed using bcrypt
- File uploads are validated for type and size
- CORS protection enabled
- Rate limiting implemented
