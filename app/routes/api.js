var User = require('../models/user');
var Blog = require('../models/blog');
var token = require('../common/token');
var authMiddleware = require('../middleware/authenticate');

module.exports = function(app, express, io) {
    var api = express.Router();

    // user creation
    api.post('/signup', function(req, res) {
        var user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        });

        var nToken = token.createToken(user);
        user.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    message: 'User has been created',
                    success: true,
                    token: nToken
                });
                return;
            };
        });
    });

    // login
    api.post('/login', function(req, resp) {
        User.findOne({
            username: req.body.username,
        }).select('name username password').exec(function(err, user) {
            if (err) {
                resp.send(err);
                return;
            } else if (!user) {
                resp.json({
                    message: 'No user found!'
                });
            } else {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    resp.json({
                        message: "Invalid password"
                    });
                } else {
                    var nToken = token.createToken(user);
                    resp.json({
                        success: true,
                        message: 'login successful',
                        token: nToken,
                    });

                };
            };
        });
    });

    authMiddleware(api); //using middleware

    // all users
    api.get('/all-users', function(req, resp) {
        User.find({}, function(err, users) {
            if (err) {
                resp.send(err);
            } else {
                resp.json(users);
            };
        });
    });

    api.route('/blogs')
        .post(function(req, resp) {
            var blog = Blog({
                author: req.decoded.id,
                title: req.body.title,
                content: req.body.content,
            });

            blog.save(function(err, newBlog) {
                if (err) {
                    resp.send(err);
                    return;
                } else {
                    io.emit('blog', newBlog);
                    resp.json({
                        message: "New entry created",
                        success: true,
                        data: {
                            _id: blog._id,
                            content: blog.content,
                            title: blog.title,
                            created: blog.created
                        }
                    });
                };
            })

        })
        .get(function(req, resp) {
            Blog.find({
                    author: req.decoded.id
                })
                .select('content created title')
                .exec(function(err, blogs) {
                    if (err) {
                        resp.send(err);
                        return;
                    } else {
                        resp.json({
                            blogs
                        });
                    }
                })
        });

    api.get('/me', function(req, resp) {
        resp.json(req.decoded);
    })


    return api;


}