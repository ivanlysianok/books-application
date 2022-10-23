# Books search application using Google Books API

### Application overview

Application for finding books using Google books API https://developers.google.com/books

App is devided to 2 pages. First page is *books overview page*, where is list of books displayed based on given params. In addition to the search query, you can specify a category (genre) of books and sorting option (sorting by relevance or newest). 

Second page is *book detail page*, where you have more detailed information about specific book that you has choosed. For instance you can find out here who the publisher of the book is, how many pages the book has, book rating, book price etc...



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
