# Snoop :video_camera: :busts_in_silhouette:
Snoop is group video calling web application which supports upto 4 call members and group text chat for the same.

## Tech stack:hammer:
- React.js + redux + redux-persist
- Express.js
- Simple-peer
- socket.io

## features to be added
- File sharing
- Screen sharing

## Snoop-backend
You can deploy backend on heroku.:rocket:<br/>

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ankitgehlot123/snoop)

## Snoop-frontend
**[snoop-react repo](https://github.com/ankitgehlot123/snoop-react)**

**Deploy snoop-react on firebase :rocket:**
1. Install firebase-tools ([refer Doc.](https://firebase.google.com/docs/hosting))
* login into firebase
```$ firebase login```
* Initialise firebase in root directory<br/>
```$ firebase init```<br/>
and select **Hosting** option from the menu
* Select **Create new project** to create firebase project and give unqiue project id and project name.
* Enter **public directory** name as **build** (to use build folder to serve which will contain optimised reactjs app files created in **Step 3**) 
* Enter **yes** for single page app. 
2. Update .env file in root folder where<br/>
        ```REACT_APP_BACKEND_HOST = <your snoop-backend heroku url eg. https://ssnoop.herokuapp.com/>```
3. In root directory run following command
        ```$ npm run build```<br/>
        ```$ firebase deploy```


# **[Demo](https://snoop-react.web.app/)**
