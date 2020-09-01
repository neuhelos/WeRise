import { DateTime } from 'luxon'

export const dateFormat = (dateInput) => {
    let date = `${DateTime.fromISO(dateInput).toFormat('EEE')}, 
        ${DateTime.fromISO(dateInput).toFormat('MMM')} 
        ${DateTime.fromISO(dateInput).toFormat('d')},  
        ${DateTime.fromISO(dateInput).toFormat('y')}`

    let time = `${DateTime.fromISO(dateInput).toFormat('T')} ${DateTime.fromISO(dateInput).toFormat('ZZZZ')}`

    return {date, time}
}
