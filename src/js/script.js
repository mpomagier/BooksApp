/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  class BooksList {
    constructor() {
      this.books = dataSource.books;
      this.filters = [];
      this.favoriteBooks = [];
      this.bookTemplate = document.getElementById('template-book');
      this.booksListEl = document.querySelector('.books-list');
      this.form = document.querySelector('.filters');
      this.template = Handlebars.compile(this.bookTemplate.innerHTML);

      this.initActions();
      this.filterBox();
      this.render();
    }

    render() {
      this.booksListEl.innerHTML = '';

      for (let book of this.books) {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        const html = this.generateHTML(this.template, {
          name: book.name,
          id: book.id,
          image: book.image,
          price: book.price,
          rating: book.rating,
          ratingWidth: ratingWidth,
          ratingBgc: ratingBgc
        });

        this.booksListEl.insertAdjacentHTML('beforeend', html);
      }
    }

    generateHTML(template, book) {
      return template(book);
    }

    initActions() {
      this.booksListEl.addEventListener('dblclick', (e) => {
        if (e.target.offsetParent.classList.contains('book__image')) {
          const bookId = e.target.offsetParent.dataset.id;
          const alreadyFavorite = this.favoriteBooks.includes(bookId);

          if (alreadyFavorite) {
            e.target.offsetParent.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          } else {
            e.target.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          }
        }
      });
    }

    filterBooks() {
      const filters = this.filters;

      for (let book of this.books) {
        let shouldBeHidden = false;

        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        const bookEl = document.querySelector(`.book__image[data-id="${book.id}"]`);

        if (shouldBeHidden) {
          bookEl.classList.add('hidden');
        } else {
          bookEl.classList.remove('hidden');
        }
      }
    }

    filterBox() {
      const filterEls = document.querySelectorAll('.filters input');

      filterEls.forEach((filterEl) => {
        filterEl.addEventListener('click', () => {
          if (filterEl.checked) {
            this.filters.push(filterEl.value);
          } else {
            this.filters.splice(this.filters.indexOf(filterEl.value), 1);
          }

          this.filterBooks();
        });
      });
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }
  }

  new BooksList();
}