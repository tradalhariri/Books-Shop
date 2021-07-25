'use strict';
const minPages = 1;
const maxPages = 500;

const headTableForBook  = ['Book Name','Book Pages','Price'];

function Book(bookName,bookPrice){
    this.bookName = bookName;
    this.bookPrice = bookPrice;
    this.bookPages = randomBookPages();
}

function randomBookPages(){
   let min = Math.ceil(minPages);
   let max = Math.floor(maxPages);
   return Math.floor(Math.random() * (max - min + 1) + min); 
}

function Books(booksList){
   this.booksList = booksList;
}

Books.prototype.addBook = function(bookName,bookPrice){
    this.booksList.push(new Book(bookName,bookPrice));
    this.saveBooksTOLocaleStorage();
}

Books.prototype.saveBooksTOLocaleStorage = function(){
    localStorage.setItem('books',JSON.stringify(this.booksList));
}

let books;
function getBooksTOLocaleStorage(){
   let booksList =  JSON.parse(localStorage.getItem('books')) || [];
   books = new Books(booksList);
}

getBooksTOLocaleStorage();


let booksForm = document.getElementById('booksForm');
let booksTable = document.getElementById('booksTable');
let totalEl = document.getElementById('total');

booksForm.addEventListener('submit',addBookToTable);



function addBookToTable(e){
    booksTable.textContent = '';
    e.preventDefault();
    let bookName = e.target.bookName.value;
    let bookPrice = e.target.bookPrice.value;
    books.addBook(bookName,bookPrice);
    createTableHeader();
    createTableBody();
    booksForm.reset();
}



function createTableHeader(){
    let tHeadEl = document.createElement('thead');
    let trEl = document.createElement('tr');
    for (let i = 0; i < headTableForBook.length; i++) {
    let thEl = document.createElement('th');
    thEl.textContent = headTableForBook[i];
    trEl.appendChild(thEl);    
    }
    tHeadEl.appendChild(trEl);
    booksTable.appendChild(tHeadEl);
}



function createTableBody(){
    
    let tBodyEl = document.createElement('tbody'); 
    let total = 0;
    for (let i = 0; i < books.booksList.length; i++) {
         let trEl = document.createElement('tr');
         let tdEl1 = document.createElement('td');
         let tdEl2 = document.createElement('td');
         let tdEl3 = document.createElement('td');
         tdEl1.textContent = books.booksList[i].bookName;
         tdEl2.textContent = books.booksList[i].bookPages;
         tdEl3.textContent = books.booksList[i].bookPrice;
         trEl.appendChild(tdEl1);
         trEl.appendChild(tdEl2);
         trEl.appendChild(tdEl3);
         tBodyEl.appendChild(trEl);
         total+= Number(books.booksList[i].bookPrice);
    }
    booksTable.appendChild(tBodyEl);
    totalEl.textContent = `Total = ${total}`;
    
}

createTableHeader();
createTableBody();











