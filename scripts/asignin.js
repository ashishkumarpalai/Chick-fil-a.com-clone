let loginUserUsername = document.getElementById("username");
let loginUserPassword = document.getElementById("password");
let loginUserButton = document.getElementById("loginBtn");
let userLoginURL="https://cobalt-blue-jaguar-boot.cyclic.app/users"

loginUserButton.addEventListener("click",(e)=>{
  e.preventDefault();
  fetch("./admin.json")
  .then((data)=>{
    return data.json();
  })
  .then((res)=>{
    fetchdata=res;
    adminsignin(res);
    
    console.log(res)
  })
  .catch((error)=>{
    console.log(error)
  })
})
function adminsignin(data){
 
  data.forEach((element) => {
    if(loginUserUsername.value==element.username){
      if(loginUserPassword.value==element.password){
        alert("Wellcome To Quick Bite")
        window.open("./admin.html")
      }else{
        alert("Wrong passsword renter your passsword")
      }
    }else{
      alert("You are not admin")
    }
  });
}