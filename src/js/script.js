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

    // Call render function
    render();
  }

  // Call init
  init();

  // 1. Empty array
  const favoriteBooks = [];

  // 2. Function initActions
  function initActions() {

    // 3. Reference to books images
    const images = document.querySelectorAll('.book__image');

    // 4. Loop through images
    for(let image of images) {

      // 5. Add event listener
      image.addEventListener('dblclick', function(event) {

        // 6. Prevent default
        event.preventDefault();

        // 7. Check if image has class favorite
        this.classList.add('favorite');

        // 8. Get id from data-id attribute
        const bookId = this.dataset.id;

        // 9. Check if book is not in favoriteBooks array
        favoriteBooks.push(bookId);
      });
    }
  }

  // 10. Call initActions function
  initActions();

}