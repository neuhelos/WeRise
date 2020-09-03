import axios from 'axios'
import { apiURL } from './apiURL'

export const sendEmail = (to, subject, message) => {
    axios.post(`${apiURL()}/email`, {
        to: to,
        from: 'WeRise@werise.org',
        subject: subject,
        content: message
    })
}