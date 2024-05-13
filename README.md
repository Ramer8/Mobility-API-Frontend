### Mobility App

---

#### Mobile device Experience📱

<div style="display: flex; justify-content: space-around; flex-direction:row;">
<center><img style="border-radius:15px; padding:1px; width:70%;"src="./public/mobiledemo.gif"></center>
<center><img style="border-radius:15px; padding:1px; width:35%;"src="./public/phoneview.png"></center>
</div>

---

#### Desktop Experience 💻

<div style="display: flex; justify-content: center; flex-direction:column;"><center><img style="border-radius:15px; padding:1px; width:80%;"src="./public/desktopdemo.gif"></center></div>

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

Thank you very much for your interest in my work. It's the last project, a complete full stack project with Geekshubs Academy of the Full Stack Development Bootcamp 🚀.
This is design of Mobility-API-Backend repository ( the ninth and last project of the course ).

---

### Description

The users hire a service to transport people from one place to another paying a price for it. The Users can register for the application, log in and access it.
The next step is to create the mobility application for car drivers, to complete all the functions of the application. Relationships and migrations already exist in this database.
The registered user can search for a destination, choose between different types of cars and make the trip. A driver responds to the request and picks up the passenger, once the trip is completed, they can rate the driver. Users must complete their profile and choose the method of payment. They can also access their travel history.

---

### Develop

Is a SPA (single-page application) with react router dom to organize the routes.
The frontend is connected to MySQL DB data base created in Mobility API Backend.
We use redux to save token and other variables.

#### First Data Base Structure

---

- Users
- Drivers
- Trips

---

- Cars
- Brands

---

- User
- Drivers
- Roles

---

Thats tables have relation between us.

#### Data Base Diagram

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;"  
src="./public/databaseMobilityApp.png"></center>
</div>

---

#### Develop

##### REST API design for FRONTEND

Create three main tables, User, Driver and Trip. They are related to each other. The fields of the Trip table are: id, user id, car id, driver id, start location, destination, trip date, trip date start and trip date finish.
The User table fields are: user name, email, password, role, phone, payment, address, work address, saved address, documents, message and location.
The Driver table fields are: driver name, email, password, role, phone, score, car id, documents, driver message and location.

---

#### Views

#### Computer Device 💻

##### Register page

`http://localhost:5174/register`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;"  
src="./public/registerDesktop.png"></center>
</div>

---

#### Login page

`http://localhost:5174/login`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;"  
src="./public/loginDesktop.png"></center>
</div>

---

#### Home page

`http://localhost:5174`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;"  
src="./public/homedesktop.png"></center>
</div>

---

#### Editable User profile

`http://localhost:5174/profile`

<div style="display: flex; justify-content: space-around; flex-direction:row;">
<center><img style="border-radius:15px; padding:1px; width:70%;"  
src="./public/profileeditDesktop.png"></center>
<center><img style="border-radius:15px; padding:1px; width:70%;"  
src="./public/profileeditDesktop1.png"></center>
</div>

---

#### Start a Trip

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:40%;"  
src="./public/demotripmobile.gif"></center>
</div>

`http://localhost:5174`

---

#### Super Admin Dashboard

---

<center><img style="border-radius:15px; padding:1px; width:60%;"  
src="./public/managmentSuperadmin.png"></center>
</div>

`http://localhost:5174/managment`

---

### Delete one or more Trips & delete one or more Users (SuperAdmin)

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:60%;"  
src="./public/deleteTrip&users.gif"></center>
</div>

`http://localhost:5174/managment`

---

#### Search Users by name or email (superAdmin)

---

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:60%;"  
src="./public/searchDesktop.gif"></center>
</div>

`http://localhost:5174/managment`

---

#### Mobil device 📱

##### Register page

`http://localhost:5174/register`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:25%;"  
src="./public/registermobile.png"></center>
</div>

---

#### Login page & check inputs errors

`http://localhost:5174/login`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:25%;"  
src="./public/errormobile.png"></center>
</div>

---

#### Payment Design

---

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:25%;"  
src="./public/paymentView.png"></center>
</div>

---

### Design

---

<div style="display: flex; justify-content: space-between; flex-direction:row;">
<center><img style="border-radius:15px; padding:1px; width:50%;"  
src="./public/mapdesign.png"></center>
<center><img style="border-radius:15px; padding:1px; width:50%;"  
src="./public/tripinfo.png"></center>
<center><img style="border-radius:15px; padding:1px; width:50%;"  
src="./public/paymentView.png"></center>
</div>

---

The whole project is designed with CSS without external libraries except the error managment external library.
It is responsive on mobile, tablet or desktop and is very easy to configure in Dark 🌘 and Light ☀️ mode.

</div>

---

#### App Deployed ⚙️

<ol>

<li> Clone Repo

`npm install`

</li>

<li>

Launch the project in your local device:

`npm run dev`

</li>

</ol>

<ol>

### Enviroment variables 🔑

The app need google maps api key to work. Attach file `.env.example`

`VITE_API_URL = http://localhost:XXXX/`

`VITE_GOOGLE_MAPS_API_KEY=XXXX`

</ol>

<li>Then in localhost:PORT, will be launched the application, and you will be on the landing page (Home).

</li>

---

### Libraries used

I decided to use google maps plataform libraries to get localization and routes.

#### Google APIs Node.js Client

`https://www.npmjs.com/package/googleapis`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;"  
src="./public/googleAPILibrary.png"></center>
</div>

---

I choose React-Toasty to show error messages

#### React-Toastify

`https://www.npmjs.com/package/react-toastify`

<div style="display: flex; justify-content: center; flex-direction:column;">
<center><img style="border-radius:15px; padding:1px; width:80%;" src="./public/react-toastify.png"></center>
</div>

---

### Next steps ⎘

Create Driver mobility app to pick up a trip from a user, edit driver profile, send a message to the passenger and monitor the benefits obtained from work.
Continue to build components, buttons and inputs from the respective endpoints created in the backend and think about future functionality.
Refactoring and testing.
Add users & drivers image to database.

---

## Contact

<div style="display: flex; justify-content: space-between; flex-direction:row;">
<center><a href = "mailto:ramirolpoblete@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a><center><a href="https://www.linkedin.com/in/ramiropoblete/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a><center><a href = "https://github.com/Ramer8"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a></center>
</div>

</p>
