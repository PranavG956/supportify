'use client'
import React, { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchuser, updateprofile } from '../actions/useractions'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
    const {data : session, status, update} = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    useEffect(() => {
      if(status === "loading") return;
      if(!session){
        router.push('/login')
    } else {
      console.log("session", session?.user?.name);
      getData();
    }
    }, [router , session, status])

    const handlechange =(e)=>{
        setform({...form, [e.target.name]:e.target.value})
        console.log("form", form);
    }

    const handlesubmit = async (e) => {
      e.preventDefault();
      console.log("form submitting", form);
      let a = await updateprofile(form, session?.user?.name);
      toast('Profile Updated Successfully', {
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

    const getData = async () => {
        let u = await fetchuser(session?.user?.name);
        console.log("user", u);
        setform({
          name: u.name || "",
          email: u.email || "",
          username: u.username || "",
          profile: u.profile || "",
          background: u.background || "",
          razor_id: u.razor_id || "",
          razor_secret: u.razor_secret || ""
        });
        console.log("form", form);
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
    <div className="flex gap-4 flex-col justify-center items-center px-[10vw] h-[90%] w-[90%] mx-auto text-white">
          <div className="font-bold text-2xl sm:text-3xl">
            Enter your Information
          </div>
          <form onSubmit={handlesubmit} action="">

          <div className="social_buttons flex flex-col items-center justify-center gap-3">
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Name" name="name" value={form.name ?form.name :""} id="Name" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Email" name="email" value={form.email ?form.email :""} id="Email" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Username" name="username" value={form.username ?form.username :""} id="Username" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Profile Icon" name="profile" value={form.profile ?form.profile :""} id="Profile" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Background" name="background" value={form.background ?form.background :""} id="Background" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Razorpay Id" name="razor_id" value={form.razor_id ?form.razor_id :""} id="Razor_ID" />
            <input onChange={handlechange} className="border min-w-[30vw] w-full border-gray-400 bg-gray-800 rounded-xl p-2 px-4" type="text" placeholder="Razorpay Secret" name="razor_secret" value={form.razor_secret ?form.razor_secret :""} id="Razor_Secret" />
            <button type="submit" className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2">Save</button>
          </div>
          </form>
        </div>
        </>
  )
}

export default Dashboard;


