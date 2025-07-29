
SocialSpace is a modern, full-stack social media application designed to provide a seamless and interactive user experience. It features a complete set of social networking functionalities, including user profiles, posts, comments, and a like/follow system. The project is built with a professional-grade technology stack, featuring a React frontend and an Express.js backend.

✨ **Features**
**User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).

**User Profiles:** View and manage user profiles with posts, followers, and following counts.

**Create & View Posts:** Users can create new posts and view a feed of all posts from the community.

**Commenting System:** Add comments to any post.

**Like/Unlike Posts:** Engage with content by liking or unliking posts.

**Follow/Unfollow Users:** Build a social network by following other users.

**Modern UI:** A clean, responsive, and mobile-friendly interface built with shadcn/ui and Tailwind CSS.

**Type-Safe Codebase:** Fully implemented in TypeScript for both frontend and backend to ensure robustness and maintainability.

**🛠️ Tech Stack**
This project is a monorepo containing two main parts: the server (backend) and the socialspace directory (frontend).

Area

Technology

**Backend**

Node.js, Express.js, TypeScript, Prisma ORM, SQLite, JWT, bcryptjs

**Frontend**

React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query

**Tooling**

ESLint, Prettier, npm

**🚀 Getting Started**
Follow these instructions to get the project up and running on your local machine for development and testing purposes.

**Prerequisites**
Node.js (v18 or newer recommended)

npm (comes with Node.js)

1. Clone the Repository
First, clone the project to your local machine.

git clone <your-repository-url>
cd socialspace

2. Install Backend Dependencies
Navigate to the server directory and install the required npm packages.

cd server
npm install

3. Install Frontend Dependencies
In a separate terminal, navigate to the socialspace (frontend) directory and install its dependencies.

# From the root directory
cd socialspace
npm install

4. Set Up the Database
The backend uses Prisma with a SQLite database. To create the database and apply the schema, run the migration command from the server directory.

# Make sure you are in the server/ directory
npx prisma migrate dev --name init

This will create a dev.db file inside the server/prisma/ directory.

5. Configure Environment Variables
The frontend needs to know the URL of the backend API.

Navigate to the frontend directory: cd socialspace

Create a new file named .env.

Add the following line to the .env file:

VITE_API_BASE_URL=http://localhost:5000

🏃‍♂️ Running the Application
To run the application, you need to start both the backend and frontend servers in two separate terminals.

1. Start the Backend Server
Navigate to the server directory.

Run the development script.

cd server
npm run dev

Your backend API will be running on http://localhost:5000.

2. Start the Frontend Application
Navigate to the socialspace (frontend) directory.

Run the development script.

cd socialspace
npm run dev

Your React application will be running on http://localhost:5173 (or another port if 5173 is busy). Open this URL in your browser to use the application.
