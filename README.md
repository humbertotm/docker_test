# Running the app

To run this app, make sure you have installed `Node >= v8.11.x`, `NPM`, and `Docker`.

To run it, navigate to the project's root directory, and install all packages with:

```
$ npm install
```
Once the packages have been installed, navigate to `/src` and run the app by executing the following command:

**NOTE:** Before running the app, build the required Docker images. See the following section **Building the required images**.

```
$ node app.js
```

# Building the required images

**Javascript image:**
```
$ docker pull humbertotm/javascript_compiler
```

**Java image:**
```
$ docker pull eso31/junitimage
```

**Ruby image:**
```
$ docker pull jxjxjxm/rubyimage
```

Now you are all set to try it out.

# Taking it for a test drive...

To try it out, you will find the folder `testcode` in the root directory of the project. In this folder, you will find three different files which will serve as test input for the app. Use your favorite tool to simulate HTTP requests (Postman, for example), and make a `POST` request to the following url: `http://localhost:3000/compile`.

The body of the request should simulate data retrieved from a form with the following fields, and respective values:

**Fieldname:** `codefile`

**Type:** `File`

**Value:** Any of the files in the `testcode` folder.





**Fieldname:** `langid`

**Type:** `Text`

**Value:** The matching value for the language to test.



### Language Ids


**Javascript:** 0

**Java:** 1

**Ruby:** 2
