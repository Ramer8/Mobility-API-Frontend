import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import "./DriverLogin.css"
import { loginDriver } from "../../services/apiCalls"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

import { useDispatch } from "react-redux"
import { login } from "../../app/slices/userSlice"
import RotatingText from "../../common/Spinner/RotatingText"

export const DriverLogin = () => {
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
      //   navigate("/home")
      navigate("/drivers/profile")
      // change navigate to driverHome, before create the page!
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

    const fetched = await loginDriver(credentials)
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
      <div className="loginDriverDesign">
        <div>
          <h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-taxi-front"
              viewBox="0 0 16 16"
            >
              <path d="M4.862 5.276 3.906 7.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 5H5.309a.5.5 0 0 0-.447.276M4 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-9 0a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" />
              <path d="M6 1a1 1 0 0 0-1 1v1h-.181A2.5 2.5 0 0 0 2.52 4.515l-.792 1.848a.8.8 0 0 1-.38.404c-.5.25-.855.715-.965 1.262L.05 9.708a2.5 2.5 0 0 0-.049.49v.413c0 .814.39 1.543 1 1.997V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.338c1.292.048 2.745.088 4 .088s2.708-.04 4-.088V14.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1.892c.61-.454 1-1.183 1-1.997v-.413q0-.248-.049-.49l-.335-1.68a1.8 1.8 0 0 0-.964-1.261.8.8 0 0 1-.381-.404l-.792-1.848A2.5 2.5 0 0 0 11.181 3H11V2a1 1 0 0 0-1-1zM4.819 4h6.362a1.5 1.5 0 0 1 1.379.91l.792 1.847a1.8 1.8 0 0 0 .853.904c.222.112.381.32.43.564l.336 1.679q.03.146.029.294v.413a1.48 1.48 0 0 1-1.408 1.484c-1.555.07-3.786.155-5.592.155s-4.037-.084-5.592-.155A1.48 1.48 0 0 1 1 10.611v-.413q0-.148.03-.294l.335-1.68a.8.8 0 0 1 .43-.563c.383-.19.685-.511.853-.904l.792-1.848A1.5 1.5 0 0 1 4.82 4Z" />
            </svg>{" "}
            DRIVER LOGIN
          </h1>
        </div>
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
          <div
            className="linkToRegister"
            onClick={() => navigate("/drivers/register")}
          >
            Sign Up
          </div>
        </div>
        <ToastContainer position="top-left" autoClose={500} theme="colored" />
      </div>
    </div>
  )
}
