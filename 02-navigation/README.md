# Books List App in React Native 📚

This directory contains the Books List feature of the Books App, built with React Native and utilizing Expo's file-based routing system. 

The app allows users to browse through various categories of books and view details about each book.

## Directory Structure

- **app**: Contains the "pages"
  - **_layout.tsx**: Defines the layout and navigation structure for the app, including header styles and screen options
  - **index.tsx**: The main entry point for the app (home page)
  - **books-list.tsx**: Displays a list of books filtered by the selected category. It retrieves the category ID from the URL parameters and fetches the relevant books.
- **components**: Contains reusable components.
  - **CategoryTile.tsx**: A component for rendering category tiles, allowing users to select a category.
  - **BookItem.tsx**: A component for rendering individual book items, displaying book details such as name, author, and image.
- **data**: Contains the data files for categories and books.
- **types**: Contains TypeScript interfaces for type safety, defining the structure of categories and books.

## Navigation

The app uses Expo Router to manage navigation between screens. The routing is based on the file structure within the `app` directory:

- **Index Screen**: Defined in `index.tsx`, it displays a grid of categories. When a user selects a category, they are navigated to the Books List Screen.
- **Books List Screen**: Defined in `books-list.tsx`, it displays a list of books for the selected category, allowing users to view details about each book.

## Running the Books List App

To run the Books List app, follow these steps:

1. Navigate to the `books-list` directory.
2. Run `npm install` to install the necessary dependencies.
3. Start the app with `npx expo start` or `npm start`.

## Technologies Used

- **Expo Router**: For managing navigation between screens using a directory-based approach.
- **Expo**: For building and running the React Native application.
- **React Native**: For building the mobile application with a native-like experience.

This setup allows for a clean and intuitive navigation system, leveraging the power of Expo's file-based routing to simplify the development process.