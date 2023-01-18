let button=document.querySelector(".check-btn")
let form=document.querySelector(".payment-wrapper")
let otpui=document.querySelector(".otp-ui")
let abort=document.querySelector("#link");
let otpcheck=document.getElementById("otp-check");
let otpbtn=document.getElementById("submit");
let inputs=document.querySelectorAll("input")


let one=document.getElementById("1")
let two=document.getElementById("2")
let three=document.getElementById("3")
let four=document.getElementById("4")
let five=document.getElementById("5")
let six=document.getElementById("6")
let seven=document.getElementById("7")
let eight=document.getElementById("8")
let nine=document.getElementById("9")
let ten=document.getElementById("10")



button.addEventListener("click",(e)=>{
e.preventDefault()
if(one.value!="" && two.value!=""&& three.value!=""&& four.value!=""&& five.value!=""&& six.value!=""&& seven.value!=""&& eight.value!=""&& nine.value!=""&& ten.value!=""){


let x="0123456789";
let otp="";
for(let i=0;i<4;i++){
    otp+=x[Math.floor(Math.random()*10)]
}
alert(`Your OTP is: ${otp}`);
form.classList.add("none");
button.classList.add("none");
otpui.classList.add("block");

localStorage.setItem("otp",JSON.stringify(otp))
}else{
    alert("Fill All The Fields Correctly")
}
})

abort.addEventListener("click",()=>{
    alert("Redirecting To The Payments Page")
    form.classList.remove("none");
    button.classList.remove("none");
    otpui.classList.remove("block");
})

otpbtn.addEventListener("click",()=>{
    let value=otpcheck.value;
    let store=JSON.parse(localStorage.getItem("otp"))
    if(value==store){
        alert("Your Order has been placed")
    }else{
        alert("Please Enter Correct OTP")
    }
})
