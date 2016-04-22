var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : {type:String},
	username : {type:String, required:true, index: {unique:true}},
	password : {type:String, required:true, select: false},
});

UserSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('passoword')) return next();
	bcrypt.hash(user.password, null, null, function (err, hash) {
		if(err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);