## create image

docker build -f .\app.dockerfile -t hdprod/moviematcher:v1 hdprod/moviematcher:latest .

## create container

## run container, remove after exit
docker run --rm -p 5000:5000 --name mm hdprod/moviematcher 

## run container, remove after exit
docker run -d -p 5000:5000 --name mm hdprod/moviematcher 


# docker compose

## build 
docker-compose -f dockercompose build

## build/create network and start composed services
docker-compose -f dockercompose up

## stops and tear down network composed services
docker-compose -f dockercompose down