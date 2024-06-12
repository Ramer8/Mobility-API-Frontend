import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./Home.css"

import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

import Maps from "../../common/Maps/Maps"

export const Home = () => {
  const navigate = useNavigate()
  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [rdxUser])

  return (
    <div className="homeDesign">
      <Maps />
    </div>
  )
}
