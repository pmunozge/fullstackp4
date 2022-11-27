localStorage.removeItem("mycolor");
var user = JSON.parse(localStorage.getItem('User'));
console.log('User:'+user);
if(user==null ) {window.alert("No se puede acceder directamente");window.location.href = "http://localhost:3000/";}
if(user.room1==false && user.room2==false & user.room3==false) {window.alert("No se puede acceder sin sala");window.location.href = "http://localhost:3000/game-app";}
let room="";
if(user.room1==true){room="room1"};
if(user.room2==true){room="room2"};
if(user.room3==true){room="room3"};

const webSocket = new WebSocket('ws://localhost:443/ws/?room='+room+'&username='+user.username);
let el;
function fade(element) {
var op = 1;  // initial opacity
var timer = setInterval(function () {
if (op <= 0.1){
clearInterval(timer);
element.style.display = 'none';
}
element.style.opacity = op;
element.style.filter = 'alpha(opacity=' + op * 100 + ")";
op -= op * 0.1;
}, 100);
}
function unfade(element) {
var op = 0.1;  // initial opacity
element.style.display = 'block';
var timer = setInterval(function () {
if (op >= 1){
clearInterval(timer);
}
element.style.opacity = op;
element.style.filter = 'alpha(opacity=' + op * 100 + ")";
op += op * 0.1;
}, 100);
}
webSocket.onmessage = (event) => {
const data = JSON.parse(event.data);
if (data.type == 'message') {
el = document.getElementById('time');
el.innerHTML = data.message;
console.log(data);
if (typeof data.yourcolor !== 'undefined') {
  console.log(localStorage.getItem("mycolor"));
  if (localStorage.getItem("mycolor")==null){
    console.log(localStorage.getItem("mycolor"));
    localStorage.setItem("mycolor", data.yourcolor);
    console.log(localStorage.getItem("mycolor"));
  }
}
}
if (data.type == 'movement') {
  $("#"+data.position).css('background-color','hsl(+'+data.color+',50%,50%)');
  $("#"+data.position).addClass(''+data.color+'');
  $("#"+data.position).css("cursor", "not-allowed");
  $("#"+data.position).css("pointer-events", "none");
  console.log(data.color);
  console.log(localStorage.getItem("mycolor"));
  if (data.color==localStorage.getItem("mycolor")){
  if ($('.'+data.color).length>12)
    {
      
      $(".canvas").css("cursor", "not-allowed");
      $(".canvas").css("pointer-events", "none");
      window.alert("You Won");
    }
  document.getElementById("mycounter").innerHTML='My score: '+$('.'+data.color).length;
  }
  else {
  if ($('.'+data.color).length>12)
    {
      $(".canvas").css("cursor", "not-allowed");
      $(".canvas").css("pointer-events", "none");
      window.alert("Your Opponent Won");
    }
  document.getElementById("oponentcounter").innerHTML='Oponent score: '+$('.'+data.color).length;
  }

  
}
};
$(function() {
$(".canvas").on("click", makeMove);
});
function makeMove(e) {
  
 const messageBody = { type: 'movement', position: $(this).attr('id'),"room":room };
  webSocket.send(JSON.stringify(messageBody));

  console.log("entro");
};