# Technology Stack

This document provides a comprehensive overview of the technology stack used in this Flask-based portfolio website.

## Backend Framework

### Flask 3.1.2
- **Purpose**: Core web framework for handling HTTP requests, routing, and rendering templates
- **Key Features Used**:
  - Routing (`@app.route()`)
  - Template rendering with Jinja2
  - Request handling
  - Flash messages for user feedback

### Flask Extensions

#### Flask-Mail 0.10.0
- **Purpose**: Email functionality for contact form submissions
- **Configuration**: Uses Gmail SMTP server
- **Features**: Sends email notifications when users submit the contact form

#### Flask-CORS 6.0.1
- **Purpose**: Cross-Origin Resource Sharing support
- **Usage**: Enables frontend-backend communication from different origins

#### Flask-SQLAlchemy 3.1.1
- **Purpose**: ORM (Object-Relational Mapping) for database operations
- **Database**: PostgreSQL
- **Models**: Contacts model for storing form submissions

## Frontend Technologies

### HTML5
- Semantic markup
- Single-page application structure with partials
- Forms for user interaction

### CSS3
- Custom styling
- Responsive design
- Modern layout techniques

### Bootstrap
- CSS framework for responsive design
- Pre-built UI components
- Grid system for layout

### Vanilla JavaScript
- **Purpose**: Client-side interactivity without additional frameworks
- **Key Features**:
  - `history.pushState` for smooth page navigation
  - Single-page application behavior
  - Dynamic content loading

## Database

### PostgreSQL
- **Purpose**: Primary database for storing contact form submissions
- **Access**: Through SQLAlchemy ORM
- **Version**: Compatible with SQLAlchemy 2.0.44

## Deployment & Infrastructure

### Gunicorn 23.0.0
- **Purpose**: WSGI HTTP server for running Flask application in production
- **Configuration**: Defined in `Procfile`

### Railway / Vercel
- **Purpose**: Platform-as-a-Service (PaaS) for deployment
- **Features**:
  - Automatic deployment from GitHub
  - Environment variable management
  - PostgreSQL database hosting

### Azure Web App (Alternative)
- **Purpose**: Alternative deployment platform
- **CI/CD**: GitHub Actions workflow (`.github/workflows/main_razaali.yml`)

## Development Tools

### python-dotenv 1.1.1
- **Purpose**: Load environment variables from `.env` file
- **Security**: Keeps sensitive data (API keys, passwords) out of source code

## Environment Variables

The application requires the following environment variables (see `.envexample`):

- `MAIL_USERNAME`: Gmail address for sending emails
- `MAIL_PASSWORD`: Gmail app password (required if 2FA is enabled)
- `SECRET_KEY`: Flask secret key for session management
- `DATABASE_URL`: PostgreSQL database connection string (optional, for production)

## Dependencies

All required packages are listed in `requirements.txt`:
```
Flask==3.1.2
Flask-CORS==6.0.1
Flask-Mail==0.10.0
Flask-SQLAlchemy==3.1.1
gunicorn==23.0.0
python-dotenv==1.1.1
```

## Installation

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate virtual environment:
   - Linux/Mac: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create `.env` file with required environment variables
6. Run the application: `python backend/app.py`

## Production Deployment

The application uses Gunicorn as specified in the `Procfile`:
```
web: gunicorn backend.app:app
```

This ensures the Flask application runs efficiently in production environments.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  HTML5 + CSS3 + Vanilla JavaScript + Bootstrap             │
│  (Single Page Navigation with history.pushState)           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ HTTP/HTTPS
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      Flask Backend                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Flask 3.1.2 (Web Framework)                        │   │
│  │  + Flask-Mail (Email)                               │   │
│  │  + Flask-CORS (CORS Support)                        │   │
│  │  + Flask-SQLAlchemy (ORM)                           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ SQLAlchemy
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    PostgreSQL Database                      │
│              (Contact Form Submissions)                     │
└─────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

1. **Flask over Django**: Chosen for its simplicity and flexibility for a portfolio website
2. **Vanilla JavaScript**: No heavy frameworks needed for the simple interactivity required
3. **PostgreSQL**: Reliable, production-ready relational database
4. **Flask-SQLAlchemy**: Provides Python-friendly database operations
5. **Single Page Navigation**: Uses `history.pushState` for smooth transitions without page reloads
6. **Email Notifications**: Flask-Mail provides immediate feedback on contact form submissions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- HTML5 and CSS3 features required
- JavaScript enabled for dynamic functionality
