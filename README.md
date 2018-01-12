# course-ionic

## Install

- npm uninstall -g cordova ionic
- npm install -g cordova ionic
- https://ionicframework.com/getting-started

## Start

- ionic start firstapp --type=ionic-angular
- ionic serve
- ionic generate page Name

## Routing

- Ionic DOES NOT use Angular Router
- a stack of Pages is used (can be Single Stack or Multiple Stacks if tabs are used)

## Lifecycle

- ionViewCanEnter - navigation guard (boolean/Promise) 
- ionViewDidLoad - not fired when cached
- ionViewWillEnter - always fired
- ionViewDidEnter - always fired
- ionViewCanLeave
- ionViewWillLeave 
- ionViewDidLeave 
- ionViewWillUnload - page about to be destroyed 