import EncryptedStorage from 'react-native-encrypted-storage';

const API_uri = 'https://earmoney.newindiagyan.online/api/';
function CallApi(endpoint, method = 'GET', body = null, token = null) {
  const toUrlEncoded = obj =>
    Object.keys(obj)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
      .join('&');
  body = body ? toUrlEncoded(body) : null;

  return new Promise(resolve => {
    let headres = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Request-Headers': 'Authorization',
      Authorization: 'Bearer ' + (token ? token : ''),
    };
    fetch(API_uri + endpoint, {
      method: method,
      headers: headres,
      body: body,
    })
      .then(r => r.json())
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        // console.log(e);
        resolve({
          status: 500,
          message: e.message,
        });
      });
  });
}

async function setToken(token) {
  console.log('saving token :', token);
  return EncryptedStorage.setItem('token', token)
    .then(() => 'success')
    .catch(e => 'error');
}
async function getToken() {
  const token = await EncryptedStorage.getItem('token');
  console.log('retreiving token :', token);
  return token;
}
export default CallApi;
export {setToken, getToken};