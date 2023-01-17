const getAccessToken = () => sessionStorage.getItem('accessToken')

const setAccessToken = val =>{
    sessionStorage.setItem('accessToken',val)
}

const logout = () => {
    sessionStorage.removeItem("accessToken");
  };
  

export {getAccessToken,setAccessToken, logout};
