# Storing Data in React Native using SQLite 📱

React Native provides local data storage on devices through various means, including SQLite, lightweight relational database.

There are many libraries used in React Native to store data on the device with SQLite. In this lecture we are using `expo-sqlite`.

> Note: `expo-sqlite` is not supported on web platforms.

- [Expo SQLite Docs](https://docs.expo.dev/versions/latest/sdk/sqlite/)

## About This App (Todo App with SQLite)

It's a simple Todo App that shows how to save your todos on your phone using SQLite. You can make a list of tasks, see them, and cross them off when you're done. Everything stays on your phone, so you can see your list anytime, even without the internet.

## Running the app

To run the Todo App, follow these steps:

1. Navigate to the project directory.
1. Run `npm install` to install the necessary dependencies.
1. Start the app with `npx expo start` or `npm start`

## Database Integration

Upon initial launch, the app checks for the existence of a todos table and creates it if necessary. Todos are then fetched from this table and rendered. Adding or deleting a todo updates both the app's state and the local SQLite database, ensuring consistency and persistence.

- "Open" the database by defining a const `db` and calling `SQLite.openDatabase('database_name.db')`
- Now you can access `db` and specifically the `db.transaction` to to execute SQL commands
- Create table in case it does not exist inside a `useEffect` hook
