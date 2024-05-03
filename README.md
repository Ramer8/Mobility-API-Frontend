### Social Media Frontend

---

#### Mobil device Experience📱

<img src="./public/mobileDemo.gif"/>

---

#### Desktop Experience 💻

<img src="./public/pcRegister.gif"/>

---

[![GITHUB]][github-url][![DOCKER]][docker-url][![Mongo][MongoDB]][MongoDB-url][![Node][Node.JS]][Node.JS-url][![Express][Express.js]][Express.js-url]![REACT]![JAVASCRIPT]<a href="https://developer.mozilla.org/es/docs/Web/CSS"><img src= "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>[![JWT]][JWT-url]

[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/es
[Node.JS]: https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white
[Node.JS-url]: https://nextjs.org/
[MYSQL]: https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white
[MYSQL-url]: https://www.mysql.com/
[GITHUB]: https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://www.github.com/
[GIT]: https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[LINKEDIN]: https://img.shields.io/badge/linkedin-0274B3?style=for-the-badge&logo=linkedin&logoColor=white
[LINKEDIN-url]: https://www.linkedin.com/
[JS]: https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black
[js-url]: https://developer.mozilla.org/es/docs/Web/JavaScript
[DOCKER]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[sequelize-url]: https://www.sequelize.org/
[gmail-url]: https://www.gmail.com/
[JWT]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/

</a>

[JAVASCRIPT]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[REACT]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[MYSQL]: https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white
[MYSQL-url]: https://www.mysql.com/
[GITHUB]: https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://www.github.com/
[GIT]: https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[DOCKER]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/

Very thanks for interest in this new project. It's the seventh project with Geekshubs Academy of the Full Stack Development Bootcamp 🚀.
This is design of Social Media Backend ( the fifth project of the course ).

---

### Description

The project consists of creating a social network where users can register, access the network and interact with each other.
Users can also follow or unfollow other users, write comments on their profiles or posts.

---

### Develop

Is a SPA (single-page application) with react router dom to organize the routes.
The frontend is already connected to mongoDB data base created in Social Media Backend.
The data showed or the new users create are created in existing mongoDB data base.

#### First Data Base Structure

- Users
- Posts

  Thats tables have relation between us.

---

#### Develop

##### REST API design for FRONTEND

Create two main tables, User and Post. They are related to each other. The fields of the Post table are: post id, user id, comments, name, and likes.
The User table fields are: name, email, password, role, following, and followers.

---

#### Views

#### Computer Device 💻

##### Register page

`http://localhost:5174/register`

<img src="./public/register.png"/>

---

#### Login page

`http://localhost:5174/login`

<img src="./public/login.png"/>

---

#### Home page

`http://localhost:5174`

<img src="./public/home.png"/>

---

#### Editable User profile

<img src="./public/editableProfile.png"/>

`http://localhost:5174/profile` or `http://localhost:5174`

---

#### User Post List

<img src="./public/posts.png" />

`http://localhost:5174`

---

#### New Post

<img src="./public/newPost.png" >

`http://localhost:5174`

---

#### Delete Post

<img src="./public/deletePost.png" />

`http://localhost:5174`

---

#### Edit Post

<img src="./public/editPost.png"/>

`http://localhost:5174`

---

#### Like Post

<img src="./public/like.png"/>

`http://localhost:5174`

---

#### Post Detail

<img src="./public/postDetail.png"/>

`http://localhost:5174`

---

#### Super Admin Dashboard

<img src="./public/SuperAdminDashboard.png"/>

`http://localhost:5174/managment`

---

#### Search User & Delete Post

<img src="./public/search&delete.gif"/>

`http://localhost:5174/managment`

---

#### Search User & Delete severals

<img src="./public/search&deleteUsers.gif"/>

`http://localhost:5174/managment`

---

#### Mobil device 📱

##### Register page

`http://localhost:5174/register`

<img src="./public/registerMobile.png"/>

---

#### Login page & check inputs errors

`http://localhost:5174/login`

<img src="./public/errors.png"/>

---

#### Home page

---

### Design

The whole project is designed with CSS without external libraries.
The design is fully responsive and with Dark or Light mode.

#### Dark 🌘 and Light ☀️ Mode

`http://localhost:5174`

<img src="./public/darkMode.png"/>
<img src="./public/lightMode.png"/>

</div>

---

#### App Depyoyed ⚙️

`https://main.d1j6r9oao59ffd.amplifyapp.com/login`

<ol>

<li> Clone Repo

`npm install`

</li>

<li>

Launch the project in your local device:

`npm run dev`

</li>

</ol>

<li>Then in localhost:PORT, will be launched the application, and you will be on the landing page (Home).

</li>

---

### Libraries used

I decided to use these libraries to get a good user experience in a short development time.

#### React-modal

`https://www.npmjs.com/package/react-modal`

<img src="./public/react-modal.png"/>

---

#### React-swipeable-list

`https://www.npmjs.com/package/react-swipeable-list`

<img src="./public/react-swipeable-list.png"/>

---

#### React-Toastify

`https://www.npmjs.com/package/react-toastify`

<img src="./public/react-toastify.png"/>

---

### Next steps ⎘

Continue to build components, buttons and inputs from the respective endpoints created in the backend and think about future functionality.
Refactoring and testing.
Add update image to database, pagination.

---

## Contact

<a href = "mailto:ramirolpoblete@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/ramiropoblete/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href = "https://github.com/Ramer8"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>

</p>
