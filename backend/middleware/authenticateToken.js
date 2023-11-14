const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'HelloReact', (err, data) => {

        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.data = data;
        next();
    })

}

module.exports = authToken;