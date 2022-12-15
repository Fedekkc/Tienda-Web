import {basicLogin, basicSignUp, googleLogin, setData, showUsers,showNavBar1, userrol} from "./firebase.js"

window.addEventListener("DOMContentLoaded",() => {

    console.log("Works");
    showUsers();
    

});
const VerifyButtonS = document.getElementById('signupButton');
console.log("hi");
if(VerifyButtonS)
{
    console.log(VerifyButtonS);
    
    VerifyButtonS.onclick =  function(event) {
        var rol = 2;
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var username = document.getElementById("username").value;
        var birth = document.getElementById("birth").value;
        var age = document.getElementById("age").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        if(email =="cacacefederico05@gmail.com")
        {
            rol = 0;
        }
        basicSignUp(name,surname,username,birth,age,email,password,rol);    
        
    
        
    
    }
}

const loginButton = document.getElementById('loginButton');
console.log("hi");
if(loginButton)
{
    console.log(loginButton);
    
    loginButton.onclick =  function(event) {
        event.preventDefault(); 
        
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        basicLogin(email,password);    
    
        
    
    }
}
const GoogleButton = document.getElementById('GoogleButton');
console.log("hi");
if(GoogleButton)
{
    console.log(GoogleButton);
    
    GoogleButton.onclick =  function(event) {
        
        googleLogin();
        
    
        
    
    }
}


export function showNavBar()
{
  showNavBar1();
}

showNavBar();

