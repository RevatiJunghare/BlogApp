export const REACT_APP_API_URL="http://localhost:4500"
export const getAuthToken = ()=>{
    const authToken = localStorage.getItem("token") 
    return authToken;
}