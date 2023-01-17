export default function authHeader() {
    const accessToken = sessionStorage.getItem('accessToken');
  
    if (accessToken) {
      return { Authorization: 'Bearer ' + accessToken };
    } else {
      return {};
    }
  }
  