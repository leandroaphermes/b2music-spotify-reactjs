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

export function calcSizeBits(value) {
    let re = /([0-9]+)([a-z]{1,2})/.exec(value)
    let size = parseInt(re[1])
    let tag = re[2].toLowerCase()
    let result
    switch (tag) {
        case "gb":
            result = (1024 * 1024 * 1024) * size
            break;
        case "mb":
            result = (1024 * 1024) * size
            break;
        case "kb":
            result = 1024 * size
            break;
        case "b":
            result = size
            break;
    
        default:
            break;
    }
    return result
}