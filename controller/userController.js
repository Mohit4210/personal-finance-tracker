import { Authentication } from "../model/user_module.js"; 
import dotenv from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/transaction.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
export const Registration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await Authentication.create({ username, email, password: hashed });
    res.json({ message: "Registered" });
  } catch {
    res.status(400).json({ error: "User exists or invalid input" });
  }
};

// LOGIN
export const Login = async (req, res) => {
 const { email, password } = req.body;
  const user = await Authentication.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, { httpOnly: true, maxAge: 86400000, sameSite: "Lax", secure: false});

  res.json({ success: true, message: "Logged in", token, user: { id: user._id, email: user.email } });
};

// LOGOUT
export const Logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false, // match with login
  });
  res.json({ success: true, message: "Logged out successfully" });
};


export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    await userData.save();
    res.status(200).json({ msg: "Data Added Successfully", data: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

export const getAll = async(req,res) =>{
    try {

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }
          res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error:error});

    }
}


export const getOne = async(req,res) =>{
    try {
       
        const id = req.params.id;
         const userExist =await User.findById(id);
         if(!userExist){
            return res.status(404).json({msg: "user not found"});
         }
         res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({error:error});

    }
}

export const update = async(req, res) =>{
    try {
       
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updateData = await User.findByIdAndUpdate(id, req.body,{new:true});
        res.status(200).json({msg:"update successfully", data:updateData});

    }catch (error){
        res.status(500).json({error: error});
    }
}


export const deletUser = async(req,res) => {
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not exist"});
              
        }
    await User.findByIdAndDelete(id);
    res.status(200).json({msg: "user deleted successfully"});

    }catch (error){
        res.status(500).json({error: error});

    }
}
