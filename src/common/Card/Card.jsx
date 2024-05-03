import "./Card.css"

const Card = ({
  name,
  email,
  id,
  followers,
  following,
  usefullDataToken,
  setUsefullDataToken,
}) => {
  const idLogged = usefullDataToken.tokenData.userId
  return (
    <div>
      <section className="main">
        <div className="profile-card">
          <div className="image">
            <img
              src="./src/images/profile.jpg"
              alt=""
              className="profile-pic"
            />
          </div>
          <div className="data">
            <h2>{name}</h2>
          </div>
          <div className="row">
            <div className="info">
              <h3>Following</h3>
              <span>{following.length}</span>
            </div>
            <div className="info">
              <h3>Followers</h3>
              <span>{followers.length}</span>
            </div>
            <div className="info">
              <h3>Posts</h3>
              <span>0</span>
            </div>
          </div>
          <div className="buttons">
            <a href="#" className="btn">
              Message
            </a>
            {!(id === idLogged) ? (
              <a href="#" className="btn">
                Follow Me
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Card
