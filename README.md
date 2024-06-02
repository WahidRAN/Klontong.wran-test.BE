# Express.js and PostgreSQL Setup Guide

This guide will help you set up an Express.js application with a PostgreSQL database.

## Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL installed and running on your machine.
- pgAdmin 4 for database management.

## Step 1: Import the PostgreSQL Database

1. **Import the Database using pgAdmin 4**:

    1. **Open pgAdmin 4**: Launch pgAdmin 4 on your machine.
    2. **Connect to Your Server**: Connect to your PostgreSQL server.
    3. **Select the Database**: In the pgAdmin tree view, expand the server and select the database where you want to import the data.
    4. **Open the Query Tool**:
        - Right-click on the database name.
        - Select `Query Tool` from the context menu.
    5. **Load the SQL File**:
        - In the Query Tool, click on the `File` menu.
        - Select `Open File` and navigate to `backup/your_database.sql`.
        - Open the SQL file.
    6. **Execute the SQL File**:
        - Click the `Execute` button (the lightning bolt icon) or press `F5` to run the SQL script.

2. **Verify the Import**:
    - Check the imported data by expanding the tables under the database in the tree view and querying the data.

## Step 2: Install Dependencies

1. **Install dependencies**:

    Navigate to the root directory of your project and run:

    ```bash
    npm install
    ```

## Step 3: Connect to the Database

1. **Create a `.env` file**:

    Create a `.env` file in the root directory of your project with the following content:

    ```plaintext
    DATABASE_USER=your_db_user
    DATABASE_HOST=localhost
    DATABASE_NAME=your_db_name
    DATABASE_PASSWORD=your_db_password
    DATABASE_PORT=5000

    SECRET_KEY=WahidRAN
    SERVICE_PORT=3000
    ```

2. **Ensure your `db.js` file is configured**:

    Your `db.js` file should look like this:

    ```javascript
    import pkg from "pg";
    const { Pool } = pkg;
    import "dotenv/config";

    const pool = new Pool({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: process.env.DATABASE_PORT,
    });

    export default pool;
    ```

## Step 4: Run the Seeder Script

1. **Run the seeder script**:

    Run the seeder script to populate the `product` table with initial data:

    ```bash
    node seeder/productSeeder.js
    ```

## Step 5: Run the Application

1. **Run your application**:

    Start your Express.js application using the following command:

    ```bash
    npm run dev
    ```

    Your Express.js application should now be running and connected to your PostgreSQL database. Visit `http://localhost:3000` to interact with the application.

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [node-postgres Documentation](https://node-postgres.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
