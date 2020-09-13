const admin = require('../firebaseBackend')

const checkFirebaseToken = async (req, res, next) => {
    try {
        
        const token = req.headers.authtoken;
        const decodeToken = await admin.auth().verifyIdToken(token);
        const uid = decodeToken.uid;
        req.user = {email: decodeToken.email};
        next();
    }
    catch(err){
        console.log("code broke",err);
        res.status(401).json({message: "No Auth User"});
    }
}

module.exports = {
    checkFirebaseToken
}