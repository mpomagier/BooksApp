/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  // Constants
  const templateBook = document.getElementById('template-book');
  const booksList = document.querySelector('.books-list');

  // Render function
  function render() {
    // Loop through books
    for(let book of dataSource.books) {
      const generatedHTML = generateHTML(templateBook, book);
      const element = utils.createDOMFromHTML(generatedHTML);
      // Add to list
      booksList.appendChild(element);
    }
  }

  // Helper function for generating HTML
  function generateHTML(template, book) {

    const templateContent = template.innerHTML;
    const compiledTemplate = Handlebars.compile(templateContent);

    return compiledTemplate(book);
  }

  // Init function
  function init() {

    // Render books
    render();

    // Initialize actions
    initActions();
  }

  init();


  // Empty favorite books array
  const favoriteBooks = [];

  // Initialize actions
  function initActions() {

    // Event listener
    booksList.addEventListener('dblclick', function(event) {

      // Check clicked element
      if(event.target.offsetParent.classList.contains('book__image')) {

        // Get book id
        const bookId = event.target.offsetParent.dataset.id;

        // Check if already favorite
        const alreadyFavorite = favoriteBooks.includes(bookId);

        if(alreadyFavorite) {

          // Remove favorite
          event.target.offsetParent.classList.remove('favorite');

          // Remove bookId from array
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);

          // Other remove logic
        } else {

          // Add favorite
          event.target.offsetParent.classList.add('favorite');

          // Add bookId to array
          favoriteBooks.push(bookId);
        }
      }
    });
  }
}