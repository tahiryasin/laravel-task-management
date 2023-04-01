# Task Management System

## Requirements
- PHP 8.1+
- Laravel 10+
- Vue 3+

## Installation
1. Clone repository `git clone git@github.com:tahiryasin/laravel-task-management.git'
2. Change current directory to project directory
3. Install composer dependencies: `composer install`
4. Create .env `cp .env.example .env`
5. Generate an application key: `php artisan key:generate`
6. Update the `.env` file with your database credentials and other settings

```
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

7. Run database migrations and seeders: `php artisan migrate --seed`
8. Install NPM dependencies and build assets
```
npm install
npm run build
```
9. Start the development server: `php artisan serve`
10. Open the application in your browser: **http://localhost:8000/**
