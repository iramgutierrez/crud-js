## CRUD JS

### Prerequisites

* NodeJS
* MongoDB

### Installation

```
npm install
```

```
npm start
```

When the execution is finished, you should have available the following functional routes:

| Route         | Method        | Uses  | Action |
| ------------- |:-------------:| -----:| ------:|
| /tests      | GET | API\TestController@index |Request all tests |
| /tests      | POST | API\TestController@store | Store a test|
| /tests/:id      | GET | API\TestController@show | Request a specific test |
| /tests/:id      | PUT | API\TestController@update | Update a specific test |
| /tests/:id      | DELETE | API\TestController@destroy | Delete a specific test |
