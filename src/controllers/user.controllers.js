import User from "../models/user.model.js";
import ApiError from "../utils/apiError.util.js";
import ApiResponse from "../utils/apiResponse.util.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, {}, "Unable to generate tokens");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new ApiError(400, "First name, last name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        // name: `${firstName} ${lastName}`.trim(),
        email,
        password
    });

    const {accessToken, refreshToken} = await generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    const safeUser = await User.findById(user._id).select("-password -refreshToken");
    if(!safeUser) throw new ApiError(500, "Something went wrong while registering the user");

    return res
        .status(201)
        .json(new ApiResponse(
            201,
            {
                user: safeUser,
                refreshToken
            }, 
            "User registered successfully"
        )
    );
});
