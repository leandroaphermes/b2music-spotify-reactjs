export function getSessionToken(){
    return localStorage.getItem('session_token')
}
export function setSessionToken(token){
    localStorage.setItem('session_token', token)
}
export function deleteSessionToken(){
    localStorage.removeItem('session_token')
}
