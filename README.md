
# 📝 Blog App Backend with MySQL & Express

A simple RESTful API for managing users and blog data using **Node.js**, **Express**, and **MySQL**. The backend supports user registration, login, profile viewing, updating user information, searching users by last name, and managing blog posts.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Sign up and log in with email and password

* 👤 **User Management**

  * Get user profile with age calculation
  * Update user information (DOB and gender)
  * Search users by last name
  * Delete users by ID

* 📰 **Blog Management**

  * Get list of all blog posts

---

## 🛠️ Technologies Used

* **Node.js** + **Express** – Server & routing
* **MySQL** + **mysql2** – Database & SQL queries
* **Tailwind CSS** – Frontend styling (included in the example HTML)
* **Fetch API** – Communication between frontend and backend

---

## 📁 Project Structure

```
.
├── index.js            # Main server file
├── public/             # Frontend files (HTML, JS, CSS)
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

## 📦 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up MySQL Database**

   * Create a MySQL database named `c43blogapp`
   * Create a `users` table with fields:

     ```sql
     CREATE TABLE users (
       u_id INT AUTO_INCREMENT PRIMARY KEY,
       u_firstName VARCHAR(255),
       u_lastName VARCHAR(255),
       u_email VARCHAR(255),
       u_password VARCHAR(255),
       u_DOB DATE,
       u_gender VARCHAR(10)
     );
     ```
   * Optionally create a `blogs` table:

     ```sql
     CREATE TABLE blogs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255),
       content TEXT,
       author_id INT,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     );
     ```

4. **Start the server**

   ```bash
   node index.js
   ```

---

## 📡 API Endpoints

### 🧍 User APIs

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/auth/signup`        | Register new user           |
| POST   | `/auth/login`         | Login with email & password |
| GET    | `/user?searchKey=...` | Search users by last name   |
| GET    | `/user/:id/profile`   | Get user profile with age   |
| PATCH  | `/user/:id`           | Update user DOB and gender  |
| DELETE | `/user/:id`           | Delete user by ID           |

### 📰 Blog APIs

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/blog`  | Get all blog posts |

---

## 🌐 Frontend Example

Basic HTML frontend included in the project (Tailwind CSS styled) allows:

* Signup/Login
* Search users
* Update profile

> Note: Frontend is fully client-side and uses `fetch()` to call backend APIs.

---

## ⚠️ Important Notes

* Passwords are stored as plain text for simplicity. **Do NOT** use this in production.
* Add validation and input sanitization for security in a real-world app.
* Use environment variables (e.g., with `dotenv`) for DB credentials in production.

---

## 📬 Contact

For questions or contributions, feel free to open an issue or contact:

* GitHub: [@your-username](https://github.com/your-username)
* Email: [your.email@example.com](mailto:your.email@example.com)

---

## 📃 License

This project is licensed under the MIT License.

---

Let me know if you’d like me to turn this into a real GitHub repo structure or help you write a `.env` version for secure DB handling.
