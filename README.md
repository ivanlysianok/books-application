# Books search application using Google Books API

### Application overview

Application for finding books using Google books API https://developers.google.com/books

App is devided to 2 pages. First page is *books overview page*, where is list of books displayed based on given search params. In addition to the search query, you can specify a category (genre) of books and sorting option (sorting by relevance or newest). 

Second page is *book detail page*, where you have more detailed information about specific book that you has choosed. For instance you can find out here who the publisher of the book is, how many pages the book has, How much does the book cost and so on...



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

- Angular 14.2.7
- Node.js 16.13.1
- Npm 8.2.0
- Bootstrap 5.1.3

### Features

- [X] Search is provided by search query, selected category (art, biography, computers...) and relevance/newest option
- [X] Fully responsive design (320px +)
- [X] Pagination
- [X] Load indicator when calling requests
- [X] Error toasts when some api call return error (NGX Toastr)
