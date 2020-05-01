# Acconting Service

## Installing and Running

There a `.nvmrc` file, so if you have **nvm** installed on your system, go to `project/folder/backend` and just run:

> $ nvm use

This will set node the the correct version. After that run:

> $ npm install

To install all the necessary dependencies.

Note: This project uses **worker threads** and was created using **node v12.x** but also tested using **node 10.5.0**.

## Start

```
$ cd project/folder/backend
$ npm start
```

## Test

There is a small utility that will trigger transactions for testing purposes.

```
$ cd project/folder/backend
$ node test.js --transactions=1000
```

Then open your browser of choice and enter `http://localhost:3000`. **Note**:  I didn't use any type of configuration or environment variables, so the port is harcoded.

While the script is running hit the refresh endpoint on the frontend client to see new deposits. At the same time there is an error log endpoint that can be hit to check for `REJECTED` operations.

```
http://localhost:3000/api/error-log
```


### Considerations

Considering the scope of time, I wasn't able to do some things.

* I used an older version of RxJS just as a convenience.
* Frotend only shows the last 50 Deposits, neither pagination nor virtualized list was used.
* No linter.
* No unit tests.
* Queue processing time can still be optimized.
