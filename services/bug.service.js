const fs = require('fs');

const gBugs = require('../data/bug.json');
function query() {
  return Promise.resolve(gBugs);
}

function getById(bugId) {
  const bug = gBugs.find((bug) => bug._id === bugId);
  return Promise.resolve(bug);
}

function remove(bugId, user) {
  const idx = gBugs.findIndex((bug) => bug._id === bugId);
  if (idx === -1) return Promise.reject('No Such bug');
  const bug = gBugs[idx];
  if (!user.isAdmin && bug.creator._id !== user._id)
    return Promise.reject('Not your bug');
  gBugs.splice(idx, 1);
  return _saveBugsToFile();
}

function save(bug, user) {
  const idx = gBugs.findIndex((currBug) => currBug._id === bug._id);
  if (!user.isAdmin && bug.creator._id !== user._id)
    return Promise.reject('Not your bug');
  if (idx !== -1) {
    gBugs[idx] = bug;
  } else {
    gBugs.push(bug);
  }
  return _saveBugsToFile().then(() => {
    return bug;
  });
}

module.exports = {
  query,
  getById,
  remove,
  save,
};

function _makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return txt;
}

function _saveBugsToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      'data/bug.json',
      JSON.stringify(gBugs, null, 2),
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}
