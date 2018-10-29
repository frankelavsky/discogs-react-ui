const importer = (username, perpage, page) => {
  const Http = new XMLHttpRequest();
  const url =
    "https://api.discogs.com/users/" +
    username +
    "/collection/folders/0/releases" +
    "?per_page=" +
    perpage +
    "&page=" +
    page;
  Http.open("GET", url);
  return Http;
};
export default importer;
