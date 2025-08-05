"use client"

import React from 'react'
import Script from 'next/script'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '../actions/useractions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { set } from 'mongoose'

const PaymentsPage = ({username}) => {
    const [paymentform, setpaymentform] = useState({name:"", message:"", amount:""});
    const { data: session } = useSession();
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [total, settotal] = useState(0)
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
      getData();
    }, [])

    useEffect(() => {
      if(searchParams.get("paymentdone")== "true") {
        toast('Payment Successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      }
      router.push(`/${username}`);
    }, [])
    
    

    const getData = async () => {
        let u = await fetchuser(username);
        setcurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
        dbpayments.forEach((p) => {
            settotal((prev) => prev + p.amount);
        });
        console.log(u,dbpayments);
    }

    // let a = await initiate(amount, session?.username, paymentform);
    // let orderId = a.id;
    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        console.log(a);
        let orderId = a.id;
        var options = {
    "key": currentUser.razor_id, // Enter the Key ID generated from the Dashboard
    "amount": amount, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Supportify", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
        }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

const handlechange = (e) => {
    setpaymentform({...paymentform, [e.target.name]: e.target.value});
    console.log(paymentform);
}

  return (
    <>
        <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
<div className="cover w-full relative">
        <img className="object-cover w-[100%] h-[350px]" src={currentUser.background} alt="" />
        <img className="rounded-full border-white border w-28 h-28 absolute left-[calc(50%-56px)] bottom-[-56px]" src={currentUser.profile} alt="profile" />
    </div>
    <div className="info flex flex-col justify-center items-center mt-[56px]">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400 p-2">Created this page for animators intrested in animations</div>
        <div className="text-slate-400 p-2">{payments.length} Donations • ₹ {total} donated</div>
    </div>
    <div className="payment flex flex-col lg:flex-row lg:justify-around justify-center items-center lg:items-stretch lg:gap-3 gap-5 w-[80%] mx-auto py-5">
        <div className="supporters w-[100%] lg:w-[45%] flex flex-col justify-center items-center bg-gray-800 text-white rounded-xl p-4">
            <div className="font-bold text-xl">Top Donations</div>
            <ul className="flex gap-2 flex-col max-h-[400px] overflow-y-scroll scroller font-light">
                {payments.length === 0 && <div className="text-gray-400">No donations yet</div>}
                {payments.slice(0,10).map((p,i)=> {
                    return <li key={i} className="flex items-center gap-3">
                    <img className="rounded-full w-10 h-10" src="https://i.pinimg.com/736x/7a/13/40/7a13407cd778b9da0a443eff81077688.jpg" alt="" />
                    <div><span className="font-bold">{p.name}</span> donated <span className="font-bold">₹{p.amount}</span> with message <span className="font-semibold">{p.message}</span></div></li>
                })}
            </ul>
        </div>
        <div className="pay w-[100%] lg:w-[45%] flex flex-col justify-start items-center bg-gray-800 rounded-xl p-4">
        <div className="text-2xl font-bold">
            Payment Here
        </div>
            <div className="flex flex-col gap-2 p-5 w-full justify-center items-center">
                <input onChange={handlechange} value={paymentform.name} className="border w-full border-gray-400 bg-gray-700 rounded-xl p-2 px-4" type="text" placeholder="Your Name" name="name" id="" />
                <input onChange={handlechange} value={paymentform.message} className="border w-full border-gray-400 bg-gray-700 rounded-xl p-2 px-4" type="text" placeholder="Message" name="message" id="" />
                <input onChange={handlechange} value={paymentform.amount} className="border w-full border-gray-400 bg-gray-700 rounded-xl p-2 px-4" type="text" placeholder="Enter amount" name="amount" id="" />
                <button onClick={() => pay(paymentform.amount*100)} type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-3 py-2 w-20 text-center disabled:text-gray-300 disabled:bg-slate-500 disabled:from-slate-500 disabled:to-slate-500" disabled={paymentform.name.length<3 || paymentform.message.length<3 || paymentform.amount.length<1}>Pay</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default PaymentsPage
