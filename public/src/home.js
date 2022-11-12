function getTotalBooksCount(books) {
  let num = 0;
  for (let i = 0; i < books.length; i++) {
    num++;
  }
  return num;
}

function getTotalAccountsCount(accounts) {
  let num = 0;
  for (let i = 0; i < accounts.length; i++) {
    num++;
  }
  return num;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return acc + book.borrows.filter(notReturned => notReturned.returned === false).length
  }, 0)
}

function sortAndSliceFirstFiveElements(temp) {
  temp.sort((a, b) => b.count - a.count);
  return temp.slice(0, 5);
}

function getMostCommonGenres(books) {
  let temp = []
  let found = books.map((book) => book.genre);
  found.map((genre) => {
    const genreLocation = temp.findIndex((element) => element.name === genre);
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
    } else {
      temp.push({name: genre, count: 1});
    }
  })
  return sortAndSliceFirstFiveElements(temp);
}

function getMostPopularBooks(books) {
  const borrows = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }))
  borrows.sort((a, b) => b.count - a.count)
  return borrows.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //create new array for final result
  let result = []
  // loop through authors
  authors.forEach((author) => {
  //filter authors by ones that match author.id
  let bookAuthor = books.filter((book) => book.authorId === author.id)
  //add how many times books were borrowed
  let bookAuthBorrows = bookAuthor.reduce((borrowTot, book) => borrowTot + book.borrows.length, 0)
  //push the final result into result array
  result.push({name: author.name.first + " " + author.name.last, count: bookAuthBorrows})
  })
  //sort results from most to least and slice down to a max of five results
  return result.sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1)).slice(0, 5)
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
