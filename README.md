# weather-watch

API for weather watcher, providers are http://api.weatherstack.com/current and http://api.openweathermap.org/data/2.5/weather (fail over).
- Fail over mechanism is implemented for switching to an active provider when one gone down.
- Mem-cache is used to give better performance and to provide stale data in case all providers are down. 

## Docker Build

You can choose to build with npm or using docker if you have docker installed on your computer

### build it
```
docker build -t weather-watch .
```

### run it

```
docker run -it -p 3000:3000 weather-watch
```

### test it

```
curl http://localhost:3000/api/v1/melbourne
```


## NPM build

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run build
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/api/v1/melbourne` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/melbourne
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
## Lint It

View prettier linter output

```
npm run lint
```

Fix all prettier linter errors

```
npm run lint
```


   
