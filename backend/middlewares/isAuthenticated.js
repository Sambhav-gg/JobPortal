import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: "Please login first",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.user = { _id: decode.userId };
        next();
    }
    catch(error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};
export default isAuthenticated;
