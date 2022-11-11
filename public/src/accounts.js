function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

function getTotalNumberOfBorrows(account, books) {
  let result = [];
  for (let bookUsed in books) {
    const found = books[bookUsed].borrows.find(
    (borrows) => borrows.id === account.id
  );
  if (found) {
    result.push(found);
  }
  }
  return result.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let found = []
  let accountId = account.id

  for (let i = 0; i < books.length; i++) {
    let borrowHistory = books[i].borrows;
    let foundAccount = borrowHistory.find(eachBorrow => eachBorrow.id === accountId)
    if (foundAccount) {
      if (foundAccount.returned === false) {
        found.push(books[i])
      }
    }
  }
  return found.map((book) => {
    const author = authors.find(author => author.id === book['authorId'] )
    return {
      ...book,
      author: author
    }
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
