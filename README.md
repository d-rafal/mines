docker compose -f ./docker-compose.prod.yml up -d
docker compose -f ./docker-compose.prod.yml up -d --build
docker compose -f ./docker-compose.prod.yml logs -f server
