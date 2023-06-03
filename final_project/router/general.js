const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// public_users.post("/register", (req,res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  // if (!username || !password) {
  //   return res.status(400).json({ error: "Username and password are required" });
  // }

  //check if the username is valid or not
  if (!isValid(username)) {
    return res.status(401).json({ error: "Invalid usename" });
  }

  // Check if the username already exists
  if (users.includes(username)) {
    return res.status(409).json({ error: "Username already exists" });
  }

  // Add the new user to the list
  users.push({ username, password });

  // Return success response
  return res.status(200).json({ message: "User registered successfully" });
});


// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/', function (req, res) {
  // Convert the books object to an array of books
  const bookList = Object.values(books);

  // Return the book list as a JSON response
  return res.json(bookList);
});


// // Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
//  });

 public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;

  if (!books[isbn]) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Retrieve the book details based on the ISBN
  const book = books[isbn];

  // Return the book details as a JSON response
  return res.json(book);
});

  
// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/author/:author', function (req, res) {
  const { author } = req.params;

  // Obtain all the keys for the 'books' object
  const bookKeys = Object.keys(books);

  // Iterate through the 'books' array & check the author matches the one provided in the request parameters
  const matchingBooks = bookKeys.reduce((result, key) => {
    if (books[key].author === author) {
      result.push(books[key]);
    }
    return result;
  }, []);

  if (matchingBooks.length === 0) {
    return res.status(404).json({ error: "Books not found" });
  }

  // Return the matching books as a JSON response
  return res.json(matchingBooks);
});


// // Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

public_users.get('/title/:title', function (req, res) {
  const { title } = req.params;

  // Obtain all the keys for the 'books' object
  const bookKeys = Object.keys(books);

  // Iterate through the 'books' array & check the title contains the one provided in the request parameters
  const matchingBooks = bookKeys.reduce((result, key) => {
    if (books[key].title.toLowerCase().includes(title.toLowerCase())) {
      result.push(books[key]);
    }
    return result;
  }, []);

  if (matchingBooks.length === 0) {
    return res.status(404).json({ error: "Books not found" });
  }

  // Return the matching books as a JSON response
  return res.json(matchingBooks);
});


// //  Get book review
// public_users.get('/review/:isbn',function (req, res) {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });


public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;

  if (!books[isbn]) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Retrieve the book reviews based on the ISBN
  const reviews = books[isbn].reviews;

  // Return the book reviews as a JSON response
  return res.json(reviews);
});


module.exports.general = public_users;
