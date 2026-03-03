import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
function Nav() {
    const {userData} = useSelector(state => state.user);
    const [showInfo, setShowInfo] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
  return (
    <div className='w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 fixed top-0 z-9999 bg-white shadow-md'>

        {showSearch && <div className='w-[90%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 flex fixed top-20 left-[5%]'>
        <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-r-gray-400'>
        <FaLocationDot  size={25} className='text-[#ff4d2d]'/>
        <div className='w-[80%] truncate text-gray-600'>Jhansi</div>
        </div>
        <div className='w-[80%] flex items-center gap-2.5'>
        <IoSearch size={25} className='text-[#ff4d2d]'/>
        <input type="text" placeholder='Search for delicious food...' className='px-2.5 text-gray-700 outline-0 w-full' />
        </div>
      </div>}



      <h1 className='text-[20px] font-bold text-[#333]'>Welcome to EatoGo</h1>
      <div className='md:w-[60%] lg:w-[40%] hidden h-10 flex items-center justify-between'>
        <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-r-gray-400'>
        <FaLocationDot  size={25} className='text-[#ff4d2d]'/>
        <div className='w-[80%] truncate text-gray-600'>Jhansi</div>
        </div>
        <div className='w-[80%] flex items-center gap-2.5'>
        <IoSearch size={25} className='text-[#ff4d2d]'/>
        <input type="text" placeholder='Search for delicious food...' className='px-2.5 text-gray-700 outline-0 w-full' />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <IoSearch size={25} className='text-[#ff4d2d] md:hidden'/>
      <div className='relative cursor-pointer'>
        <IoCartOutline size={25} className='text-[#ff4d2d]'/>
        <span className='absolute -right-2.25 -top-3 text-[#ff4d2d]'>0</span>
      </div>
      <button className='hidden md:block px-4 py-2 bg-[#ff4d2d] text-white rounded-md cursor-pointer' >
        My Order
      </button>
      <div className='w-10 h-10 rounded-full bg-[#ff4d2d] text-white flex items-center justify-center cursor-pointer' onClick={()=>setShowInfo(prev=>!prev)}>
        {userData?.fullName.slice(0,1)}
      </div>
      {showInfo && (
        <div className='fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999'>
          <div className='text-[17px] font-semibold'>
            {userData?.fullName}
          </div>
          <div className='md:hidden text-[#ff4d2d] font-semiboldcursor-pointer'>My Orders</div>
          <div className='text-[#ff4d2d] font-semiboldcursor-pointer'>LogOut</div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Nav
