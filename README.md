# Vi Backend Challenge

## Running project locally

- run "npm install" in root folder
- run "npm start" in root folder
- To list actors that played multiple chars, inside postman or browser, run make a get request to "http://localhost:3001/actors/list/multiple_roles?studio=Marvel+Studio"
- 
- To list all actors that played chars, inside postman or browser, run make a get request to "http://localhost:3001/actors/list/?studio=Marvel+Studio"
- 
Obs: 3001 is the default port
If you want to query another studio, change Marvel+Studio for the word that you want

## Testing with docker

You must have docker installed
To build the app using docker, use the follow commands

- In the root folder, run "docker build ."
- run "docker image ls" to list all the built images, and select the IMAGE ID the image previous built
- run "docker run --publish 3001:3001 --env API_KEY={YOUR API KEY} {IMAGE ID}

After these commands, the container will  start and you can use the endpoints in Testing Endpoints locally section to test the application