
ionic cordova platform remove android
ionic cordova platform add android

ionic cordova plugin add cordova-plugin-camera
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"

ionic cordova build android --prod --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Google\ Drive/IT/my-release-key.jks /Users/sg0218817/Private/IT/course-ionic/Y-AwesomePlaces/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  my-alias
~/Library/Android/sdk/build-tools/27.0.3/zipalign -f -v 4 /Users/sg0218817/Private/IT/course-ionic/Y-AwesomePlaces/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ~/Google\ Drive/Apps/AwesomePlaces.apk
