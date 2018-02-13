$(document).ready(function(){
var music = document.getElementById('music');
$("#pButton").on("click", function(){
  playAudio();
})
function playAudio() {
  	if (music.paused) {
  		music.play();
  		pButton.className = "glyphicon glyphicon-pause";
  		pButton.className = "pause";
  	} else {
  		music.pause();
  		pButton.className = "glyphicon glyphicon-play";
  		pButton.className = "play";
  	}
  }

var characterDefult=[
  kenobi={
    id: "kenobi",
    name: "Obi-wan Kenobi",
    hp: 120,
    ap: 8,
    cp: 10,
    index:0,
    status:"alive"
  },
  skywalker={
    id: "skywalker",
    name: "Luke Skywalker",
    hp: 100,
    ap: 8,
    cp: 5,
    index:1,
    status:"alive"
  },
  sidious={
    id: "sidious",
    name: "Darth Sidious",
    hp: 140,
    ap: 8,
    cp: 20,
    index:2,
    status:"alive"
  },
  maul={
    id: "maul",
    name: "Darth Maul",
    hp: 150,
    ap: 8,
    cp: 30,
    index:3,
    status:"alive"
  },
  yoda={
    id: "yoda",
    name: "Master Yoda",
    hp: 150,
    ap: 20,
    cp: 25,
    index:4,
    status:"alive"
  }
];
playAudio();
var character=characterDefult.slice(0);
var userChar="";
var enemyDefined="";
var audioSaber= new Audio("./sound/lightsaber.wav");
var audioThunder= new Audio("./sound/thunder.wav");


function start(){
  pButton.className = "play";
  character=[
    kenobi={
      id: "kenobi",
      name: "Obi-wan Kenobi",
      hp: 120,
      ap: 8,
      cp: 10,
      index:0,
      status:"alive"
    },
    skywalker={
      id: "skywalker",
      name: "Luke Skywalker",
      hp: 100,
      ap: 8,
      cp: 5,
      index:1,
      status:"alive"
    },
    sidious={
      id: "sidious",
      name: "Darth Sidious",
      hp: 140,
      ap: 8,
      cp: 20,
      index:2,
      status:"alive"
    },
    maul={
      id: "maul",
      name: "Darth Maul",
      hp: 150,
      ap: 8,
      cp: 30,
      index:3,
      status:"alive"
    },
    yoda={
      id: "yoda",
      name: "Master Yoda",
      hp: 150,
      ap: 20,
      cp: 25,
      index:4,
      status:"alive"
    }
  ];

  userChar="";
  enemyDefined="";
  document.getElementById("msg").innerHTML="PICK YOUR HERO";
  $("#message").empty();
  $("#enemy").empty();
  $("#available").empty();
  $("#chosen").empty();
  $("#buttonArea").empty();
  $("#HPbtn").empty();
  for (var i = 0; i < character.length; i++) {
    createCharacter("#choice", character[i], "red");
  }
  document.getElementById("message").innerHTML="";
  choice(".characterBox");
};


function createCharacter(id, char, color){
  var newID= char.id
  var newDiv = document.createElement("div");
  newDiv.innerHTML = "<p>"+char.name+"</p>";
  $(id).append(newDiv);
  newDiv.setAttribute("status", "alive");
  newDiv.setAttribute("healthPoint", char.hp);
  newDiv.setAttribute("attackPoint", char.ap);
  newDiv.setAttribute("counterPoint", char.cp);
  newDiv.setAttribute("index", char.index);
  newDiv.setAttribute("class", "characterBox");
  newDiv.setAttribute("id", newID);
  document.getElementById(newID).style.color = color;
  document.getElementById(newID).style.borderColor = color;
  var hpBar= document.createElement("p");
  newDiv.appendChild(hpBar);
  hpBar.innerHTML="HP: "+ char.hp;
  hpBar.setAttribute("class", "healthPoint");
  hpBar.setAttribute("id", char.index);
};


function choice(ind){
  $(ind).click(function(){
    var newID = $(this).attr("index");
  $("#choice").empty();
  userChar= newID;
  console.log("heroChosen: "+character[userChar].id);
  if(userChar==2){
  audioThunder.play();
  } else {
  audioSaber.play();
  }
  enemyChoice();
  });
}


function enemyChoice(){
  var deadcount=1;
  for (var i = 0; i < character.length; i++) {
    if (character[i].status=="dead") {
      deadcount+=1;
    };
  };
  if (character.length==deadcount) {
  document.getElementById("message").innerHTML="YOU HAVE WON THE GAME!PRESS RESET TO START NEWGAME!";
  $("#msg").html("<button class='btn bg-primary btn-lg'>Reset</button>");
  $(".bg-primary").click(function(){
    start();
  });
  }
  else{
  console.log(deadcount);
  for (var i = 0; i < character.length; i++) {
    if(character[i].index==userChar){
      createCharacter("#chosen", character[i], "green");
    }else if(character[i].status=="alive"){
      createCharacter("#available", character [i], "red");
    }else{
      console.log("dead: "+character[i].name);
    }

  };
  document.getElementById("msg").innerHTML="PICK AN ENEMY TO ATTACK";
  enemy();
  };
};


function enemy(){
  $(".characterBox").click(function(){
    var newID = $(this).attr("index");
    if(newID==userChar){
    console.log("test"+character[newID].id);
    }else{
    $("#available").empty();
    enemyDefined=newID;
    console.log("EnemyChosen: "+character[enemyDefined].id);
    moveToAttack();
    }
  });
};


function moveToAttack(){
  $("#buttonArea").html("<button id='attackBtn' class='btn bg-danger btn-lg'>ATTACK!</button>");
  $("#HPbtn").html("<button id='hpBtn' class='btn bg-secondary btn-sm'>POTION</button>");
  for (var i = 0; i < character.length; i++) {
    if(character[i].index==enemyDefined){
      createCharacter("#enemy", character[i], "red");
    }else if(character[i].index!=userChar && character[i].index!=enemyDefined && character[i].status=="alive"){
      createCharacter("#available", character[i], "yellow");
    }else{
      console.log("Dead Enemy: "+character[i].id);
    }
  };
  document.getElementById("msg").innerHTML="ATTACK THE ENEMY BY PRESSING ATTACK BUTTON!";
  if(userChar==2 || enemyDefined==2){
  audioThunder.play();
  } else {
  audioSaber.play();
  }
  attackBtn();
};


function attackReady(){
  if(userChar==2 || enemyDefined==2){
  audioThunder.play();
  } else {
  audioSaber.play();
  }
  var enemyCounterPoint=character[enemyDefined].cp;
  var newAttackPoint=character[userChar].ap+10;
  character[userChar].hp-=character[enemyDefined].cp;
  character[userChar].ap=newAttackPoint;
  character[enemyDefined].hp-=character[userChar].ap;
  document.getElementById("message").innerHTML=character[userChar].name+" does "+newAttackPoint+" damage.<br> "+character[enemyDefined].name+" does "+enemyCounterPoint+" counter damage.";
  $("#enemy").empty();
  $("#chosen").empty();
  createCharacter("#enemy", character[enemyDefined], "red");
  createCharacter("#chosen", character[userChar], "green");
  if(character[userChar].hp<=0){
    document.getElementById("msg").innerHTML=character[userChar].name+" is dead please try again!";
    $("#enemy").empty();
    $("#available").empty();
    $("#chosen").empty();
    $("#buttonArea").empty();
    $("#HPbtn").empty();

    start();

  }else if(character[enemyDefined].hp<=0){
    document.getElementById("msg").innerHTML=character[enemyDefined].name+" is dead!! You won! select next enemy!";
    character[enemyDefined].status="dead";
    $("#enemy").empty();
    $("#available").empty();
    $("#buttonArea").empty();
    $("#HPbtn").empty();
    $("#chosen").empty();
    enemyChoice();
  }else{
    document.getElementById("msg").innerHTML="KEEP FIGHTING!";
    console.log(characterDefult);
  }

};


function attackBtn(){
  $("#attackBtn").click(function(){
    attackReady();
  });
  $("#hpBtn").click(function(){
    var newAttackPoint=Math.floor(character[userChar].ap/2);
    character[userChar].hp+=10;
    character[userChar].ap=newAttackPoint;
    console.log(character[userChar].ap);
    $("#enemy").empty();
    $("#chosen").empty();
    createCharacter("#enemy", character[enemyDefined], "red");
    createCharacter("#chosen", character[userChar], "green");
    document.getElementById("message").innerHTML="Your HP increased by 10";
    document.getElementById("msg").innerHTML="Side effect: Your attack point drop in half!";
  });
};

start();

});
