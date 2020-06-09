const User = require('../../models/User.js');
const withAuth = require('../middleware');
const jwt = require('jsonwebtoken');
const secret = 'notProd';

module.exports = async function (server) {

    server.get('/', (req, res) => {
        res.send({ connection: true });
    });

    server.post('/api/register', function (req, res) {
        const { email, password } = req.body;
        const user = new User({ email, password });
        user.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send("Error registering new user please try again.");
            } else {
                res.status(200).send("Welcome to the club!");
            }
        });
    });

    server.post('/api/authenticate', function (req, res) {
        const { email, password } = req.body;
        User.findOne({ email }, function (err, user) {
            if (err) {
                console.error(err);
                res.status(500)
                    .json({
                        error: 'Internal error please try again'
                    });
            } else if (!user) {
                res.status(401)
                    .json({
                        error: 'Incorrect email or password'
                    });
            } else {
                user.isCorrectPassword(password, function (err, same) {
                    if (err) {
                        res.status(500)
                            .json({
                                error: 'Internal error please try again'
                            });
                    } else if (!same) {
                        res.status(401)
                            .json({
                                error: 'Incorrect email or password'
                            });
                    } else {
                        // Issue token
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '1h'
                        });
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                    }
                });
            }
        });
    });

    server.get('/checkToken', withAuth, function (req, res) {
        res.sendStatus(200);
    });
}