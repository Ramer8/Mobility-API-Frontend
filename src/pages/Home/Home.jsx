import { useEffect, useState } from "react"
import { fetchMyProfile, searchUsers } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

import "./Home.css"
import Profile from "../Profile/Profile"
// import Post from "../Post/Post"
import { searchUserData } from "../../app/slices/searchUserSlice"
import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"

import Maps from "../../common/Maps/Maps"

export const Home = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [showProfile, setShowProfile] = useState()
  const [loadedData, setLoadedData] = useState(false)

  const navigate = useNavigate()

  // const dispatch = useDispatch()
  const rdxUser = useSelector(userData)

  // console.log(rdxUser.location)

  // useEffect(() => {
  //   console.log(rdxUser, "from home")
  // }, [rdxUser])

  // const searchCriteria = useSelector(searchUserData)
  console.log(" in home view")
  // console.log(searchCriteria)  if not use this I can delete it!
  // when arrive to home view load the value from magament by redux

  // useEffect(() => {
  //   const fetching = async () => {
  //     try {
  //       const fetched = await fetchMyProfile(rdxUser.credentials.token)
  //       if (!fetched?.success) {
  //         if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
  //           dispatch(logout({ credentials: "" }))

  //           toast.error(fetched.message, {
  //             theme: "dark",
  //             position: "top-left",
  //             autoClose: 500,
  //           })
  //           return
  //         }
  //         toast.error(fetched.message, {
  //           theme: "dark",
  //           position: "top-left",
  //           autoClose: 500,
  //         })
  //         navigate("/login")
  //         return
  //       }
  //       const data = await fetched
  //       setShowProfile(data.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   if (!loadedData) {
  //     fetching()
  //   }
  // }, [rdxUser.credentials.token]) // Execute useEffect whenever the token changes

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
    // setLoadedData(true)
  }, [rdxUser])

  // const changeBackground = () => {
  //   setActiveMenu(!activeMenu)
  // }

  // console.log(!showProfile, " show y loaded ", !loadedData)

  return (
    <div className="homeDesign">
      {/* <GeoLocation /> */}
      <Maps />
    </div>
  )
}
