const fetch = (url,requestOptions,callback,errorcallback) =>{
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => callback(result))
    .catch(error => errorcallback(error));
}