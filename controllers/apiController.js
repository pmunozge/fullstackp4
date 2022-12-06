const { rooms } = require('../models/RoomData')



function getSalas(request, response) {
    
   
    response.json(rooms);

  }

function joinRoom(request, response){

    const { user } = request.params;
    const { room } = request.params;

    if(rooms[room]['player1']=="")
        rooms[room]['player1']=user;
        else  if(rooms[room]['player2']=="")
            rooms[room]['player2']=user;
    
    
    //room[room].setPlayer1(player)

    response.json(rooms);
}


function leaveRoom(request,response){
    const { user } = request.params;
    const { room } = request.params;

    if(rooms[room]['player1']=="user")
    rooms[room]['player1']="";
    else  if(rooms[room]['player2']=="user")
        rooms[room]['player2']="";




}
  
  exports.getSalas = getSalas;
  exports.joinRoom = joinRoom;