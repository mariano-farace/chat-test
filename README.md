<div id="top"></div>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/mariano-farace/)


<!-- PROJECT LOGO -->
<br />
<div align="center">


<h3 align="center">Chat-app</h3>

  <p align="center">
    A realtime Chat app with rooms
    <br />
    <a href="https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App"><strong>Explore the docs »</strong></a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


![Chat-app](client/public/Screenshot.png)

This is a Chat-App made as part of the IT-Academy Bootcamp syllabus. A user can sign-up via email and password, or login with it's google account. Once authenticated, you can create or join rooms to chat with other people.  


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With


* Node.js
* Express
* MongoDB
* Socket.io
* React
* JWT
* GoogleAuth

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The app has independent client and server 

### Prerequisites

* Clone the repo
   ```sh
   git clone https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App
   ```

### Server Installation

1. Head to the [server](https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App/tree/main/server) folder

2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename  `template.env` to `.env`
   
4. Enter your googleAuth API credentials in `.env` without quotes
   ```js
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID;
   GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
   ```
5. If you want you can replace the mongoDB URI
   ```js
    DB_URI=YOUR_DB_URI
   ```   
5. Run the server. Will run on port 5000
   ```sh
   npm start
   ```

### Client Installation

1. Head to the [client](https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App/tree/main/client) folder

2. Install NPM packages
   ```sh
   npm install
   ```

3. Run the client. Will run on port 3000
   ```sh
   npm start
   ```     


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Mariano Farace - mariano_farace@hotmail.com

Project Link: [https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App](https://github.com/mariano-farace/SPRINT5-ITAcademey-Chat-App)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
