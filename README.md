# ES5ALEXA
Alexa App to fetch data from ES5 GW - using SAP CAI

To deploy the node js app to SAP BTP
```
CF LOGIN -a <API END POINT> -o < ORGANISATION> -s <SPACE>
```
.ENV file content will be as follows:
  ```
NODE_ENV=development
userid=<ES5 -- user id>
password=<ES5 -- password>
  ```
