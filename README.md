## Done
### Front-end
#### React + antd

1. Home: the body of the Home page, with the function of uploading video, select motion category, and start counting button. All the functions are in `Buttons`(Count and Video), but I only called the Count and the rest are defined in the `Home.js`. This is because React does not support returning values in our traditional way and I need 2 boolean values to determine the status( color) of the counting button -- `select` and `upload`.
2. Head: the heading with the project name and 2 pages tabs
3. foot: the author name and other info
4. App: the overall layout

### Program
The `JumpRope.py` works

### Back-end
#### Django


## To-Do
1. Home disable clicking the counting button when either no video is uploaded or no motion category is selected
2. overwrite the previous video and display the processed video
3. Log in 
4. User database
5. display history (maybe not store the whole video at this stage)


## logs
### May 21st:
#### install
- docker:

    enter the doker: `docker exec it mediapipe_app /bin/bash`

    start the docker: `docker start mediapipe_app`

    copy the local config(pip and code) to docker
    created a virtual environment in the docker called venv

    activate: `source venv/bin/activate`

- django:

    prep:
    create the `server`: django-admin startproject server
    run: python3 manage.py runserver 0.0.0.0:8081
    create the `app`: python3 manage.py startapp

#### APIs:

