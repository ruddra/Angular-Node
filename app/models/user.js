var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name = String,
	username = {type:String, required:true, index: {unique:true}},
	password = {type:String, required:true, select: false},
});

UserSchema.pre('save', function (next) {
	if (this.isModified('passoword')) return next();
	bcrypt.hash(this.password, null, null, function (err, hash) {
		if(err) return next(err);
		this.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function (password) {

return bcrypt.compareSync(this.password, password);

}

module.exports = mongoose.model('User', UserSchema);