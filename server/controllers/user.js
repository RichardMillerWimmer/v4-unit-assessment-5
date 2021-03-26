const bcrypt = require('bcryptjs');

module.exports = {

    register: async (req, res, next) => {
        // bring in
        const db = req.app.get('db');
        const { username, password } = req.body;

        // username check
        const user = await db.user.create_user(username);
        if (user[0]) {
            return res.status(400).send('username already registered')
        }

        // user setup
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const defaultPic = `https://robohash.org/${username}.png`;

        const newUser = await db.user.create_user(username, hash, defaultPic);

        // session
        req.session.user = newUser[0];

        //response
        res.status(200).send(req.session.user);

    },

    login: async (req, res, next) => {
        // bring in 
        const db = req.app.get('db');
        const { username, password } = req.body;

        //check is username exists
        const existingUser = await db.user.find_user_by_username(username);
        const user = existingUser[0]
        if (!user) {
            return res.status(400).send('username does not exist, please register a new usernam')
        }

        // user exists, password check
        const isAuthenticaed = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticaed) {
            return res.status(400).send('incorrect password');
        }

        return res.status(200).send(req.session.user);

    },

    logout: async (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: async (eq, res, next) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }

}