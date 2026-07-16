import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
export const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("1 verifyToken");
  const authHeaders = request.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return response.status(401).json({
      error: "Access denied. No token provided.",
      message: "Please provide a valid bearer token in the Authorisation  Header.",
    })
  }

  console.log("2 verifyToken");

  const token = authHeaders.split(" ")[1];
  try {
    const res = jwt.verify(token!, process.env.JWT_SECRET_KEY!) as JwtPayload;
    request.user = res;
    next();
  } catch (err) {
    console.error("Failed to verify the token.", err);
    if(err instanceof jwt.TokenExpiredError){
      return response.status(401).json({ error: "Access denied. Token expired.", 
        message: "Please login again to get a new token.",
      });
    }else if(err instanceof jwt.JsonWebTokenError){
      return response.status(401).json({ error: "Access denied. Invalid token.", 
        message: "Please provide a valid bearer token in the Authorisation  Header.",
    });
    }else{
      return response.status(401).json({ error: "Token verification failed.", 
        message: "Internal server error during token verification.",
      });

    }
  }
};

export const requireAdminRole = (
  request: Request,
  response: Response,
  next: NextFunction
)=>{
  if(!request.user){
    return response.status(500).json({ error: "Token Verification Failed.", 
      message: "Internal server error during token verification.",
  });
}
if(request.user.role != "ADMIN"){
  return response.status(401).json({ error: "Admin access required.", 
    message: "Please connect with your administrator to access this resource.",
});
}
next();
}