/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  class BooksList {

    constructor() {
      this.books = [];
      this.filters = [];
      this.favoriteBooks = [];
      this.bookImages = {};
    }

    initData() {
      this.books = dataSource.books;
      const images = document.querySelectorAll('.book__image');

      images.forEach(image => {
        this.bookImages[image.dataset.id] = image;
      });
    }

    getElements() {
      this.templateBook = document.getElementById('template-book');
      this.booksList = document.querySelector('.books-list');
      this.form = document.querySelector('.filters');
      this.generateBookHTML = Handlebars.compile(this.templateBook.innerHTML);
    }


    initActions() {

      this.booksList.addEventListener('dblclick', e => {
        if(e.target.offsetParent.classList.contains('book__image')) {
          const bookId = e.target.offsetParent.dataset.id;
          const alreadyFavorite = this.favoriteBooks.includes(bookId);

          if(alreadyFavorite) {
            e.target.offsetParent.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          } else {
            e.target.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          }
        }
      });

      this.form.addEventListener('click', e => {
        if(e.target.tagName === 'INPUT' &&
          e.target.type === 'checkbox' &&
          e.target.name === 'filter') {
          const value = e.target.value;
          if(e.target.checked) {
            this.filters.push(value);
          } else {
            this.filters.splice(this.filters.indexOf(value), 1);
          }
        }
      });

      this.form.addEventListener('click', e => {
        if(e.target.tagName === 'INPUT' &&
          e.target.type === 'checkbox' &&
          e.target.name === 'filter') {
          this.filterBooks();
        }
      });
    }

    render() {
      this.booksList.innerHTML = '';

      for (let book of this.books) {
        const bookId = book.id;
        const bookImage = this.bookImages[bookId];

        if (bookImage && !this.favoriteBooks.includes(bookId) && !bookImage.classList.contains('hidden')) {
          const ratingBgc = this.determineRatingBgc(book.rating);
          const ratingWidth = book.rating * 10;

          const html = this.generateBookHTML({
            name: book.name,
            id: book.id,
            image: book.image,
            price: book.price,
            rating: book.rating,
            ratingBgc: ratingBgc,
            ratingWidth: ratingWidth
          });

          const element = utils.createDOMFromHTML(html);
          element.classList.add('book');
          this.booksList.appendChild(element);
        }
      }
    }

    filterBooks() {
      const selectedFilters = Array.from(this.form.querySelectorAll('input[name="filter"]:checked'))
        .map(checkbox => checkbox.value);

      for (let book of this.books) {
        const bookId = book.id;
        const bookImage = this.bookImages[bookId];

        if (bookImage) {
          const shouldBeHidden = selectedFilters.length > 0 && selectedFilters.includes(book.category);
          if (shouldBeHidden) {
            bookImage.classList.add('hidden');
          } else {
            bookImage.classList.remove('hidden');
          }
        }
      }
      this.render();
    }

    generateHTML(data) {

      const html = this.generateHTML({
        name: data.name,
        id: data.id,
        image: data.image,
        price: data.price,
        rating: data.rating,
        ratingBgc: data.ratingBgc,
        ratingWidth: data.ratingWidth
      });

      return html;

    }
    determineRatingBgc(rating) {

      let ratingBgc;

      if(rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      else if(rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      else if(rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      else if(rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return ratingBgc;
    }
  }

  const app = new BooksList();

  app.initData();
  app.getElements();
  app.initActions();
  app.render();
  app.filterBooks();

}