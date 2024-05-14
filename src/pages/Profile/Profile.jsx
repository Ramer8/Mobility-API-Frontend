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
              autoClose: 1500,
            })
            return
          }
          toast.error(fetched.message, {
            theme: "dark",
            position: "top-left",
            autoClose: 1500,
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

        toast.success(fetched.message, { theme: "dark", autoClose: 1500 })
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
                src="/avatarboy1.svg"
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
                className={"primaryButton uploadProfile login"}
                title={"Upload"}
                functionEmit={() => setWrite("")}
              />
              <CustomButton
                className={" primaryButton removeProfile login"}
                title={"Remove"}
                functionEmit={() => setWrite("")}
              />
            </div>
            <div className="formProfile">
              <div className="nameLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-vcard"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
                </svg>
                <label>Name</label>
              </div>
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
              <div className="addressLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
                <label>Address</label>
              </div>
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
              <div className="phoneLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
                <label>Phone</label>
              </div>
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
              <div className="paymentLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-credit-card"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
                <label>Payment</label>
              </div>
              <div className="payment">
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
                  <label htmlFor="cash">Pay driver directly</label>
                </div>
              </div>

              <CustomButton
                className={
                  write === ""
                    ? "primaryButton updateData"
                    : "primaryButton editButton login"
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
