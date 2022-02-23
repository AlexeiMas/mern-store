module.exports = function (req, res, next) {
  //page=2;processor=amd-ryzen-5,amd-ryzen-7,amd-ryzen-9;producer=acer,apple,asus;seller=rozetka;sort=expensive/
  let url = req.params.url
  if (url) {
    let hash;
    const myJson = {};
    // if (url[url.length - 1] === '/') {
    //     url = url.slice(0, -1)
    // }
    // let hashes = url.slice(url.lastIndexOf('/') + 1).split(';');
    // let hashes = url.replace('/', '').split(';');
    let hashes = url.split(';');
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      if (hash[1].includes(',') || hash[0] === 'sort') {
        hash[1] = hash[1].split(',');
      }
      myJson[hash[0]] = hash[1];
    }
    req.queries = myJson
  }
  next()
}
