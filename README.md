# Angular search books app using Google Books API

### Overview

This application allows you search and browse through books based on given search params. Also you have possibility to view detailed information
about book. Front-end has been written in Angular, data and all search operations provided Google Books API.
See live demo: https://lysianok-search-books-app.netlify.app/books-overview

## ![Alt text](/google-books-application/src/assets/application_preview_photo_01.png?raw=true "Overview page")

## ![Alt text](/google-books-application/src/assets/application_preview_photo_02.png?raw=true "Detailed page")

### Setup

```
1. Clone repository
$ git clone https://github.com/ivanlysianok/books-application.git

2. Go into application folder
$ cd google-books-application

3. Instal npm packages
$ npm install

4. Run app on localhost
$ ng serve
```

### Technologies

- Node.js 16.13.1
- Npm 8.2.0
- Angular 13.0.4
- Bootstrap 5.1.3

### Features

- Search is provided by search term, selected category (art, biography, computers...) and relevance/newest option
- Books are displayed in grid
- Simple pagination with "Previous page" and "Next page" buttons
- Load indicator when calling requests
- Error toast when some api call return error
- Mobile first approach, responsive desing
