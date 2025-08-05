"use server"

import Razorpay from "razorpay"
import Payment from "../models/Payment"
import connectDB from "@/db/connectDB"
import User from "../models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    let user = await User.findOne({name: to_username});
    const secret = user?.razor_secret;

    console.log(process.env.RAZORPAY_KEY, process.env.RAZORPAY_SECRET);
    var instance = new Razorpay({ key_id: user.razor_id, key_secret: secret });

    // instance.orders.create({
    //     amount: 5000,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         to_username: to_username,
    //         paymentform: paymentform
    //     }
    // })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x=await instance.orders.create(options)

    await Payment.create({oid: x.id, amount: Number(amount/100), to_user: to_username, name: paymentform.name, message: paymentform.message})
    return x;
    
}

//fetch all users

export const fetchallusers = async (search) => {
    await connectDB();
    console.log("search", search);
    let users = await User.find({name: {$regex: search, $options: "i"}}).lean();
    return users.map(({_id,_v,...rest}) =>({
        ...rest, id: _id.toString(),
    }));
}

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({name: username}).lean();
    if (!u) {
        return null;
    }
    const {_id, _v, ...rest} = u;
    return {
        ...rest, id: _id.toString(),
    };
}

export const fetchpayments = async (username) => {
    await connectDB();
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).lean();
    return p.map(({_id,_v,...rest}) =>({
        ...rest, id: _id.toString(),
    }));
}

export const updateprofile = async (data, oldusername) => {
    await connectDB();
    let ndata=Object.fromEntries(Object.entries(data))
    console.log("updateprofile", ndata, oldusername);
    if(oldusername !== ndata.username) {
        let u = await User.findOne({name: ndata.username});
        if (u) {
            return {error: "Username already exists"};
        }
    }
    await User.updateOne({email: ndata.email},ndata);
}