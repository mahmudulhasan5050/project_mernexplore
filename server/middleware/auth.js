import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;

        let decodedToken;
        if (token && isCustomAuth) {
            decodedToken = jwt.verify(token, 'test');
            req.userId = decodedToken.id;
        } else {
            decodedToken = jwt.decode(token);
            req.userId = decodedToken.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;