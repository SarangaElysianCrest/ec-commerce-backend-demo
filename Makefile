.PHONY: test dev down prod start-lpreq stop-lpreq local-test local-dev local-prod

clean:
	rm -f data/{proposals,staging,tmp}/*.pdf

dev:
	docker-compose up -d

prod:
	docker-compose -f ./docker-compose.prod.yml up -d

test:
	docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up -d db
	docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up -d redis
	docker-compose -f ./docker-compose.yml -f ./docker-compose.test.yml up app
	
down:
	docker-compose down

start-services:
	docker run --restart always --name ecom-mysql -p 3306:3306 -d -e MYSQL_ROOT_PASSWORD=root mysql:5.7

stop-services:
	docker stop ecom-mysql
	docker rm ecom-mysql

local-test:
	APP_SECRET=test \
	APP_TOKEN_ISSUER=ec-ecom \
	APP_SALT_ROUNDS=10 \
	APP_DATA_FOLDER=./data \
	TYPEORM_CONNECTION=mysql \
	TYPEORM_HOST=ec-ecommerce.cu5j5htfcqrq.ap-southeast-1.rds.amazonaws.com \
	TYPEORM_USERNAME=admin \
	TYPEORM_PASSWORD=ElysianCrest2018! \
	TYPEORM_DATABASE=ecom \
	TYPEORM_PORT=3306 \
	TYPEORM_SYNCHRONIZE=true \
	TYPEORM_LOGGING=false \
	TYPEORM_ENTITIES=dist/db/entity/*.ts \
	TYPEORM_MIGRATIONS=dist/db/migration/*.ts \
	TYPEORM_MIGRATIONS_DIR=dist/db/migration \
	TYPEORM_MIGRATIONS_RUN=true \
	npx nodemon ./src/server.ts
	
local-dev:
	APP_SECRET=test \
	APP_TOKEN_ISSUER=ec-ecom \
	APP_SALT_ROUNDS=10 \
	APP_DATA_FOLDER=./data \
	TYPEORM_CONNECTION=mariadb \
	TYPEORM_HOST=localhost \
	TYPEORM_USERNAME=root \
	TYPEORM_PASSWORD=rootpwd \
	TYPEORM_DATABASE=ecom \
	TYPEORM_PORT=3306 \
	TYPEORM_SYNCHRONIZE=true \
	TYPEORM_LOGGING=false \
	TYPEORM_ENTITIES=src/db/entity/*.ts \
	TYPEORM_MIGRATIONS=src/db/migration/*.ts \
	TYPEORM_MIGRATIONS_DIR=src/db/migration \
	TYPEORM_MIGRATIONS_RUN=true \
	TYPEORM_DROP_SCHEMA=false \
	npm run dev

local-prod:
	npm run build
	APP_SECRET=test \
	APP_TOKEN_ISSUER=ec-ecom \
	APP_SALT_ROUNDS=10 \
	APP_DATA_FOLDER=./data \
	TYPEORM_CONNECTION=mariadb \
	TYPEORM_HOST=localhost \
	TYPEORM_USERNAME=root \
	TYPEORM_PASSWORD=root \
	TYPEORM_DATABASE=ecom \
	TYPEORM_PORT=3306 \
	TYPEORM_SYNCHRONIZE=true \
	TYPEORM_LOGGING=false \
	TYPEORM_ENTITIES=dist/db/entity/*.js \
	TYPEORM_MIGRATIONS=dist/db/migration/*.js \
	TYPEORM_MIGRATIONS_DIR=dist/db/migration \
	TYPEORM_MIGRATIONS_RUN=true \
	npm start
	
remote-dev:
	APP_SECRET=test \
	APP_TOKEN_ISSUER=ec-ecom \
	APP_SALT_ROUNDS=10 \
	APP_DATA_FOLDER=./data \
	TYPEORM_CONNECTION=mysql \
	TYPEORM_HOST=harrowhousedb.cf63ao3evj3j.us-east-1.rds.amazonaws.com \
	TYPEORM_USERNAME=admin \
	TYPEORM_PASSWORD=NovaDB?12345: \
	TYPEORM_DATABASE=harrowhousedb \
	TYPEORM_PORT=3306 \
	TYPEORM_SYNCHRONIZE=true \
	TYPEORM_LOGGING=false \
	TYPEORM_ENTITIES=src/db/entity/*.ts \
	TYPEORM_MIGRATIONS=src/db/migration/*.ts \
	TYPEORM_MIGRATIONS_DIR=src/db/migration \
	TYPEORM_MIGRATIONS_RUN=true \
	TYPEORM_DROP_SCHEMA=false \
	npm run dev

remote-prod:
	npm run build
	APP_SECRET=test \
	APP_TOKEN_ISSUER=ec-ecom \
	APP_SALT_ROUNDS=10 \
	APP_DATA_FOLDER=./data \
	TYPEORM_CONNECTION=mariadb \
	TYPEORM_HOST=ec-ecommerce.cu5j5htfcqrq.ap-southeast-1.rds.amazonaws.com \
	TYPEORM_USERNAME=admin \
	TYPEORM_PASSWORD=ElysianCrest2018! \
	TYPEORM_DATABASE=ecom \
	TYPEORM_PORT=3306 \
	TYPEORM_SYNCHRONIZE=true \
	TYPEORM_LOGGING=false \
	TYPEORM_ENTITIES=dist/db/entity/*.js \
	TYPEORM_MIGRATIONS=dist/db/migration/*.js \
	TYPEORM_MIGRATIONS_DIR=dist/db/migration \
	TYPEORM_MIGRATIONS_RUN=true \
	npm start


local-postgres-exec:
	docker exec -it rushcoder-backend-test-postgres psql -U rushcoderuser rushcoder