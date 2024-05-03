import "./PostElement.css"
import { useEffect, useState } from "react"
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"

import { CustomButton } from "../CustomButton/CustomButton"
import PostModal from "../PostModal/PostModal"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { logout, userData } from "../../app/slices/userSlice"
import { useDispatch } from "react-redux"

const PostElement = ({
  newPost,
  deleteMyPost,
  element,
  likesPost,
  editMyPost,
  inputHandler,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenView, setModalIsOpenView] = useState(false)

  const { createdAt, _id, content, likes, userId } = element

  const rdxUser = useSelector(userData)
  const navigate = useNavigate()

  useEffect(() => {
    if (!rdxUser.credentials.token) {
      navigate("/login")
    }
  }, [rdxUser])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setModalIsOpen(true)}>Edit</SwipeAction>
    </LeadingActions>
  )
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteMyPost(_id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </SwipeAction>
    </TrailingActions>
  )
  const putModalOn = () => {
    setModalIsOpenView(true)
    setModalIsOpen(true)
  }

  return (
    <>
      {rdxUser.online && (
        <div>
          <SwipeableList>
            <SwipeableListItem
              leadingActions={
                userId?._id === rdxUser?.credentials.tokenData.userId
                  ? leadingActions()
                  : ""
              }
              trailingActions={
                userId?._id === rdxUser?.credentials.tokenData.userId
                  ? trailingActions()
                  : ""
              }
            >
              <div
                className={` post  tooltip ${
                  userId?._id === rdxUser?.credentials.tokenData.userId
                    ? "postHighlighted"
                    : ""
                }`}
                key={_id}
              >
                {userId?._id === rdxUser?.credentials.tokenData.userId ? (
                  <span className="hoverPostText">
                    <img src="../public/swipe3.svg" alt="swipe" />
                  </span>
                ) : (
                  ""
                )}
                <div className="headerPost">
                  <div className="postOwner">{userId?.name}</div>
                  <div className="date">
                    {new Date(createdAt).toDateString().replace("2024", " ")}
                    {/* poner algoritmo q diga q si es otro año lo ponga sino vacio */}
                    {/* puedo hacer lo mismo con post de hoy o de ayer */}
                  </div>
                </div>
                <div className="postContent" onClick={() => putModalOn()}>
                  {content}
                </div>
                <PostModal
                  thePost={element}
                  newPost={newPost}
                  inputHandler={inputHandler}
                  editMyPost={editMyPost}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  modalIsOpenView={modalIsOpenView}
                  setModalIsOpenView={setModalIsOpenView}
                />
                <div className="iconsInteraction">
                  <div className="likesElements">
                    <CustomButton
                      className="likes"
                      title={
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="currentColor"
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            />
                          </svg>{" "}
                        </>
                      }
                      functionEmit={() => likesPost(_id)}
                    />{" "}
                    {likes.length}
                  </div>
                  <div className="comments">
                    <CustomButton
                      className="message"
                      title={
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="currentColor"
                            className="bi bi-chat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                          </svg>{" "}
                          0
                        </>
                      }
                      // functionEmit={() => msgPost(_id)} // not created!
                    />
                  </div>
                </div>
              </div>
            </SwipeableListItem>
          </SwipeableList>
        </div>
      )}
    </>
  )
}

export default PostElement
