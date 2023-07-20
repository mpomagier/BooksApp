/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const templateBook = document.getElementById('template-book');
  const booksList = document.querySelector('.books-list');
  const favoriteBooks = [];
  const filters = [];
  const form = document.querySelector('.filters');



  function generateHTML(template, book) {

    const templateContent = template.innerHTML;
    const compiledTemplate = Handlebars.compile(templateContent);

    return compiledTemplate(book);
  }


  function render() {

    let generatedHTML;

    for(let book of dataSource.books) {

      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      generatedHTML = generateHTML(templateBook, {
        name: book.name,
        price: book.price,
        image: book.image,
        id: book.id,
        rating: book.rating,
        ratingBgc,
        ratingWidth
      });

      const element = utils.createDOMFromHTML(generatedHTML);

      element.classList.add('book');

      booksList.appendChild(element);
    }
  }


  function init() {

    render();

    initActions();
  }

  init();


  function initActions() {

    booksList.addEventListener('dblclick', function(event) {

      if(event.target.offsetParent.classList.contains('book__image')) {

        const bookId = event.target.offsetParent.dataset.id;

        const alreadyFavorite = favoriteBooks.includes(bookId);

        if(alreadyFavorite) {

          event.target.offsetParent.classList.remove('favorite');

          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);

        } else {

          event.target.offsetParent.classList.add('favorite');

          favoriteBooks.push(bookId);
        }
      }
    });
  }



  form.addEventListener('click', function(event) {

    if(event.target.tagName === 'INPUT' &&
      event.target.type === 'checkbox' &&
      event.target.name === 'filter') {

      const value = event.target.value;

      if(event.target.checked) {
        filters.push(value);
      } else {
        const index = filters.indexOf(value);
        filters.splice(index, 1);
      }
    }
  });


  function filterBooks() {

    for(let book of dataSource.books) {

      let shouldBeHidden = false;

      for (const filter of filters) {

        if(!book.details[filter]) {

          shouldBeHidden = true;

          break;
        }
      }

      const bookId = book.id;

      const bookImage = document.querySelector(`.book__image[data-id="${bookId}"]`);

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }


  form.addEventListener('click', function(event) {

    if(event.target.tagName === 'INPUT' &&
       event.target.type === 'checkbox' &&
       event.target.name === 'filter') {

      filterBooks();
    }
  });


  function determineRatingBgc(rating) {

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