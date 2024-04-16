docker compose -f docker-compose-production.yml down --rmi all

docker pull krywion/noteapp-mysql:latest
docker pull krywion/noteapp-server:latest
docker pull krywion/noteapp-client:latest

docker compose -f docker-compose-production.yml up -d
