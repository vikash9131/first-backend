import mongoose, {Schema} from "mongoose";
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String,
            require:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String
        },
         WatchHistory:{
            type:Schema.Types.ObjectId,
            ref:"Video"
         },
         password:{
            type:String,
            required:[true,"Password is required"]
         },
         refreshToken:{
            type:String
         },

    },{timeseries:true}
)

    UserSchema.pre("save", async function (next){
        if(!this.isModified("password")) return next();
        this.password = bcrypt.hash(this.password,10)
        next()
    })

    UserSchema.methods.isPasswordCorrect = async function
    (password){
        return await bcrypt.compare(password, this.password)
    }

    UserSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
           },
           process.env.ACCESS_TOKEN_SECRET,
           {
            expiresIN: process.env.ACCESS_TOKEN_EXPIRY
           }
        )
    }
    UserSchema.methods.generateRefreshToken = function(){
                return jwt.sign(
            {
                _id: this._id,
           },
           process.env.REFRESH_TOKE_SECRET,
           {
            expiresIN: process.env.REFRESH_TOKE_EXPIRY
           }
        )
    }
export const User = mongoose.model("User",userSchema)