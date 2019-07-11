# This app has a Flask REST api to connect back-end and front-end

### Here, you can see the documentation for the API

*  Endpoints

obs: parameters are from request body (json)

**/tasks**

| Method |     Description             |  Parameters  |
| ------ | --------------------------- | ------------ |
|  GET   |  List all the active tasks  |              |
|  POST  |  Create a new task   | *title*, *description*(optional), *status*(optional)  |


**/task/\<id:integer\>**

| Method |     Description      |  Parameters  | 
| ------ | -------------------- | ------------ |
| GET    |  Get information from a specific task  | *id*(on url)  |
| PATCH  |  Update information from a specific task  | *id*(on url), *title*(optional), *status*(optional)  |
| DELETE |  *Soft* delete a specific task | *id*(on url)  |


**/tasks/done**

| Method |     Description               |  Parameters  |
| ------ | ----------------------------- | ------------ |
|  GET   |  List all the finished tasks  |              |


**/tasks/pending**

| Method |     Description                       |  Parameters  |
| ------ | ------------------------------------- | ------------ |
|  GET   |  List all the **not** finished tasks  |              |
