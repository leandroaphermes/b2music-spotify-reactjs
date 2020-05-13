export const ALFA = /[a-z]/
export const ALFA_CS = /[a-z]/i

export const NUMBER = /[0-9]/

export const ALFA_NUMBER = /[a-z0-9]/
export const ALFA_NUMBER_CS = /[a-z0-9]/i

export const ALFA_NUMBER_SPACE = /^[0-9a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/
export const ALFA_NUMBER_SPACE_CS = /^[0-9a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+$/i

export const ESPECIAL_CHARACTER_ACCEPT = /[!@#$%&\-_.]/


/* regex specific */
export const PASSWORD_VALIDATION = /^(?=.*[!@#$%&\-_.])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&\-_.]+$/
export const EMAIL_VALIDATION = /^((?!.*__+)(?!.*\.\.+)[a-zA-Z]{1}[a-zA-Z0-9._]{2,})@[a-zA-Z0-9._]{2,}\.[a-zA-Z]{2,}$/
export const USERNAME_VALIDATION = /^[a-z]{1}[a-z0-9]+$/

/* Dates */
export const DATE_VALIDATION = /^(\d{4})-(\d{2})-(\d{2})$/

export const PHONE_VALIDATION = {
    br: /^\([1-9]{2}\) \d{5}-\d{4}$/
}

/* Masks */
export const MASK_PHONE = {
    br: /^([1-9]{2})(\d{5})(\d{4})/
}