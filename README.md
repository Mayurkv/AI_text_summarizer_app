# AI Summarizer

A full-stack AI summarization application with a React frontend, FastAPI backend, and PostgreSQL database.

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository_url>
cd <repository_name>
```

## Create a .env file in the project root with the following content:
```bash
OPENAI_API_BASE=https://api.groq.com/openai/v1
OPENAI_API_KEY=****
MODEL=llama-3.3-70b-versatile
DATABASE_URL=****

POSTGRES_USER=****
POSTGRES_PASSWORD=****
POSTGRES_DB=****
```
Replace **** with your actual credentials.


## Run the application using Docker Compose:
```bash
docker-compose --env-file <path_to_your_.env_file> up
```

## Access the app

Frontend: http://localhost:8080  
Backend: http://localhost:8000


## Notes

Ensure all environment variables are set correctly in the .env file.
This setup uses Docker Compose to start frontend, backend, and database services.
