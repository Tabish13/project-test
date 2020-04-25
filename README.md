# Project-Test
REST API for football team data

### To run the application in dev mode 
> npm run dev

Above command will run the app with package.json dev script "nodemon --watch 'src/**/*' --exec ts-node src/bin/www.ts"
Where nodemon --watch help to restart any changes in the src folder.
 --exec ts-node src/bin/www.ts start the server for dev purpose without building the ts files.

### To build the application run the below command:
> npm run build

### To run the build app from dist folder run below command
> npm run start


### *src/Tools/copyAsset*
Tool that can be used to copy the static content which are needed from the src to dist.
Get run while running running the npm run build command

## Available Endpoints:

*Get all team:*
```
curl --location --request GET 'http://localhost:8080/teams/'
```

*Get team based on name:*
```
curl --location --request GET 'http://localhost:8080/teams/{team_name}'
```


*Insert API CURL Request:*
``` 
curl --location --request POST 'http://localhost:8080/teams/' \
--header 'Content-Type: application/json' \
--data-raw '[{
	"name":"Liverpool",
	"img":"url"
}]'
```

*Update API CURL Request:*
```
curl --location --request PUT 'http://localhost:8080/teams/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name":"Liverpool",
	"img":"url"
}'
```
