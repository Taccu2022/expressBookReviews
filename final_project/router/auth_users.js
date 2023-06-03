const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const regex = /^[A-Za-z0-9_]{6,20}$/;
return regex.test(username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let matchedUser = users.find(
  (user) => user.username === username && user.password === password
);

// Return true if the username and password match, otherwise return false
return matchedUser !== undefined;
}

// //only registered users can login
// regd_users.post("/login", (req,res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

regd_users.get("/login", (req,res) => {
  const { username, password } = req.body;

  // Check if the username and password are provided
  // if (!username || !password) {
  //   return res.status(400).json({ error: "Username and password are required" });
  // }

  //check if the username is valid or not
  if (!isValid(username)) {
    return res.status(401).json({ error: "Invalid usename" });
  }

  // Check if the username and password match the ones in records
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate a JWT token for the logged-in user
  const token = jwt.sign({ username }, "secret_key");

  // Save the token in the session
  req.session.token = token;

  // Return success response with the token
  return res.status(200).json({ message: "Login successful", token });
});


// // Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

regd_users.put("/auth/review/:isbn", function (req, res) {
  const { isbn } = req.params;
  const { review } = req.query;
  const username = req.session.username;

  // Check if the username is stored in the session
  if (!username) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Find the book with the provided ISBN
  const book = books[isbn];

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Check if the user has already reviewed the book
  if (book.reviews[username]) {
    // Modify the existing review
    book.reviews[username] = review;
    return res.status(200).json({ message: "Review modified successfully" });
  }
  
  // Add a new review
  book.reviews[username] = review;
  return res.status(200).json({ message: "Review added successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;


/*regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.session.username;

  // Check if the username is stored in the session
  if (!username) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Find the book with the provided ISBN
  const book = books[isbn];

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Check if the user has reviewed the book
  if (!book.reviews[username]) {
    return res.status(404).json({ error: "Review not found" });
  }

  // Delete the user's review
  delete book.reviews[username];

  return res.status(200).json({ message: "Review deleted successfully" });
});*/



