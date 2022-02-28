#!/bin/bash

MYSQL_NAME=ecommerce-mysql
MYSQL_IMAGE=mysql:5.7
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=root

#REDIS_NAME=admin-core-redis
#REDIS_IMAGE=redis:6.0
#REDIS_PORT=6379

function start {
  docker run --restart always --name ${MYSQL_NAME} -p ${MYSQL_PORT}:3306 -d -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} ${MYSQL_IMAGE}
#  docker run --name ${REDIS_NAME} -p ${REDIS_PORT}:6379 -d ${REDIS_IMAGE}
}

function stop {
  docker stop ${MYSQL_NAME}
  docker rm ${MYSQL_NAME}
#  docker stop ${REDIS_NAME}
#  docker rm ${REDIS_NAME}
}

if [ "$1" == "start" ]; then
  start
elif [ "$1" == "stop" ]; then
  stop
else
  echo "commands: start, stop"
fi