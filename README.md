# Documentation

# Install Steps

```
npm install
```

Run offline without authorization

```
sls offline --noAuth

OR

npx sls offline start --noAuth
```

Deploy in AWS
If already have access token then set it to in env

```
export SERVERLESS_ACCESS_KEY=AKGZjh7bXXXXXXXXXXXXXXXXXXXXX
```

OR you have to login in serverless.com and select configuration questions.

```
serverless login
```

```
serverless deploy

OR

npx sls deploy -v
```

For particular function deployment

```
npx sls deploy function -f "attribute"
```

# Set deploy time

```
On Windows (cmd):
set AWS_CLIENT_TIMEOUT=300000
echo %AWS_CLIENT_TIMEOUT% (make sure it has changed)
```

# Delete old lambda functions version

```
npx sls prune -n 10
```

# Step to run with Docker

```
1. docker build -t serverlessDemo .

2. docker run -p 3000:3000 -d serverlessDemo
```

# Step to run without Docker

```
npm start
```

# Migrations steps

https://sequelize.org/master/manual/migrations.html

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

Create Manual migration file

npx sequelize-cli migration:create --name "xyz"
```

### To Run Migration and Seeder for Production Env.

- Set Production details in config.json and .env file

### Run Migration

```
npx sequelize-cli db:migrate

npx sequelize-cli db:migrate --env "production"

npx sequelize-cli db:migrate:undo --name filename.js
```

### Create seed file

```
npx sequelize-cli seed:generate --name user
```

### Add Seed data

```
npx sequelize-cli db:seed:all

npx sequelize-cli db:seed:all --env "production"

npx sequelize-cli db:seed --env "production" --seed 20210102145910-user

npx sequelize-cli db:seed --seed all-data.js
```
### Attribute API
#### All Attributes
```
query {
    attributes {
        id
        name
    }
}
```
### Get Attribute by ID
```
query {
    attributeById(id:1) {
        id
        name
    }
}
```
#### Create Attribute
```
mutation {
    createAttribute(name: "Color", status_id: 1, created_by: 1, created_at: "2022-09-15") {
        id
        name
    }
}
```
#### Update Attribute
```
mutation {
    updateAttribute(id: 1, name: "Color", status_id: 1, updated_by: 1, updated_at: "2022-09-15") {
        id
        name
    }
}
```
#### Delete Attribute
```
mutation {
    deleteAttribute(id:1)
}
```
