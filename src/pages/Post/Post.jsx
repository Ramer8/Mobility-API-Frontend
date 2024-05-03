import "./Post.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"

import {
  createPost,
  deletePost,
  getAllUsersPosts,
  putlikes,
  updateMyPost,
} from "../../services/apiCalls"

import { CustomButton } from "../../common/CustomButton/CustomButton"
import { CustomInputTextArea } from "../../common/CustomInputTextArea/CustomInputTextArea"
import PostElement from "../../common/PostElement/PostElement"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Post = () => {
  const [myPosts, setMyPosts] = useState()
  const [postChanged, setPostChanged] = useState(false)
  const [isOpenAddPost, setIsOpenAddPost] = useState(false)

  const [newPost, setNewPost] = useState({
    content: "",
  })

  const navigate = useNavigate()

  const rdxUser = useSelector(userData)

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
  }, [rdxUser])

  // initial load and read post changes with the flag
  useEffect(() => {
    const fetching = async () => {
      try {
        const fetched = await getAllUsersPosts(rdxUser.credentials.token)
        // add function delete and edit to not avoid delete other users post.
        // and put if the post its yours put "you" instead of the your name
        if (!fetched?.success) {
          if (fetched.message === "JWT NOT VALID OR TOKEN MALFORMED")
            navigate("/login")

          //  setMsgError(fetched.message)
          throw new Error("Failed to fetch Posts data")
        }
        setMyPosts(fetched.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetching()
  }, [postChanged])

  const inputHandler = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const sendNewPost = () => {
    myNewPost(newPost)
    setIsOpenAddPost(!isOpenAddPost)
  }

  const myNewPost = async (newPost) => {
    try {
      const fetched = await createPost(newPost, rdxUser.credentials.token)
      if (!fetched?.success) {
        toast.error(fetched.message, { theme: "dark" })
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
      setNewPost({ content: "" })
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }

  const likesPost = async (id) => {
    try {
      const fetched = await putlikes(id, rdxUser.credentials.token)
      if (!fetched?.success) {
        toast.error(fetched.message, { theme: "dark" })
      }
      if (fetched?.success) {
        toast.success(fetched.message, { theme: "dark" })
      }
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMyPost = async (id) => {
    try {
      const fetched = await deletePost(id, rdxUser.credentials.token)
      if (!fetched?.success) {
        if (!rdxUser.credentials.token === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      if (fetched?.success) {
        toast.warn(fetched.message, { theme: "colored", position: "top-left" })
      }
      setPostChanged(!postChanged)
    } catch (error) {
      console.log(error)
    }
  }

  const editMyPost = async (id) => {
    try {
      const fetched = await updateMyPost(id, newPost, rdxUser.credentials.token)
      if (!fetched?.success) {
        if (!rdxUser.credentials.token === undefined) {
          throw new Error("Failed to fetch Appointment data")
        }
      }
      if (fetched?.success) {
        toast.warn(fetched.message, { theme: "colored", position: "top-left" })
      }
      setPostChanged(!postChanged)
      setNewPost({ content: "" })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <>
        <div className="postDesign">
          <div className="myPostContainer">
            {!isOpenAddPost && (
              <div className="titlePostContainer">
                <div className="leftSide">My Posts</div>
                <CustomButton
                  className={"addPost"}
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  }
                  functionEmit={() => setIsOpenAddPost(!isOpenAddPost)}
                />
              </div>
            )}

            {isOpenAddPost && (
              <div className="newPost">
                <CustomInputTextArea
                  className="textareaNewPost"
                  type={"text"}
                  name={"content"} //must be the key name idem like state newPost
                  disabled={""}
                  value={newPost.content || ""}
                  placeholder="write your post...."
                  functionChange={(e) => inputHandler(e)}
                  // onBlurFunction={(e) => checkError(e)}
                />
                <div className="modalButtons">
                  <CustomButton
                    className={"cancelModalButton"}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    }
                    functionEmit={() => setIsOpenAddPost(!isOpenAddPost)}
                  />
                  <CustomButton
                    className={"sendModalButton"}
                    title={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                      </svg>
                    }
                    functionEmit={() => sendNewPost()}
                  />
                </div>
              </div>
            )}
            {myPosts && (
              <div className="postList">
                {myPosts?.map((element) => (
                  <div key={element._id}>
                    <PostElement
                      key={element._id}
                      newPost={newPost}
                      setNewPost={sendNewPost}
                      element={element}
                      deleteMyPost={deleteMyPost}
                      likesPost={likesPost}
                      editMyPost={editMyPost}
                      inputHandler={inputHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
      <ToastContainer autoClose={500} />
    </div>
  )
}

export default Post
