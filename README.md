# LogToApi

This is a package that helps you send logs from your application to an API server.

The application can be used from any platform (Vanilla Js, React Js, Vue Js, Angular etc) all you need to do is to provide and endpoint that accept `POST` api connection

### How to use this package

1. Install the log-to-api package

    using NPM

    ``` bash
    npm install log-to-api
    ```
  
    using yarn

    ``` bash
    yarn add log-to-api
    ```
  
2. Import the log-to-api package

  ``` bash
  import LogToApi from "log-to-api";
  ```

3. Initiate an instance of the log-to-api class using the following:

* url - (required) eg: `https://some-api.com/path`
* httpHeaders - (optional) eg `{ 'X-Custom-Header': 'value' }`
* defaultMeta - (optional) eg: `{ app: 'testApp' }`

  ``` bash
  const url = "https://some-api.com/path";
  const httpHeaders = { 
    'X-Custom-Header': 'value' 
  };
  const defaultMeta = {
    app: 'testApp'
  }

  const logToApiOptions = {
    url, 
    httpHeaders,
    defaultMeta
  }
    
  const logToApi = new LogToApi(logToApiOptions);
  ```

4. Send your logs to the backend using any of the following methods:

  ```bash
  await logToApi.debug('Test debug message');
  await logToApi.info('Test info message');
  await logToApi.warning('Test warning message');
  await logToApi.error('Test error message');
  await logToApi.critical('Test critical message');
  ```
