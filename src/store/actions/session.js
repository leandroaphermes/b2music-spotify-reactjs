/** Set session from user */
export function set(sessionDate){
    return {
        type: 'SET_SESSION',
        sessionDate
    }
}
