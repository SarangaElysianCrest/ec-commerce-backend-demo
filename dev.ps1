$env:APP_SECRET='test'; 
$env:APP_TOKEN_ISSUER='ec-ecom'; 
$env:APP_SALT_ROUNDS='10'; 
$env:APP_DATA_FOLDER='./data'; 
$env:TYPEORM_CONNECTION='mysql'; 
$env:TYPEORM_HOST='localhost'; 
$env:TYPEORM_USERNAME='nodeuser'; 
$env:TYPEORM_PASSWORD='2030'; 
$env:TYPEORM_DATABASE='ecom'; 
$env:TYPEORM_PORT='3306'; 
$env:TYPEORM_SYNCHRONIZE='true'; 
$env:TYPEORM_LOGGING='false'; 
$env:TYPEORM_ENTITIES='src/db/entity/*.ts'; 
$env:TYPEORM_MIGRATIONS='src/db/migration/*.ts'; 
$env:TYPEORM_MIGRATIONS_DIR='src/db/migration'; 
$env:TYPEORM_MIGRATIONS_RUN='true'; 
$env:TYPEORM_DROP_SCHEMA='false'; 
npx nodemon ./src/server.ts