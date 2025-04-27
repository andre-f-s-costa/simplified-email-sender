# Simplified email sender

A service developed with a focus on decoupling, modularity and ease of use, it consumes messages from a queue (RabbitMQ) and sends emails using providers such as SMTP, SendGrid or Amazon SES, with support for content customization and log persistence in MongoDB.

## Why use Simplified email sender?
This email sender is a lightweight and modular service that seamlessly integrates into various environments, it also provides an HTTP API for use in simple projects, test environments, demos and prototypes.

## Main features

- API REST for sending emails asynchronously

- Easy setup

- Queue integration (RabbitMQ)

- Support for multiple email providers

- Logs persist in MongoDB

- Best suited for small projects, test environments and demos

## Default execution

- ### Set environment variables first:
  - Create an .env file
  - Add the variables as the example below:
    - SENDER_NAME = "JOE"
    - SENDER_PASS = "xxxx xxxx xxxx xxxx"
    - SENDER_EMAIL = "joe@gmail.com"
    - DB_URL = "mongodb://mongodb:27017/email_service"
    - RABBITMQ_URL = "amqp://admin:admin@rabbitmq:5672"
  - Optional variable **(to use in API integration)**:
    - ORIGIN = ""
  - Replace each placeholder with your actual credentials
  - **OBS:**
    - SENDER_PASS may vary depending on the provider (gmail, hotmail, etc)

- ### Via docker:
  - **Requirements**:
    - Docker

  - Run the command ```docker compose up --build```
- ### Directly:
  - **Requirements**:
    - Node.js v18+ (LTS preferable)
    - rabbitmq (cloud or local)
    - mongodb

  - Run the command ```npm install``` first
  - Then run the command ```npm run build```
  - And start with the command ```npm start```

## Endpoint usage examples:

### POST /email-queue/
BODY
```
{
    "emailTarget": "john.smith@gmail.com",
    "subject": "Testing",
    "message": "Hello...",
    "html": "<p>Hello, testing <strong>HTML</strong></p>"
}
```
RESPONSE
```
"Email sent to queue. You can check the status of this email using the id: 3f4f0ceb-0ca4-4282-a760-01df45000edf"
```

### GET /email-logs/3f4f0ceb-0ca4-4282-a760-01df45000edf
RESPONSE
```
{
    "_id": "67fe44840d19c02b7bc7e58d",
    "trackId": "3f4f0ceb-0ca4-4282-a760-01df45000edf",
    "emailTarget": "john.smith@gmail.com",
    "status": "SENT",
    "subject": "Testing",
    "sentAt": "Tue Apr 15 2025 11:35:32 GMT+0000 (Coordinated Universal Time)",
    "createdAt": "2025-04-15T11:35:32.850Z",
    "updatedAt": "2025-04-15T11:35:32.850Z",
    "__v": 0
}
```

### GET /email-logs/
RESPONSE
```
[
    {
        "_id": "67fe44840d19c02b7bc7e58d",
        "trackId": "3f4f0ceb-0ca4-4282-a760-01df45000edf",
        "emailTarget": "john.smith@gmail.com",
        "status": "SENT",
        "subject": "Testing",
        "sentAt": "Tue Apr 15 2025 11:35:32 GMT+0000 (Coordinated Universal Time)",
        "createdAt": "2025-04-15T11:35:32.850Z",
        "updatedAt": "2025-04-15T11:35:32.850Z",
        "__v": 0
    },
    {
        "_id": "67fe44840d19c02b7bc7e58d",
        "trackId": "3f4f0ceb-0ca4-4282-a760-01df45000edf",
        "emailTarget": "john.smith@gmail.com",
        "status": "SENT",
        "subject": "Testing",
        "sentAt": "Mon Apr 21 2025 17:47:46 GMT+0000 (Coordinated Universal Time)",
        "createdAt": "2025-04-21T17:47:46.937Z",
        "updatedAt": "2025-04-21T17:47:46.937Z",
        "__v": 0
    },
    {
        "_id": "67fe44840d19c02b7bc7e58d",
        "trackId": "3f4f0ceb-0ca4-4282-a760-01df45000edf",
        "emailTarget": "john.smith@gmail.com",
        "status": "SENT",
        "subject": "Testing",
        "sentAt": "Mon Apr 21 2025 18:11:40 GMT+0000 (Coordinated Universal Time)",
        "createdAt": "2025-04-21T18:11:40.150Z",
        "updatedAt": "2025-04-21T18:11:40.150Z",
        "__v": 0
    },
    {
        "_id": "67fe44840d19c02b7bc7e58d",
        "trackId": "3f4f0ceb-0ca4-4282-a760-01df45000edf",
        "emailTarget": "john.smith@gmail.com",
        "status": "SENT",
        "subject": "Testing",
        "sentAt": "Mon Apr 21 2025 19:04:00 GMT+0000 (Coordinated Universal Time)",
        "createdAt": "2025-04-21T19:04:00.376Z",
        "updatedAt": "2025-04-21T19:04:00.376Z",
        "__v": 0
    },
]
```