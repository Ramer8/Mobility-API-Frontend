import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { CustomLink } from "../CustomLink/CustomLink"
import "./Header.css"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { logout, userData } from "../../app/slices/userSlice"
import { fetchMyProfile } from "../../services/apiCalls"

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const fetch = async () => {
  //     const fetched = await fetchMyProfile(rdxUser.credentials.token)

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
        <div className="menu">
          {rdxUser?.super && (
            <CustomLink
              title="Managment"
              destination="/managment"
              className={`${
                location.pathname === "/managment" ? "menuHighlighted" : "menu"
              }`}
            />
          )}
        </div>
        <CustomLink
          title={
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
          }
          destination="/"
        />

        {rdxUser?.credentials.token ? (
          <div className="menu">
            <CustomLink
              title={rdxUser?.credentials.tokenData.userName}
              destination="/profile"
              className={`${
                location.pathname === "/profile" ? "menuHighlighted" : "menu"
              }`}
            />
            <div
              onClick={() =>
                dispatch(
                  logout({ credentials: "", online: false, super: false })
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
                location.pathname === "/login" ? "menuHighlighted" : "menu"
              }`}
            />
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
