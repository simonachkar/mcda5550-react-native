# Storing Data in React Native using SQLite 📲

React Native provides local data storage on devices through various means, including SQLite, lightweight relational database.

There are many libraries used in React Native to store data on the device with SQLite. In this lecture we are using `expo-sqlite`.

> Note: `expo-sqlite` is not supported on web platforms.

- [Expo SQLite Docs](https://docs.expo.dev/versions/latest/sdk/sqlite/)

## Todo App with SQLite ✅

It's a simple Todo App that shows how to save your todos on your phone using SQLite. You can make a list of tasks, see them, and cross them off when you're done. Everything stays on your phone, so you can see your list anytime, even without the internet.

## Running the app

To run the Todo App, follow these steps:

1. Navigate to the project directory.
1. Run `npm install` to install the necessary dependencies.
1. Start the app with `npm start`

## Database Integration

- Database initialization happens in `database.ts` using `SQLite.openDatabaseSync`
- Creates a `todos` table with `id` and `text` columns if it doesn't exist
- Web platform support handled with mock implementation
- Database operations in app:
  - `getAllAsync`: Fetch todos on app load
  - `runAsync`: Insert/delete todos with SQL queries
  - State updates synchronized with database changes

