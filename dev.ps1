$env:APP_SECRET = 'test'; 
$env:APP_TOKEN_ISSUER = 'ec-ecom'; 
$env:APP_SALT_ROUNDS = '10'; 
$env:APP_DATA_FOLDER = './data'; 
$env:TYPEORM_CONNECTION = 'mysql'; 
$env:TYPEORM_HOST = 'harrowhousedb.cf63ao3evj3j.us-east-1.rds.amazonaws.com'; 
$env:TYPEORM_USERNAME = 'admin'; 
$env:TYPEORM_PASSWORD = 'NovaDB?12345:'; 
$env:TYPEORM_DATABASE = 'harrowhousedb'; 
$env:TYPEORM_PORT = '3306'; 
$env:TYPEORM_SYNCHRONIZE = 'true'; 
$env:TYPEORM_LOGGING = 'false'; 
$env:TYPEORM_ENTITIES = 'src/db/entity/*.ts'; 
$env:TYPEORM_MIGRATIONS = 'src/db/migration/*.ts'; 
$env:TYPEORM_MIGRATIONS_DIR = 'src/db/migration'; 
$env:TYPEORM_MIGRATIONS_RUN = 'true'; 
$env:TYPEORM_DROP_SCHEMA = 'false'; 
npx nodemon ./src/server.ts