docker build . -t noteapp-api
docker stop noteaoo-api
docker rm noteapp-api
docker run -d --name=noteapp-api -p 8080:8080 noteapp-api