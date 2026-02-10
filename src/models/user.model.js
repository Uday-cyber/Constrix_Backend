import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    // name: {
    //   type: String,
    //   required: true
    // },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },
    refreshToken: { 
        type: String 
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

   this.password = await bcrypt.hash(this.password, 10);
  //  next(); 
});
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        },
        process.env.SECRET_ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.SECRET_REFRESH_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export default mongoose.model("User", userSchema);
