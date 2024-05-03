import Modal from "react-modal"
import "./PostModal.css"
import { CustomButton } from "../CustomButton/CustomButton"
import { CustomInputTextArea } from "../CustomInputTextArea/CustomInputTextArea"
import { useState } from "react"
const PostModal = ({
  thePost,
  newPost,
  editMyPost,
  inputHandler,
  modalIsOpen,
  setModalIsOpen,
  modalIsOpenView,
  setModalIsOpenView,
}) => {
  const [isShowLikes, setIsShowLikes] = useState(false)
  Modal.setAppElement("#root")

  const showLikes = () => {
    setIsShowLikes(!isShowLikes)
  }
  // function openModal() {
  //   setModalIsOpen(true)
  // }

  function closeModalEdit() {
    setModalIsOpen(false)
    setModalIsOpenView(false)
  }
  function closeModal() {
    setModalIsOpen(false)
  }
  const preEditMyPost = (id) => {
    editMyPost(id)
    closeModal()
  }
  return (
    <div className="postModalContainter">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        {!modalIsOpenView ? (
          <div className="modalEdit">
            <CustomButton
              className={"closeModalButton"}
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              }
              functionEmit={closeModal}
            />
            <div className="bodyPostModal">
              <label className="labelTextArea">Edit your post</label>
              <CustomInputTextArea
                className="textareaNewPost textareaEditPost"
                type={"text"}
                name={"content"} //must be the key name idem like state newPost
                disabled={""}
                value={newPost.content || thePost.content || ""} //mirar para la edicion aqui
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
                  functionEmit={closeModal}
                />
                <CustomButton
                  className={"sendModalButton"}
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-upload"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                    </svg>
                  }
                  functionEmit={() => preEditMyPost(thePost._id)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="modalView">
            <CustomButton
              className={"closeModalButton"}
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              }
              functionEmit={closeModalEdit}
            />
            <div className="bodyPostModal">
              <div className="postView">
                <div className="userNamePostView">{thePost.userId.name}</div>
                <div className="headerPostView">
                  <div className="leftHeaderPostView">
                    <div>Created at:</div>
                    <div> Updated at:</div>
                  </div>
                  <div className="rightHeaderPostView">
                    <div>
                      {new Date(thePost.createdAt)
                        .toLocaleString()
                        .replace("2024", "24")}
                    </div>
                    <div>
                      {thePost.createdAt === thePost.updatedAt ? (
                        ""
                      ) : (
                        <div>
                          {" "}
                          {new Date(thePost.updatedAt)
                            .toLocaleString()
                            .replace("2024", "24")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="contentPostView">{thePost.content}</div>
                <div className="likesPostView">
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
                    functionEmit={() => showLikes()}
                  ></CustomButton>{" "}
                  {thePost.likes.length}
                  {isShowLikes && (
                    <div className="showUsersLikes" onClick={() => showLikes()}>
                      {thePost.userId.name} like this!
                    </div>
                  )}
                </div>
              </div>

              <div className="modalButtons">
                <CustomButton
                  className={"likesModalButtonViews "}
                  title={
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </>
                  }
                  functionEmit={showLikes}
                />
                <CustomButton
                  className={"cancelModalButton cancelModalButtonView "}
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
                  functionEmit={() => closeModalEdit()}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PostModal
