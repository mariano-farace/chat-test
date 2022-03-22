

const currentUsersList =[
{name: "maria",
room_id: "620c9cc8fadae9ccd813b056",
socket_id: "ple7iemOv1PNgt2RAAAI",
user_id: "620c9cb9fadae9ccd813b053",
},{
room_id: "620c9cc8fadae9ccd813b056",
socket_id: "vPjKW4OynBL7CdN2AAAg",
},{
name: "pepe",
room_id: "620c9cc8fadae9ccd813b056",
socket_id: "Tra9HSS39iQjyOadAAAk",
user_id: "623190b109114947c9c587e0",
}
]

const singleUser = {name: "maria",
room_id: "620c9cc8fadae9ccd813b056",
socket_id: "ple7iemOv1PNgt2RAAAI",
user_id: "620c9cb9fadae9ccd813b053",
}

const emptyUser = {
  room_id: "620c9cc8fadae9ccd813b056",
  socket_id: "vPjKW4OynBL7CdN2AAAg",
  }



  //este esta muy bien, pero lo vas a usar para filtrar por room!!!!
// const returnValue= 
// currentUsersList.map((user) =>
// Object.fromEntries(Object.entries(user).filter(([k, v]) => k == "name" && v !== null )));


let filtrados = currentUsersList.filter((user)=>user.name !==undefined)



