import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const register = async(req, res) => {
    try {
        let {fullname, email, phoneNumber, password, role} = req.body;

        email = email.toLowerCase();
        if(!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);

        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        // Create a filtered user object for response
        const userResponse = {
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            role: newUser.role,
            profile: newUser.profile
        };

        return res.status(201).json({
            message: "User created successfully",
            user: userResponse,
            success: true,
        });
    } catch(error) {
        console.log("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}




export const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        email = email.toLowerCase();

        let user = await User.findOne({ email }).maxTimeMS(20000); // Increase query timeout
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // In your login controller
        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                domain: '.onrender.com'
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                success: true,
                user: userResponse
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.name === 'MongooseError' ? 
                     "Database connection error. Please try again." : 
                     "Internal Server Error"
        });
    }
};

    


   
export const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", {
                httpOnly: true,
                expires: new Date(0),
                sameSite: "strict"
            })
            .json({
                message: "Logged out Successfully",
                success: true,
            });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
      
    
export const updateProfile = async (req, res) => {
    try {
         // Make sure your auth middleware sets this
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file =req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:"Somthing went wronggg",
                success:false,
            
            })
        };

        //cloudinary
        let fileUri;

    if (req.file) {
      fileUri = getDataUri(req.file);  // safe here, file is defined
    } else {
      fileUri = null;  // or handle the case when no file is uploaded
    }
        // const cloudResponse = await cloudinary.upload(fileUri.content);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        let cloudResponse = null;
    if (fileUri) {
  cloudResponse = await cloudinary.uploader.upload(fileUri.content);
}

        
        // Parse skills if it's a JSON string
        
        let skillsArray = [];
if (skills) {
    skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
}

        const userId=req.id; ///middleware 
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }

        //updating data
        if(fullname) user.fullname=fullname
        if(email) user.email= email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio=bio
        if(skills) user.profile.skills=skillsArray
        
        

        //resume 
        // if(cloudResponse){
        //     user.profile.resume= cloudinary.secure_url //save the cloudinary url 
        //     user.profile.resumeOriginalName= file.originalname //save the original file name 
        // }
        if(cloudResponse){
  user.profile.resume = cloudResponse.secure_url; // **IMPORTANT**: Use `cloudResponse.secure_url`, not `cloudinary.secure_url`
  user.profile.resumeOriginalName = file.originalname; // file should be `req.file`
}

        
        
        

        await user.save();
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
        
    }
    catch(error){
        console.log(error);
    }
}
        
export const updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.user._id; 


        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file provided" });
        }

        const fileUri = getDataUri(file);

        // ✅ Upload using the .content property
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);

        if (!cloudResponse) {
            return res.status(500).json({ success: false, message: "Photo upload failed" });
        }

        // ✅ Save to user
        const user = await User.findByIdAndUpdate(userId, {
            "profile.profilePhoto": cloudResponse.secure_url
        }, { new: true });

        const userResponse = {
            _id: user._id,
            profilePhoto: user.profile.profilePhoto
        };

        res.status(200).json({
            success: true,
            message: "Profile photo updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
