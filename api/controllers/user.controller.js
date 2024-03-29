import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({
        message: 'Api route is worlking mawa !!!',
    });
};

export const updateUser = async(req, res, next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update you account!'))

    try{
         if (req.body. password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        //const userUpdates = {"userUpdate":"user upadated successfully"};
        res.status(200).json(rest);
    }catch(error){
        next(error)
    };
}; 
export const deleteUser = async(req, res, next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'Hello wrold'));
    const userId=(req.params.id);
    try{
        await User.findByIdAndDelete(userId);
        res.clearCookie('access_token');
        res.status(200).json('User deleted successfully');
        
    }catch{
        next(error);
    }
}