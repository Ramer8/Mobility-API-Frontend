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
    userName: "",
    phone: "",
    address: "",
    payment: "",
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
          userName: fetched.data.userName,
          phone: fetched.data.phone,
          address: fetched.data.address,
          payment: fetched.data.payment,
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
      try {
        const fetched = await updateProfile(user, rdxUser.credentials.token)

        toast.success(fetched.message, { theme: "dark", autoClose: 500 })
        setUser({
          userName: fetched.userNameUpdated,
          address: fetched.addressUpdated,
          phone: fetched.phoneUpdated,
          payment: fetched.paymentUpdated,
        })
        setWrite("disabled")
      } catch (error) {
        console.log(error)
      }

      return
    }
  }
  useEffect(() => {
    toast.dismiss()

    userError.nameError && toast.warn(userError.nameError, { theme: "dark" })
  }, [userError, write])

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
              {/* <div className="advicePicture">
                For best results, use an image at least 256px by 256px in either
                .jpg or .png format
              </div> */}
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
                name={"userName"}
                disabled={write}
                value={user.userName || ""}
                functionChange={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
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
              <label>Payment:</label>
              <div className="gender">
                <div>
                  <input
                    type="radio"
                    id="debit"
                    name="payment"
                    disabled={write}
                    value={"debit"}
                    onChange={(e) => inputHandler(e)}
                  />
                  <label htmlFor="debit">Debit</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="credit"
                    name="payment"
                    value={"credit"}
                    onChange={(e) => inputHandler(e)}
                  />
                  <label htmlFor="credit">Credit</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value={"cash"}
                    onChange={(e) => inputHandler(e)}
                  />
                  <label htmlFor="cash">Cash</label>
                </div>
              </div>

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
