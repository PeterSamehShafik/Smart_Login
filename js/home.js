var welcomeMSG= document.getElementById("welcomeMSG");
var logout= document.getElementById("logout");

if(localStorage.getItem("logedAccount")==null){
    welcomeMSG.classList.add("text-danger");
    welcomeMSG.innerHTML=`Access denied!`;
}else{
    welcomeMSG.innerHTML=`Welcome back ${localStorage.getItem("logedAccount")}!`
    welcomeMSG.classList.remove("text-danger");
}


logout.addEventListener("click",logoutFunc)

function logoutFunc(){
    location.href="index.html";
    localStorage.removeItem("logedAccount");
}