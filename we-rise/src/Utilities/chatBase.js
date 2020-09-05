//Chat Functions
import firebase, { firestore } from './firebase'
import { v4 as uuidv4 } from 'uuid'


export const chatExistsCheck = async (chatUserEmails) => {
    const query = await firestore
        .collection('chats')
        .where('usersEmail', 'in', [chatUserEmails])
        .get()
    const chatId = query.docs.map(doc => doc.id).join("")
    return chatId
}

export const submitMessageExistingChat = (chatId, currentUserFirstName, currentUserId, message) => {
    firestore
    .collection('chats')
    .doc(chatId)
    .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
            firstName: currentUserFirstName,
            message: message,
            sender: currentUserId,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }),
        receiverHasRead: false
    });
}

export const newChatSubmit = async (message, currentUserId, currentUserFirstName, chatUserData, chatUsersEmail) => {
    let chatId = uuidv4()

    await firestore
        .collection('chats')
        .doc(chatId)
        .set({
            messages: [{
                message: message,
                sender: currentUserId,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                firstName: currentUserFirstName
            }],
            receiverHasRead: false,
            users: chatUserData, 
            usersEmail: chatUsersEmail
        })
}

