# This app has a Flask REST api to connect back-end and front-end

### Here, you can see the documentation for the API

*  Endpoints

obs: parameters are from request body (json)

**/tasks**

| Method |     Description      |  Parameters  |
| ------ | -------------------- | ------------ |
|  GET   |  List all the tasks  |              |
|  POST  |  Create a new task   | *title*, *description*(optional), *status*(optional)  |


**/task/\<id:integer\>**

| Method |     Description      |  Parameters  | 
| ------ | -------------------- | ------------ |
| GET    |  Get information from a specific task  | *id*(on url)  |
| PATCH  |  Update information from a specific task  | *id*(on url), *title*(optional), *description*(optional), *status*(optional)  |
| DELETE |  Delete a specific task | *id*(on url)  |
