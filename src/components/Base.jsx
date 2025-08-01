import Sidebar from "./sidebar"
import PostFeeds from "./postfeeds"
import { Outlet } from "react-router-dom"


export default function BaseLayout() {

    return (

         <div className="h-screen flex">

      <Sidebar />


      <div className="w-[500px] bg-gray-700 overflow-auto border-r border-gray-600">
        <Outlet />
      </div>

      {/* Center Feed always visible */}
      <div className="flex-1 bg-gray-800 overflow-auto p-4">
        <PostFeeds />
      </div>
    </div>

    )




}