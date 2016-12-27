var ghoma = require('ghoma');
var node = require('homenode-node')(
  {
    id : 'ghoma',
    port : 9876,
    name : 'Ghoma control node'
  }
);

// Start a ghoma control service listening server on this port
ghoma.startServer(4196);

// Register a listener for new plugs
ghoma.onNew = function(plug) {
  console.log('Registerd    ' + plug.remoteAddress+"  "+plug.fullMac.toString('hex'));
  node.addDevice({
    id : plug.id,
    name : 'ghoma switch with id '+plug.id,
    type : 'switch',
    description : 'Ghoma wlan plug with address '+plug.remoteAddress,
    state : plug.state,
    actions : [
      {
        name : 'on',
        description : 'switch on',
        use : on,
      },
      {
        name : 'off',
        description : 'switch off',
        use : off,
      }
    ],
    events : [
      {
        name : 'triggered',
        description : 'Switch was triggered'
      }
    ]
  });
}

function on(device) { ghoma.get(device.id).on(); }
function off(device) { ghoma.get(device.id).off(); }
