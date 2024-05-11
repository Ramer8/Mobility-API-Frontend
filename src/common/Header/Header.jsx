import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { logout, userData } from "../../app/slices/userSlice"
import { fetchMyProfile } from "../../services/apiCalls"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = (event) => {
    if (!event.target.matches(".dropbtn")) {
      setIsOpen(false)
    }
  }

  window.onclick = closeDropdown // Attach event listener to window to close dropdown when clicking outside

  // useEffect(() => {
  //   const fetch = async () => {
  //     const fetched = await fetchMyProfile(rdxUser.credentials.token)
  //     console.log("paso por aqui header")
  //     if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
  //       dispatch(logout({ credentials: "" }))
  //       navigate("/login")
  //     }
  //     return
  //   }
  //   fetch()
  // }, [rdxUser])

  return (
    <>
      <div className="headerDesign">
        {/* <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            Bookings
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${isOpen ? "show" : ""}`}
          >
            <div className="headerDropDown">
              <div className="menu">
                {rdxUser?.super && (
                  <CustomLink
                    title={
                      <div className="dropdownIcons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gear-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                        Admin menu
                      </div>
                    }
                    destination="/managment"
                    className={`${
                      location.pathname === "/managment"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                )}
              </div>
              <CustomLink
                title={
                  <div className="dropdownIcons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-car-front-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                    </svg>{" "}
                    Trip
                  </div>
                }
                destination="/"
              />
              {rdxUser?.credentials.token ? (
                <div className="menu">
                  <CustomLink
                    title={rdxUser?.credentials.tokenData.userName}
                    destination="/profile"
                    className={`${
                      location.pathname === "/profile"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                  <div
                    onClick={() =>
                      dispatch(
                        logout({
                          credentials: "",
                          online: false,
                          super: false,
                          location: "",
                        })
                      )
                    }
                  >
                    <CustomLink
                      title={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-box-arrow-in-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                          />
                        </svg>
                      }
                      destination="/"
                    />
                  </div>
                </div>
              ) : (
                <div className="menu">
                  <CustomLink
                    title={"Login"}
                    destination="/login"
                    className={`${
                      location.pathname === "/login"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div> */}
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            {/* <img
              onClick={toggleDropdown}
              className="iconAvatar"
              src="./public/icons/avatarboy.svg"
              width={70}
            ></img> */}
            <svg
              onClick={toggleDropdown}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${isOpen ? "show" : ""}`}
          >
            <div className="headerDropDown">
              <div className="menu">
                {rdxUser?.super && (
                  <CustomLink
                    title={
                      <div className="dropdownIcons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-gear-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                        Admin menu
                      </div>
                    }
                    destination="/managment"
                    className={`${
                      location.pathname === "/managment"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                )}
              </div>
              {/* <a href="#about">About</a> */}
              <CustomLink
                title={
                  <div className="dropdownIcons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-car-front-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                    </svg>{" "}
                    Trip
                  </div>
                }
                destination="/"
              />
              {/* <a href="#contact">Contact</a> */}
              {rdxUser?.credentials.token ? (
                <div className="menu">
                  <CustomLink
                    title={rdxUser?.credentials.tokenData.userName}
                    destination="/profile"
                    className={`${
                      location.pathname === "/profile"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                  <div
                    onClick={() =>
                      dispatch(
                        logout({
                          credentials: "",
                          online: false,
                          super: false,
                          location: "",
                        })
                      )
                    }
                  >
                    <CustomLink
                      title={
                        <div className="dropdownIcons">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-box-arrow-in-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                            />
                          </svg>
                          {""}logout
                        </div>
                      }
                      destination="/"
                    />
                  </div>
                </div>
              ) : (
                <div className="menu">
                  <CustomLink
                    title={"Login"}
                    destination="/login"
                    className={`${
                      location.pathname === "/login"
                        ? "menuHighlighted"
                        : "menu"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  )
}
