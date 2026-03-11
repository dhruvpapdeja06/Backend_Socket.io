import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: [true,"Username already exists"],
        required: [true,"Username is required"],
        trim: true,
        minlength: 4
    },
    email:{
        type : String,
        unique: [true, "Email already exists"],
        required: [true,"Email is required"],
        lowercase : true,
        trim: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        trim: true,
        minlength: 4
    },
    verified:{
        type: Boolean,
        default: false
    },
},  
    {timestamps : true}

)

// check before save the password isModified 
userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

const userModel = mongoose.model('User',userSchema);

export default userModel;

/*
NodeMailer --> user Register on application then one email is send to verify or onboard email.

1. It's use google gmail api and sent then email on any exists email.
2. In production we can use the company email for doing this thing. Don't use the private email Address for testing.
3. Give to power to express server to communicate with the mail server and on behalf sent the mail.
4. No -one can use it , So to contact with smtp we need this step and with the help of transporter to communicate 



*/