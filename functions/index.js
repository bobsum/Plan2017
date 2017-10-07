const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

//todo måske skal det køre på at en speder bliver fri i stedet for
exports.roomFree = functions.database.ref('/rooms/{room}/isFree').onUpdate(event => {
  if(!event.data.val()) {
    return Promise.resolve();
  }
  return updateQueues();
});

exports.scoutArrived = functions.database.ref('/scouts/{scout}/arrived').onUpdate(event => {
  if (!event.data.val()) {
    return Promise.resolve();
  }

  return updateQueues();
});

function updateQueues() {
  return Promise.all([findAvailableRooms(), findAvailableScouts()])
    .then(v => distributeScouts(v[0], v[1]));
}

function distributeScouts(rooms, scouts) {
  var promises = [];
  rooms.forEach(room => {
    console.log('scouts', scouts.length);
    var take = room.val().numberOfScouts;
    var available = scouts.filter(s => !(s.val().rooms || []).includes(room.key));

    if(available.length < take) {
      console.log('not enough available');
      return;
    }

    promises.push(room.ref.update({ isFree: false }));

    var selected = available.slice(0, take);

    selected.forEach(s => {
      var index = scouts.indexOf(s);
      if (index > -1){
        scouts.splice(index, 1);
      }

      var rooms = s.val().rooms || [];
      rooms.push(room.key);
      promises.push(s.ref.update({
        currentRoom: room.key,
        rooms: rooms
      }));
    });
  });
  return Promise.all(promises);
}

function findAvailableRooms() {
  return admin.database().ref('/rooms')
  .orderByChild('isFree')
  .equalTo(true)
  .once('value')
  .then(rooms => {
    var available = [];
    rooms.forEach(r => {
      available.push(r)
    });

    available.sort((a, b) => b.val().numberOfScouts - a.val().numberOfScouts);

    console.log(available.map(a => a.val()));

    return available;
  });
}

function findAvailableScouts() {
  return admin.database().ref('/scouts')
    .orderByChild('arrived')
    .equalTo(true)
    .once('value')
    .then(scouts => {
      available = [];
      scouts.forEach(s => {
        var scout = s.val();
        if(!scout.currentRoom) {
          available.push(s);
        }
      });

      available.sort((a, b) => (a.val().rooms || []).length - (b.val().rooms || []).length);

      console.log(available.map(a => a.val()));

      return available;
    });
}
