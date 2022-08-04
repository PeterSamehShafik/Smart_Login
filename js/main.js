//homePage
var homePage= document.getElementById("homePage")

// login content
var login = document.getElementById("login");
var showLoginPage = document.getElementById("showLoginPage");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginBtn = document.getElementById("loginBtn");
var currentAccount;
// functions of login
showLoginPage.addEventListener("click",function(){
    show(login);
    hide(signup);
});
loginBtn.addEventListener("click",loginCheck)

//sign up content
var signup= document.getElementById("signup");
var showSignupPage = document.getElementById("showSignupPage");
var signupName = document.getElementById("signupName");
var signupEmail= document.getElementById("signupEmail");
var signupPassword= document.getElementById("signupPassword");
var signupBtn= document.getElementById("signupBtn");
//functions of sign up
showSignupPage.addEventListener("click",function(){
    show(signup);
    hide(login);
});
signupBtn.addEventListener("click",makeAccount);
//--------------------------------------------------------------//

//data
var accounts;
if(localStorage.getItem("accounts")==null)
{
    accounts=[];
}else{
    accounts=JSON.parse(localStorage.getItem("accounts"));
}

function makeAccount(){
    var accountObj={
        accName:signupName.value,
        accEmail:signupEmail.value,
        accPassword:signupPassword.value
    }
    if(validation() && checkSameEmail()){
        accounts.push(accountObj);
        localStorage.setItem("accounts",JSON.stringify(accounts))
        clearAll();
    }
}

function hide(element){  //add d-none to the element
    element.classList.add("d-none");
}
function show(element){ //remove d-none from the element
    element.classList.remove("d-none");
}
function clearAll(){ // clear the inputs field
    signupName.value="";
    signupEmail.value="";
    signupPassword.value="";
    loginEmail.value="";
    loginPassword="";
}
function validation(){ // validate the email ,the password and the name of the signup page
    var emailVal= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passVal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var nameVal = /^[a-z ,.'-]+$/i;
    var x= 0; // counter to check the 2 validations
    if(emailVal.test(signupEmail.value)){
        x++;
        hide(signupEmail.nextElementSibling);
    }else{
        signupEmail.nextElementSibling.innerHTML="Check the  Email again";
        show(signupEmail.nextElementSibling);
    }
    if(passVal.test(signupPassword.value)){
        hide(signupPassword.nextElementSibling);
        x++;
    }else{
        signupPassword.nextElementSibling.innerHTML=" Passwrod must be more than 8 chars ,at least one number ,at least one special character";
         show(signupPassword.nextElementSibling);
    }
    if(nameVal.test(signupName.value)){
        x++;
        hide(signupName.nextElementSibling);
    }else{
        signupName.nextElementSibling.innerHTML="Name Required";
        show(signupName.nextElementSibling);
    }
    //check if the conditions are true
    if(x==3){
        return true;
    }else{
        return false;
    }
}
function checkSameEmail(){ //check if the email is already exists
    for(var i=0; i<accounts.length;i++){
        if(signupEmail.value== accounts[i].accEmail){
            signupEmail.nextElementSibling.innerHTML="This email already exists";
            show(signupEmail.nextElementSibling);
            return false;
        }
    }
    return true;
}
function loginCheck(){
    var check = false;
    if(localStorage.getItem("accounts")==null)
    {
        alert("there's no accounts yet")
    }else{
        for(var i=0; i<accounts.length;i++){ //find the email
            if(loginEmail.value== accounts[i].accEmail){
                currentAccount=accounts[i];
                hide(loginEmail.nextElementSibling);
                check = true;
                break;
            }else{
                loginEmail.nextElementSibling.innerHTML="Can't find the email."
                show(loginEmail.nextElementSibling)
            }
        }
        //check the password
        if(check)
        {
            if(currentAccount.accPassword ==loginPassword.value){
                goToHomePage(currentAccount); //loged in successful
                clearAll();
            }
            else{
                loginPassword.nextElementSibling.innerHTML="Wrong Password!"
                show(loginPassword.nextElementSibling)
                return false;
            }
        }
    }

    
}
function goToHomePage(currentAccount){
    localStorage.setItem("logedAccount",currentAccount.accName);
    location.href="home.html";
}