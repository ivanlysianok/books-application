# Books search application using Google Books API

### WARNING !!!

**At the moment, the application is massively refactored and new features are added, so there is a possibility that the application will not work properly now. Thanks and sorry for the inconvenience.**

### Application overview

Application for finding books using Google books API https://developers.google.com/books

App is devided to 2 pages. First page is _books overview page_, where is list of books displayed based on given search params. In addition to the search query, you can specify a category (genre) of books and sorting option (sorting by relevance or newest).

Second page is _book detail page_, where you have more detailed information about specific book that you has choosed. For instance you can find out here who the publisher of the book is, how many pages the book has, How much does the book cost and so on...

**Check out this video to see how application works:** https://www.youtube.com/watch?v=Z56ertXaNNo&ab_channel=IvanLysianok

## ![Alt text](/google-books-application/src/assets/preview.png?raw=true "Overview page")

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

- Angular 14.2.7
- Node.js 16.13.1
- Npm 8.2.0
- Bootstrap 5.1.3

### Features

- [x] Search is provided by Google Books API
- [x] Fully responsive design (320px +)
- [x] Pagination
- [x] Load indicator when calling requests
- [x] Error toasts when some api call return error (NGX Toastr)
