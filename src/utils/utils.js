export function getUser(){
    const user = localStorage.getItem('session_user')
    return user ? JSON.parse(user) : null
}
export function setUser(user = {}){
    localStorage.setItem('session_user', JSON.stringify(user))
}
export function deleteUser(){
    localStorage.removeItem('session_user')
}