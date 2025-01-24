# GIO - Global Innovator Olympiad

This document provides an overview of the Gio Gio project, a platform for organizing and managing the Global Innovator Olympiad.

## Project Description

Gio Gio is a comprehensive platform designed to facilitate the smooth and efficient execution of the Global Innovator Olympiad. It encompasses features for:

* **Participant Registration:** 
    * Online registration and submission of projects.
    * Participant profile management.
* **Judging & Evaluation:**
    * Online judging and scoring system.
    * Management of judges and their assignments.
    * Automated score calculation and result generation.
* **Event Management:**
    * Schedule and manage events (workshops, competitions, award ceremonies).
    * Send notifications and reminders to participants and organizers.
* **Admin Panel:** 
    * Dashboard for administrators to oversee all aspects of the Olympiad.
    * User management and role-based access control.
    * Data analysis and reporting.

## Technologies Used

* **Frontend:**
    * React
    * Next.js
    * Tailwind CSS
    * JavaScript
* **Backend:**
    * Node.js
    * Express.js 
    * [Specify Database: e.g., MongoDB, PostgreSQL]
* **Cloud:** 
    * [Specify cloud provider: e.g., AWS, Azure, Google Cloud] 
* **Other:** 
    * [List other relevant technologies: e.g., Docker, Kubernetes, CI/CD tools]

## Project Structure

* **`client`:** 
    * **`components`:** Reusable React components.
    * **`pages`:** Next.js pages for routing (e.g., `index.js`, `register.js`, `results.js`).
    * **`styles`:** Tailwind CSS configuration and global styles.
    * **`public`:** Static assets (images, logos, etc.).
* **`server`:** 
    * **`routes`:** API routes for user authentication, data management, etc.
    * **`models`:** Database models (e.g., User, Project, Judge).
    * **`controllers`:** Controllers to handle API requests.
    * **`services`:** Services for business logic and data processing.
* **`admin`:** 
    * **`components`:** Admin panel components.
    * **`pages`:** Admin panel pages (dashboard, user management, event management).

## Development

* **Start the development server:**
    ```bash
    npm run dev 
    ```

* **Build for production:**
    ```bash
    npm run build
    ```

* **Run the production server:**
    ```bash
    npm start
    ```
