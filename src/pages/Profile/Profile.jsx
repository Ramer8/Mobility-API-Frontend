import { useNavigate } from "react-router-dom"
import "./Profile.css"
import { fetchMyProfile, updateProfile } from "../../services/apiCalls"
import { useEffect, useState } from "react"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { CustomInput } from "../../common/CustomInput/CustomInput"

import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"
import { validame } from "../../utils/functions"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInputTextArea } from "../../common/CustomInputTextArea/CustomInputTextArea"
import Spinner from "../../common/Spinner/Spinner"

const Profile = () => {
  const [write, setWrite] = useState("disabled")

  const [loadedData, setLoadedData] = useState(false)

  const [user, setUser] = useState({
    name: "",
    gender: "",
    birthday: "",
    address: "",
    phone: "",
    bio: "",
  })

  const [userError, setUserError] = useState({
    nameError: "",
  })

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const ERROR_MSG_TIME = 6000
  const SUCCESS_MSG_TIME = 3000

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser])

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const checkError = (e) => {
    const error = validame(e.target.name, e.target.value)

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }
  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
  }, [rdxUser])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchMyProfile(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            dispatch(logout({ credentials: "" }))

            toast.error(fetched.message, {
              theme: "dark",
              position: "top-left",
              autoClose: 500,
            })
            return
          }
          toast.error(fetched.message, {
            theme: "dark",
            position: "top-left",
            autoClose: 500,
          })
          navigate("/login")
          return
        }
        setLoadedData(true)
        setUser({
          name: fetched.data.name,
        })
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
    }
  }, [rdxUser]) // Execute useEffect whenever the user changes

  const updateData = async () => {
    if (!userError.name) {
      console.log(user)
      try {
        const fetched = await updateProfile(user, rdxUser.credentials.token)

        toast.success(fetched.message, { theme: "dark", autoClose: 500 })
        setUser({
          name: fetched.data.name,
          gender: fetched.data.gender,
          birthday: fetched.data.birthday,
          address: fetched.data.address,
          phone: fetched.data.phone,
          bio: fetched.data.bio,
        })
        console.log(fetched)
        setWrite("disabled")
      } catch (error) {
        console.log(error)
      }

      return
    }
  }
  // useEffect(() => {
  //   toast.dismiss()

  //   userError.nameError && toast.warn(userError.nameError, { theme: "dark" })
  // }, [userError, write])

  return (
    <>
      <div className="profileDesign">
        {!loadedData ? (
          <div>CARGADNDO</div>
        ) : (
          // <Spinner />
          <div className="boxProfile">
            <div className="titleHeader">Personal Information:</div>
            <div className="headerProfile">
              <img
                className="pic"
                src="/avatarMale.png"
                width=""
                alt="profilePic"
              />
              <div className="titlePic">Upload picture</div>
              <div className="advicePicture">
                For best results, use an image at least 256px by 256px in either
                .jpg or .png format
              </div>
              <div className="buttonsPicture">
                <CustomButton
                  className={"primaryButton uploadProfile"}
                  title={"Upload"}
                  functionEmit={() => setWrite("")}
                />
                <CustomButton
                  className={" primaryButton removeProfile"}
                  title={"Remove"}
                  functionEmit={() => setWrite("")}
                />
              </div>
            </div>
            <div className="formProfile">
              <label>Name:</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"text"}
                placeholder={""}
                name={"name"}
                disabled={write}
                value={user.name || ""}
                functionChange={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
              />
              <label>Gender:</label>
              <div className="gender">
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    disabled={write}
                    value={"Female"}
                    onChange={(e) => inputHandler(e)}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value={"Male"}
                    onChange={(e) => inputHandler(e)}
                  />
                  <label htmlFor="male">Male</label>
                </div>
              </div>

              <label>Birthday:</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"datetime-local"}
                placeholder={""}
                name={"birthday"}
                disabled={write}
                value={user.birthday || ""}
                functionChange={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
              />
              <label>Address:</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"text"}
                placeholder={""}
                name={"address"}
                disabled={write}
                value={user.address || ""}
                functionChange={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
              />
              <label>Phone no.</label>
              <CustomInput
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"number"}
                placeholder={""}
                name={"phone"}
                disabled={write}
                value={user.phone || ""}
                functionChange={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
              />
              <label>Your Bio Here:</label>
              <CustomInputTextArea
                className={
                  `inputDesign ${
                    userError.nameError.length !== 0 ? "inputDesignError" : ""
                  }` && ` inputDesign ${write === "" ? "" : "inputBlock"}`
                }
                type={"text"}
                placeholder={""}
                name={"bio"}
                disabled={write}
                value={user.bio || ""}
                functionChange={(e) => inputHandler(e)}
                // onBlurFunction={(e) => checkError(e)}
              />
              <CustomButton
                className={
                  write === ""
                    ? "primaryButton updateData"
                    : "primaryButton editButton"
                }
                title={write === "" ? "Save changes" : "Edit"}
                functionEmit={write === "" ? updateData : () => setWrite("")}
              />
            </div>
            <div className="formFooter">
              <div className="titleFooter">Delete Account :</div>
              <div className="deleteText">
                Do you want to delete the account? Please press below
                &quot;Delete&quot; button
              </div>
            </div>
            <CustomButton
              className={"deleteProfile"}
              title={"Delete Account"}
              functionEmit={() => setWrite("")}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  )
}

export default Profile
