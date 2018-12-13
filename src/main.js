import Vue from 'vue'
import App from './App.vue'
import store from './store'

var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

// Instantiate the socket client (`io`)
// (for now, you must explicitly pass in the socket.io client when using this library from Node.js)
var io = sailsIOClient(socketIOClient);

// Set some options:
// (you have to specify the host and port of the Sails backend when using this library from Node.js)
io.sails.url = 'http://localhost:1337';
// ...

// Send a GET request to `http://localhost:1337/hello`:
io.socket.get('/room/subToAll', function serverResponded (body, JWR) {
    // body === JWR.body
    console.log('Sails responded with: ', body);
    console.log('with headers: ', JWR.headers);
    console.log('and with status code: ', JWR.statusCode);

});

io.socket.on('NEW_USER', function () {
    console.log('New user !');
});


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
