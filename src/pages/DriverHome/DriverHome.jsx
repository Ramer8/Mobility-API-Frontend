import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./DriverHome.css"

import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

import Maps from "../../common/Maps/Maps"

export const DriverHome = () => {
  const navigate = useNavigate()
  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/drivers/login")
    }
  }, [rdxUser])

  return (
    <div className="homeDriverDesign">
      <h2>Drivers</h2>
      <Maps />
    </div>
  )
}
