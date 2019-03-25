# course-ionic

## Install

https://ionicframework.com/docs/installation/cli
https://ionicframework.com/docs/components/

npm install -g ionic
ionic start
ionic serve


## Components

- output - ion-img, ion-badg, ion-label, ion-title, ...
- layout - ion-grid, ion-row, ion-col, ion-list, ion-card, ...
- input - ion-button, ion-input, ion-select, ...


## Generate

ionic generate
ionic generate page recipes
ionic generate page recipes/recipe-detail
ionic generate service recipes/recipes


## Lifecycle

- ionViewCanEnter - navigation guard (boolean/Promise) 
- ionViewDidLoad - not fired when cached
- ionViewWillEnter - always fired
- ionViewDidEnter - always fired
- ionViewCanLeave
- ionViewWillLeave 
- ionViewDidLeave 
- ionViewWillUnload - page about to be destroyed


## View hooks - can be used eg. with modals

- willEnter
- didEnter
- willLeave
- didLeave
- willUnload
- onWillDismiss
- onDidDismiss 


## Deploy

- ionic cordova platform add android
- ionic cordova build android --prod --release

- ionic cordova resources 

- Google Drive/IT/my-release-key.jks
- keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

- APK_PATH=...
- OUTPUT_PATH=~/Google\ Drive/Apps/Quotes.apk
- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Google\ Drive/IT/my-release-key.jks $APK_PATH my-alias
- ~/Library/Android/sdk/build-tools/27.0.3/zipalign -f -v 4 $APK_PATH $OUTPUT_PATH


## Google Maps

- npm install @agm/core --save
- https://angular-maps.com/guides/getting-started/


## Native

- https://ionicframework.com/docs/native/geolocation/
- https://ionicframework.com/docs/native/camera/

## Debugging

- http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html
