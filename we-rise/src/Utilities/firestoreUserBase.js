//User Functions
import { firestore } from './firebase'

export const userExistsCheck = async (user) => {
        const usersSnapshot = await firestore
            .collection('users')
            .get()
        const exists = usersSnapshot.docs.map( doc => doc.data().email).includes(user);
        return exists
    }

export const fetchUserData = async (user) => {
        let userQuery = await firestore
            .collection('users')
            .where('email', '==', user)
            .get()
        let userData = userQuery.docs[0].data()
        return userData
    }