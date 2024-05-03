import { useEffect, useState } from "react"
import "./Register.css"
import { loginMe, registerMe } from "../../services/apiCalls"
import { CustomInput } from "../../common/CustomInput/CustomInput"
import { useNavigate } from "react-router-dom"
import Spinner from "../../common/Spinner/Spinner"
import { validame } from "../../utils/functions"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CustomButton } from "../../common/CustomButton/CustomButton"

import { decodeToken } from "react-jwt"
import { useDispatch } from "react-redux"
import { login } from "../../app/slices/userSlice"

export const Register = () => {
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [credentials, setCredentials] = useState({
    name: "",
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

    const fetched = await registerMe(credentials)

    if (!fetched.success) {
      toast.error(fetched.message, { theme: "dark", position: "top-left" })

      return
    }
    if (fetched.success) {
      toast.success(fetched.message, { theme: "dark" })
    }

    const { name, ...newCredentials } = credentials

    const logMe = async () => {
      const fetchedLogin = await loginMe(newCredentials)
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

      // Home redirected
      setTimeout(() => {
        navigate("/home")
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
    <div className="registerDesign">
      {!loadingFlag ? (
        <div>
          {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
          <label>Name:</label>
          <CustomInput
            className={`inputDesign ${
              credentialsError.nameError !== "" ? "inputDesignError" : ""
            }`}
            type="text"
            name="name"
            value={credentials.name || ""}
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
      ) : (
        <Spinner />
      )}
      <CustomButton
        className={"primaryButton"}
        title={"Register"}
        functionEmit={regMe}
      />
      <ToastContainer />
    </div>
  )
}
