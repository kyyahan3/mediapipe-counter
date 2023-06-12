## Introduction


## Done
### Front-end
#### React + antd

1. Home: the body of the Home page, with the function of uploading video, select motion category, and start counting button. All the functions are defined in `Home.js`. This is because React does not support returning values in our traditional way and I need 2 boolean values to determine the status (color) of the counting button -- `select` and `upload`.
2. Head: the heading with the project name and 2 pages tabs
3. foot: the author name and other info
4. App: the overall layout

### Program
The `JumpRope.py` works

### Back-end
#### Django


## To-Do
- overwrite the previous video and display the processed video
- Log in 
- User database
- display history (maybe not store the whole video at this stage)
- add motion effect when the user click the video image (maybe on handleVideoClick)
- deal with multi click

## Logs
### May 21st:
#### install
- docker:
    - start the docker: `docker start mediapipe_app`
    - enter the doker: `docker exec -it mediapipe_app /bin/bash`
    - enter the root/server: `cd root/server`
    - run server: `run: python3 manage.py runserver 0.0.0.0:8081`

    copy the local config (pip and code) to docker
    created a virtual environment in the docker called venv

    activate: `source venv/bin/activate`

- django:

    prep:
    create the `server`: django-admin startproject server
    create the `app`: python3 manage.py startapp
    run: python3 manage.py runserver 0.0.0.0:8081
    
#### problem solved
- Home disable clicking the counting button when either no video is uploaded or no motion category is selected


### June 11st:
#### how to start the project:
- go to the web directoy and enter `npm start`
- got to the server directoy (activate your virtual environment if applicable. Mine is `mediapipe`) and enter `python3 manage.py runserver 0.0.0.0:8081` for local server.
- docker:
    - start the docker: `docker start mediapipe_app`
    - enter the doker: `docker exec -it mediapipe_app /bin/bash`
    - enter the root/server: `cd root/server`
    - run server: `python3 manage.py runserver 0.0.0.0:8081`

    - exit docker: `exit`
    - stop docker: `docker stop mediapipe_app`
    - check docker list: `docker ps -a`

#### new feature
- add a count output text frame
- add the video player button and display pop-up, but cannot paly the video
    - maybe need to deploy on cloud?
- add the get_processed_video api. note: the processed video will be stored in `/server/app`

