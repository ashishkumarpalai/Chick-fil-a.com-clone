
 // Signup form submit event listener
    
 console.log(userName.value,passWord.value)
 let emAil=document.getElementById("gmail")
 let userName=document.getElementById("username")
 let passWord=document.getElementById("password")
 let button=document.getElementById("btn")
 button.addEventListener("click",function(){
     let obj={
         username:userName.value,
         password:passWord.value,
         email:emAil.value
     }
     fetch("http://localhost:9090/register",{
         method:"POST",
         headers:{
             "Content-Type": "application/json"
         },
          body:JSON.stringify(obj),
     })
     .then((res)=> res.json())
     .then((data)=>alert(JSON.stringify(data)))
     .catch((err)=> alert("error"))
 })
 