# Urban Noise

This application is an Urban Noise Visualization of Dublin noise data. The application performs the following operations:

1. Noise data is obtained from the [Sonitus Api](https://data.smartdublin.ie/sonitus-api).
2. This data is stored inside a Firebase Firestored, and retrieved [Optional].
3. The data for each monitor is graphed on a line chart.
4. The line charts are colour coded for different thresholds.
5. The health implications for each threshold are outlined within expandable information boxes.

## Run the App

To get started with Create React App, click [here](#Getting-Started-with-Create-React-App) to access the relavant portion of this document. 

Clone this project with the following command.

```
git clone https://github.com/hamza-mughees/Urban-Noise.git
```

Run the following commands to install the relevant packages and start the application.

```
npm install
npm start
```

Initially, this application will obtain data from the API and visualize it directly. However, if you wish to save this data to Firebase first, you must do the following first:

1. Create a new file in the `src/utils` directory, called `firebase.js`.
2. Add the following code to this file:
```javascript
import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "<api key>",
  authDomain: "<auth domain>",
  projectId: "<project id>",
  storageBucket: "<storage bucket>",
  messagingSenderId: "<messaging sender id>",
  appId: "<app id>",
          
};

export default initializeApp(firebaseConfig);
```
3. Create a Firebase Firestore and replace the fields of the `firebaseConfig` object with the relevant details.
4. Go into the `src/App.jsx` file, comment out line 7 and uncomment line 6.

The above steps should now allow the application to save and retrieve data from Firebase.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
