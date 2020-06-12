/**
 * Send new Message alert UI
 * @param {object} data Data to alert
 * 
 */
export function set(data){
    return {
        type: 'SET_ALERT',
        data
    }
}