import React from 'react'
import {useSelector} from "react-redux"

function Home() {
    const {userData}= useSelector(state=>state.user)
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#fff9f6]'>
      {userData?.role==="user" && <UserDashboard/>}
      {userData?.role==="owner" && <OwnerDashboard/>}
      {userData?.role==="deliveryboy" && <DeliveryBoy/>}
    </div>
  )
}

export default Home
