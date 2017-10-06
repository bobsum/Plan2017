const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//todo måske skal det køre på at en speder bliver fri i stedet for
exports.roomFree = functions.database.ref('/rooms/{room}/isFree').onUpdate(event => {
  if(!event.data.val()) {
    return Promise.resolve();
  }
  return addScoutsToRoom(event.data.ref.parent);
});

exports.scoutArrived = functions.database.ref('/scouts/{scout}/arrived').onUpdate(event => {
  if (!event.data.val()) {
    return Promise.resolve();
  }

  return admin.database().ref('/rooms')
    .orderByChild('isFree')
    .equalTo(true)
    .limitToFirst(1)
    .once('value')
    .then(rooms => {
      var room;
      if(!rooms.forEach(r => {
        room = r;
        return true;
      })) {
        return Promise.resolve();
      };

      return addScoutsToRoom(room.ref);
    })
});

function findScouts(roomKey) {
  return admin.database().ref('/scouts')
    .orderByChild('arrived')
    .equalTo(true)
    .once('value')
    .then(scouts => {
      free = [];
      scouts.forEach(s => {
        var scout = s.val();
        if(!scout.currentRoom && !(scout.rooms || []).includes(roomKey)) {
          free.push(s);
        }
      });

      free.sort((a, b) => (a.val().rooms || []).length - (b.val().rooms || []).length);

      return free;
    });
}

function addScoutsToRoom(roomRef) {
  var roomKey = roomRef.key;
  var tP = roomRef.child('numberOfScouts').once('value');
  var sP = findScouts(roomKey);

  return Promise.all([tP, sP]).then(v => {
    var take = v[0].val();
    var scouts = v[1];

    if(scouts.length < take) {
      return Promise.resolve();
    }

    var selectedScouts = scouts.slice(0, take);

    var uPs = selectedScouts.map(s => {
      var rooms = s.val().rooms || [];
      rooms.push(roomKey);
      return s.ref.update({
        currentRoom: roomKey,
        rooms: rooms
      })
    });
    uPs.push(roomRef.update({ isFree: false }));
    return Promise.all(uPs);
  });
}
