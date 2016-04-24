var User = require('../models/user');
var Blog = require('../models/blog');
var token = require('../common/token');
var authMiddleware = require('../middleware/authenticate');

module.exports = function (app, express) {
    var api = express.Router();

    // user creation
    api.post('/signup', function (req, res) {
     	var user = new User({
     	 	name: req.body.name,
     	 	username: req.body.username,
     	 	password: req.body.password,
     	});
        user.save(function (err) {
         	if(err){
         	 	res.send(err);
         	}else{
         	 	return;
         	}
         	res.json({ message: 'User has been created!' });
        });
     	 
     });
     
    // login
    api.post('/login', function (req, resp) {
    	 User.findOne({
    	 	username: req.body.username,
    	 }).select('password').exec(function (err, user) {
    	 	 if(err){
    	 	 	resp.send(err);
    	 	 	return;
    	 	 }else if (!user) {
    	 	 	resp.json({ message: 'No user found!' });
    	 	 }else{
    	 	 	var validPassword = user.comparePassword(req.body.password);
    	 	 	if(!validPassword){
    	 	 		resp.json({ message: "Invalid password" });
    	 	 	}else{
    	 	 		var new_token = token.createToken(user);
    	 	 		resp.json({
    	 	 			success: true,
    	 	 			message: 'login successful',
    	 	 			token: new_token,
    	 	 		});

    	 	 	};
    	 	 };
    	 });
    });

    authMiddleware(api);  //using middleware
    
    // all users
    api.get('/all-users', function (req, resp) {
     User.find({}, function (err, users) {
        if(err){
            resp.send(err);
        }else{
            resp.json(users);
        };
    });
    });

    api.route('/')
       .post(function (req, resp){
           var blog = Blog({
            author: req.decoded.id,
            title: req.body.title,
            content: req.body.content,
           });

           blog.save(function (err) {
                if(err){
                    resp.send(err);
                    return;
                }else{
                    resp.json({message: "New entry created", success: true});
                };
           })
           
        })
       .get(function (req, resp) {
            Blog.find({author: req.decoded.id}, function (err, blogs) {
                if(err){
                    resp.send(err);
                    return;
                }else{
                    console.log('came here')
                    resp.json(blogs);
                }
            })
       });

    api.get('/me', function (req, resp) {
         resp.json(req.decoded);
    })

    
    return api;


}