import "./Managment.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInput } from "../../common/CustomInput/CustomInput"

import { ToastContainer, toast } from "react-toastify"

import { useDispatch, useSelector } from "react-redux"
import { logout, userData } from "../../app/slices/userSlice"
import {
  searchUserData,
  updateUserCriteria,
} from "../../app/slices/searchUserSlice"

import {
  deleteMoreThanOnePosts,
  deleteMoreThanOneUsers,
  fetchAllUsers,
  getAllUsersPosts,
  getAllUsersTrips,
  searchUsers,
} from "../../services/apiCalls"

const Managment = () => {
  const [loadedData, setLoadedData] = useState(false)
  const [users, setUsers] = useState()
  const [trips, setTrips] = useState()
  const [posts, setPosts] = useState()

  const [searchUser, setSearchUser] = useState("")

  const [checkButton, setCheckButton] = useState(false)
  const [checkButtonPost, setCheckButtonPost] = useState(false)

  let arrayToDelete = []
  let arrayToDeletePost = []

  const rdxUser = useSelector(userData)

  const searchUserRdx = useSelector(searchUserData)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const searching = setTimeout(() => {
      dispatch(updateUserCriteria(searchUser))
    }, 375)
    return () => {
      clearTimeout(searching)
    }
  }, [searchUser])

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/")
    }
  }, [rdxUser, searchUserRdx])

  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await fetchAllUsers(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            toast.warn(fetched.message, { theme: "dark" })
            navigate("/login")
          }
          if (!rdxUser.credentials.token === undefined) {
            throw new Error("Failed to fetch profile data")
          }
        }
        setLoadedData(true)
        setUsers(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    console.log(users)
    const fetchingTrips = async () => {
      try {
        const fetched = await getAllUsersTrips(rdxUser.credentials.token)

        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED") {
            toast.warn(fetched.message, { theme: "dark" })
            navigate("/login")
          }
          if (!rdxUser.credentials.token === undefined) {
            throw new Error("Failed to fetch profile data")
          }
        }
        setTrips(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (!loadedData) {
      fetching()
      fetchingTrips()
    }
  }, [loadedData, searchUserRdx.criteriaUser])
  console.log(trips)
  const handleCheck = (id) => {
    setCheckButton(!checkButton)

    const isInArray = arrayToDelete.includes(id)
    if (isInArray) {
      const index = arrayToDelete.indexOf(id)
      arrayToDelete.splice(index, 1)
    } else {
      arrayToDelete.push(id)
    }
    setCheckButton(false)

    // setUsersToDelete({ usersId: arrayToDelete })
  }
  const deleteUsers = async () => {
    const usersToRemove = { usersId: arrayToDelete }

    if (arrayToDelete.length === 0) {
      toast.warn("You must select at least one user to delete", {
        theme: "dark",
      })
      return
    }
    try {
      const fetched = await deleteMoreThanOneUsers(
        usersToRemove,
        rdxUser.credentials.token
      )
      if (!fetched?.success) {
        toast.warn(fetched.message, { theme: "colorized" })

        if (!rdxUser.credentials.token === undefined) {
          toast.warn("Failed to fetch users data", { theme: "dark" })
          throw new Error("Failed to fetch users data")
        }
      }
    } catch (error) {
      console.log(error)
    }

    arrayToDelete = []
    setLoadedData(false)
  }

  const handleCheckTrip = (id) => {
    setCheckButtonPost(!checkButtonPost)

    const isInArrayPost = arrayToDeletePost.includes(id)
    if (isInArrayPost) {
      const index = arrayToDeletePost.indexOf(id)
      arrayToDeletePost.splice(index, 1)
    } else {
      arrayToDeletePost.push(id)
    }
    setCheckButtonPost(false)
    // setUsersToDelete({ usersId: arrayToDelete })
  }
  const deletePosts = async () => {
    const postsToRemove = { postsId: arrayToDeletePost }

    if (arrayToDeletePost.length === 0) {
      toast.warn("You must select at least one user to delete", {
        theme: "dark",
      })
      return
    }
    try {
      const fetched = await deleteMoreThanOnePosts(
        postsToRemove,
        rdxUser.credentials.token
      )
      if (!fetched?.success) {
        toast.warn(fetched.message, { theme: "dark" })

        if (!rdxUser.credentials.token === undefined) {
          toast.warn("Failed to fetch posts data", { theme: "dark" })
          throw new Error("Failed to fetch posts data")
        }
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
    } catch (error) {
      console.log(error)
    }

    arrayToDeletePost = []
    setLoadedData(!loadedData)
  }

  const inputHandler = (e) => {
    setSearchUser(e.target.value)
  }

  const search = async () => {
    try {
      let searchParam
      if (searchUserRdx.criteriaUser.includes("@")) {
        // Looks like an email
        searchParam = `email=${searchUser}`
      } else {
        // Looks like a name
        searchParam = `name=${searchUser}`
      }
      const fetched = await searchUsers(searchParam, rdxUser.credentials.token)
      if (!fetched?.success) {
        // toast.error(fetched.message, { theme: "dark" })
        if (!rdxUser.credentials.token === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      setUsers(fetched.data)
    } catch (error) {
      console.log(error)
    }
  }
  const wipeSearch = () => {
    setSearchUser("")
  }
  useEffect(() => {
    search()
  }, [searchUserRdx?.criteriaUser])

  // const columns = [
  //   { key: "_id", label: "ID" },
  //   { key: "name", label: "Name" },
  //   { key: "email", label: "Email" },
  //   { key: "role", label: "Role" },
  // ]

  return (
    <>
      {rdxUser.super && (
        <div className="managmentDesign">
          <div className="userContainer">
            <div className="userTable">
              <div className="preHeader">
                <div className="leftSide">User list</div>
                <div className="searchBar">
                  <CustomInput
                    className="inputDesign searchInputUser"
                    type="email"
                    name="email"
                    value={searchUser || ""}
                    placeholder={" search.."}
                    functionChange={inputHandler}
                  />
                  <CustomButton
                    className="clear"
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    }
                    functionEmit={() => wipeSearch()}
                  />
                </div>
                <CustomButton
                  className={"deleteUsers"}
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  }
                  functionEmit={() => deleteUsers()}
                />
              </div>
              {/* <div>
                  <CollapsibleTable data={users} columns={columns} />
                </div> */}
              <div className="fullTableUser">
                <div className="headerTitle">
                  <div>ID</div>
                  <div>Name</div>
                  <div>Email</div>
                  <div>Phone </div>
                  <div>Payment </div>
                  <div>Address </div>
                  <div>WorkAddress</div>
                  <div>SavedAddress</div>
                  <div>Documents</div>
                  <div>Role</div>
                </div>
                {!users?.length && (
                  <div className="messageTable">
                    Not users loaded or founded
                  </div>
                )}
                {/* {users && rdxUser.online && ( */}
                <div className="body-container">
                  <div className="body">
                    {users?.map((user) => (
                      <div key={user.id} className="row">
                        <div className="idUser">{user.id}</div>
                        <div> {user.userName}</div>
                        <div> {user?.email}</div>
                        <div> {user.phone} </div>
                        <div> {user.payment}</div>
                        <div> {user.address || "nd"} </div>
                        <div> {user.workAddress || "nd"} </div>
                        <div> {user.savedAddress || "nd"} </div>
                        <div> {user.documents || "nd"} </div>
                        <div> {new Date(user.createdAt).toDateString()} </div>

                        <div
                        // className={`${user.role === "user" && "colorized"}`}
                        >
                          {user.roleId}
                        </div>
                        <div>
                          <input
                            id="s1"
                            type="checkbox"
                            className="switch"
                            value={checkButton.state}
                            onChange={() => handleCheck(user.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="postContainerTable">
            {!trips?.length && "No trips loaded"}
            {trips && (
              <div className="postsTable">
                <div className="preHeader">
                  <div className="leftSide colorized">Trips list</div>
                  <CustomButton
                    className={"deleteUsers"}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-trash3-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                      </svg>
                    }
                    functionEmit={() => deletePosts()}
                  />
                </div>
                <div className="fulltablePost">
                  <div className="headerTitle">
                    <div>ID</div>
                    <div>StartLocation</div>
                    <div>Destination</div>
                    <div>Trip Date</div>
                    <div>Trip Finish Date</div>
                    <div>Car</div>
                    <div>UserId</div>
                  </div>
                  <div className="body-container">
                    <div className="body">
                      {trips?.map((trips) => (
                        <div key={trips.id} className="row">
                          <div className="idUser">{trips.id}</div>
                          <div>{trips.startLocation}</div>
                          <div>{trips.destination}</div>
                          <div className="datePost">
                            {new Date(trips.tripDate).toDateString()}
                          </div>

                          <div className="datePost">
                            {new Date(trips.tripFinishDate).toDateString()}
                          </div>
                          <div>{trips.car.model}</div>
                          <div>{trips.car.numberPlate}</div>

                          <div>{trips.car.seat}</div>
                          <div>{!trips.car.accessible ? "no" : "yes"}</div>
                          <div>{trips.car.powerEngine}</div>
                          <div>{trips.driver.driverName}</div>
                          <div>{trips.user.userName}</div>
                          <div>{trips.user.payment}</div>
                          {/* <div>{trips?.userId.email}</div> */}
                          {trips?.destination.substring(0, 16) + "..."}
                          <div>
                            {/* {"..." + trips?.userId.id.substring(19, 24)} */}
                          </div>
                          <div>
                            <input
                              id="s1"
                              type="checkbox"
                              className="switch"
                              value={checkButtonPost.state}
                              onChange={() => handleCheckTrip(trips.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default Managment
