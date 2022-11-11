function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let found = [];
  let notReturnedBooks = books.filter((book) => book.borrows[0].returned === false);
  let returnedBooks = books.filter((book) => book.borrows[0].returned === true);
  found.push(notReturnedBooks,returnedBooks)
  return found;
}

function getBorrowersForBook(book, accounts) {
  let foundAccounts = accounts.filter((account) => {
    return book.borrows.find((borrow) => borrow.id === account.id);
  });

  foundAccounts = foundAccounts.map((foundAccount) => {
    let matchedId = book.borrows.find((borrow) => borrow.id === foundAccount.id)
    return {
      ...foundAccount,
      ...matchedId
    }
  })
  foundAccounts.splice(10);
  return foundAccounts;
}

//   const result = book.borrows.map((borrow) => {
//     const accountInfo = accounts.find(account => account.id === borrow.id)
//     const newTransaction = {
//       ...borrow,
//       ...accountInfo,
//     }
//   })
//   return {
//     ...accountInfo,
//     ...newTransaction
//   };

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
