# Angular 16 - Application for searching books with Google OAuth authentication

## ![Alt text](/src/assets/preview.png?raw=true "Overview page")

### Video demo

Please first fully check out this video that demonstrates how application works - https://www.youtube.com/watch?v=g9IVD7MbI58&ab_channel=IvanLysianok

### Project overview

Angular 16 web app that is intended to search books via Google Books API and adding favorite ones to "Favorite" bookshelf. Application implements authentication flow (log-in, log out) via Google OAuth 2.0 (implicit flow).

**Important note:** The main purpose of making this application was to show how to implement Google authentication to the Angular web app. This application is **NOT PUBLISHED** so there are limited accounts with which you can log-in (actually there are my 2 personal google accounts). If you run application locally, you will be **NOT ABLE TO LOG-IN = NOT ABLE TO USE THE APPLICATION**. If you want to implement Google OAuth 2.0 in same way as in this application, have a look to this articles:

1. How to use Google Books API: https://developers.google.com/books/docs/v1/using
2. OAuth 2.0 authentication (for client side web apps): https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow

### Google APIs using in this project

- Get books: https://www.googleapis.com/books/v1/volumes
- Add / Remove books from favorite bookshelf: https://www.googleapis.com/books/v1/mylibrary/bookshelves/
- OAuth 2.0. authentication: https://www.googleapis.com/oauth2/v1/userinfo

### Features

- Authentication with Google OAuth 2.0 implicit flow
- Search book by name, author, genre...
- Add books to favorite shelf, Remove books from favorite shelf
- Responsive design
- "Load more" pagination
- Reusable elements: components, services, styles
- Error handling
