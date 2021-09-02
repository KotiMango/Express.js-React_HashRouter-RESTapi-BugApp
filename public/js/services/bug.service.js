export const bugService = {
  query,
  getById,
  remove,
  add,
  update,
};

function query(filterBy = {}) {
  return axios.get('/api/bug').then((res) => res.data);
}
function getById(bugId) {
  return axios.get(`/api/bug/${bugId}`).then((res) => res.data);
}
function remove(bugId) {
  return axios.delete(`/api/bug/${bugId}`);
}
function add(bug) {
  return axios.post('/api/bug', bug).then((res) => res.data);
}
function update(bug) {
  return axios.put('/api/bug', bug).then((res) => res.data);
}
