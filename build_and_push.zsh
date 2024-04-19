docker-compose -f ./docker-compose-build.yml down --rmi all
docker-compose -f ./docker-compose-build.yml build

docker push krywion/noteapp-mysql:latest
docker push krywion/noteapp-server:latest
docker push krywion/noteapp-client:latest
