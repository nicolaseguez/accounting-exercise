# Acconting Service


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

* Frotend only shows the last 50 Deposits, neither pagination nor virtualized list was used.
* No linter.
* No unit tests.
* Queue processing time can still be optimized.
