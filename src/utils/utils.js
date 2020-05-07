export function getSessionToken(){
    return localStorage.getItem('session_token')
}
export function setSessionToken(token){
    localStorage.setItem('session_token', token)
}
export function deleteSessionToken(){
    localStorage.removeItem('session_token')
}
export function getSessionUser(){
    let user = localStorage.getItem('session_user')
    return user ? JSON.parse(user) : {}
}
export function setSessionUser(user){
    localStorage.setItem('session_user', JSON.stringify(user))
}
export function deleteSessionUser(){
    localStorage.removeItem('session_user')
}
