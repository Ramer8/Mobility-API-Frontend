import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./Login.css"
import { loginMe } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

import { useDispatch } from "react-redux"
import { login } from "../../app/slices/userSlice"
import RotatingText from "../../common/Spinner/RotatingText"

export const Login = () => {
  const [loading, setLoading] = useState(false)

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  })
  // eslint-disable-next-line
  const [status, setStatus] = useState("")

  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 1600

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setStatus("")

    let location = { latitude, longitude }
    dispatch(login({ location }))

    //then we have the coords location go to home view
    // Simulate loading
    setLoading(true)
    setTimeout(() => {
      navigate("/home")
    }, SUCCESS_MSG_TIME)
  }

  const error = () => {
    setStatus("Unable to retrieve your location")
  }

  const geoFindMe = () => {
    setStatus("Locating…")
    navigator.geolocation.getCurrentPosition(success, error)
  }

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value)

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const logMe = async () => {
    setLoading(true)

    for (let credential in credentials) {
      if (credentials[credential] === "") {
        toast.error("You must fill in all fields", {
          theme: "colored",
          position: "top-left",
        })
        return
      }
    }

    const fetched = await loginMe(credentials)
    if (!fetched.success) {
      toast.error(fetched.message, { theme: "colored", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "colored", autoClose: 500 })
    }

    const decoded = {
      tokenData: decodeToken(fetched.token),
      token: fetched.token,
    }

    dispatch(login({ credentials: decoded }))
    // dispatch(login({ online: true }))

    // Go to SuperAdmin Managment
    if (decoded?.tokenData?.roleName === "super_admin") {
      geoFindMe()
      dispatch(login({ super: true }))

      setLoading(true)
      setTimeout(() => {
        navigate("/managment")
      }, SUCCESS_MSG_TIME)
      return
    }
    geoFindMe()

    dispatch(login({ super: false }))
  }

  useEffect(() => {
    toast.dismiss() //clear all the messages
    credentialsError.emailError &&
      toast.warn(credentialsError.emailError, {
        theme: "colored",
        autoClose: 1500,
      })
    credentialsError.passwordError &&
      toast.warn(credentialsError.passwordError, {
        theme: "colored",
        autoClose: 1500,
      })

    setTimeout(() => {
      if (credentialsError.passwordError || credentialsError.emailError) {
        setCredentialsError({
          emailError: "",
          passwordError: "",
        })
      }
    }, ERROR_MSG_TIME)
  }, [credentialsError])

  return (
    <div>
      {loading && <RotatingText />}
      <div className="loginDesign">
        <label>Name:</label>
        <CustomInput
          className={`inputDesign ${
            credentialsError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type="email"
          name="email"
          value={credentials.email || ""}
          placeholder="Email"
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <label>Password:</label>
        <CustomInput
          className={`inputDesign ${
            credentialsError.passwordError !== "" ? "inputDesignError" : ""
          }`}
          type="Password"
          name="password"
          value={credentials.password || ""}
          placeholder="Password"
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <CustomButton
          className={"primaryButton login"}
          title={"Log in"}
          functionEmit={logMe}
        />
        <div className="footerRedirection">
          <div>Dont have an account? </div>
          <div className="linkToRegister" onClick={() => navigate("/register")}>
            Sign Up
          </div>
        </div>
        <ToastContainer position="top-left" autoClose={500} theme="colored" />
      </div>
    </div>
  )
}
