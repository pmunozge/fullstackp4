const { rooms } = require('../models/RoomData')



function getSalas(request, response) {
    
   
    response.json(rooms);

  }

function joinRoom(request, response){

    const { user } = request.params;
    const { room } = request.params;


    rooms[1]['player1']=user;
    
    
    //room[room].setPlayer1(player)

    response.json(rooms);
}
  
  exports.getSalas = getSalas;
  exports.joinRoom = joinRoom;