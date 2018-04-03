// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBpQLnPZVyeS6-AGaxCMUYZ_sWKE5CAH_c",
    authDomain: "ng-fitness-tracker-9e9db.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-9e9db.firebaseio.com",
    projectId: "ng-fitness-tracker-9e9db",
    storageBucket: "ng-fitness-tracker-9e9db.appspot.com",
    messagingSenderId: "1045244033467"
  }
};
