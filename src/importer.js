const importer = (username, perpage, page) => {
  let url =
    "https://api.discogs.com/users/" +
    username +
    "/collection/folders/0/releases" +
    "?per_page=" +
    perpage +
    "&page=" +
    page;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
export default importer;
