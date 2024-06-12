import { useEffect, useState } from "react"
import "./DriverRegister.css"
import { loginDriver, registerDriver } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
import { validame } from "../../utils/functions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

import { decodeToken } from "react-jwt"
import { useDispatch } from "react-redux"
import { login } from "../../app/slices/userSlice"
import RotatingText from "../../common/Spinner/RotatingText"

export const DriverRegister = () => {
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    driverName: "",
    email: "",
    password: "",
  })

  const [credentialsError, setCredentialsError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  })
  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 2000

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const regMe = async () => {
    for (let credential in credentials) {
      if (credentials[credential] === "") {
        toast.error("You must fill in all fields", { theme: "dark" })
        return
      }
    }

    const fetched = await registerDriver(credentials)

    if (!fetched.success) {
      toast.error(fetched.message, { theme: "dark", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "dark" })
    }
    // eslint-disable-next-line
    const { name, ...newCredentials } = credentials

    const logMe = async () => {
      const fetchedLogin = await loginDriver(newCredentials)
      if (!fetchedLogin.success) {
        toast.error(fetchedLogin.message, {
          theme: "colored",
          position: "top-left",
        })

        return
      }
      if (fetchedLogin.success) {
        toast.success(fetchedLogin.message, {
          theme: "colored",
        })
      }

      const decoded = {
        tokenData: decodeToken(fetchedLogin.token),
        token: fetchedLogin.token,
      }

      dispatch(login({ credentials: decoded }))
      dispatch(login({ online: true }))
      dispatch(login({ super: false }))

      setLoading(true)
      // Home redirected
      setTimeout(() => {
        navigate("/drivers/profile")
      }, SUCCESS_MSG_TIME)
    }
    logMe()
  }

  useEffect(() => {
    toast.dismiss()
    credentialsError.emailError &&
      toast.warn(credentialsError.emailError, { theme: "dark" })
    credentialsError.passwordError &&
      toast.warn(credentialsError.passwordError, { theme: "dark" })
    credentialsError.nameError &&
      toast.warn(credentialsError.nameError, { theme: "dark" })
    setTimeout(() => {
      if (
        credentialsError.nameError ||
        credentialsError.passwordError ||
        credentialsError.emailError
      ) {
        setCredentialsError({
          nameError: "",
          emailError: "",
          passwordError: "",
        })
      }
    }, ERROR_MSG_TIME)
  }, [credentialsError])

  return (
    <div className="driverRegisterDesign">
      {/* {loading && <Spinner />} */}
      {loading && <RotatingText />}
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
          DRIVER REGISTER
        </h1>
      </div>
      <div>
        <label>Name:</label>
        <CustomInput
          className={`inputDesign ${
            credentialsError.nameError !== "" ? "inputDesignError" : ""
          }`}
          type="text"
          name="driverName"
          value={credentials.driverName || ""}
          placeholder="write your name...."
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <label>Email:</label>
        <CustomInput
          className={`inputDesign ${
            credentialsError.emailError !== "" ? "inputDesignError" : ""
          }`}
          type="email"
          name="email"
          value={credentials.email || ""}
          placeholder="write your email...."
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
        <label>Password:</label>
        <CustomInput
          className={`inputDesign ${
            credentialsError.passwordError !== "" ? "inputDesignError" : ""
          }`}
          type="password"
          name="password"
          value={credentials.password || ""}
          placeholder="write your password...."
          functionChange={inputHandler}
          onBlurFunction={(e) => checkError(e)}
        />
      </div>
      <CustomButton
        className={"primaryButton login driverRegister"}
        title={"Register"}
        functionEmit={regMe}
      />
      <ToastContainer />
    </div>
  )
}
