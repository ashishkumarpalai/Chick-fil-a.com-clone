let container=document.getElementById("container");
let cartData=JSON.parse(localStorage.getItem("cart"))||[];
let totalItems=document.getElementById("totalItems");
let cartValue=document.getElementById("cartValue");
let paybtn=document.getElementById("paybtn");
paybtn.addEventListener("click",(e)=>{
    if(totalItems.innerText==0){
        alert("Cart is empty!")
    }else{
        window.location.href="payment.html"
    }
})

getCards(cartData);


function getCards(data){
    container.innerHTML=null;
    data.forEach((ele,ind)=>{
        let card=document.createElement("div");
        let image=document.createElement("img");
        image.src=ele.image;
        let name=document.createElement("h2");
        name.innerText=ele.name;
        let price=document.createElement("h4");
        price.innerText=`Price: ₹ ${ele.price}`;
        let calories=document.createElement("p");
        calories.innerText=ele.calories+" "+"Calories per serving";
        let quantity=document.createElement("h5");
        quantity.innerText=ele.quantity;
        let minus=document.createElement("button");
        minus.setAttribute("class","qty");
        minus.innerText="-";
        minus.addEventListener("click",()=>{
            if(ele.quantity>1){
                ele.quantity--;
                quantity.innerText=ele.quantity;
            }
            checkoutItem(cartData);
            checkoutValue(cartData);
        })
        let plus=document.createElement("button");
        plus.setAttribute("class","qty");
        plus.innerText="+";
        plus.addEventListener("click",(e)=>{
            e.preventDefault();
            ele.quantity++;
            quantity.innerText=ele.quantity;
            checkoutItem(cartData);
            checkoutValue(cartData);
        })
        let btn=document.createElement("button");
        btn.innerText="Delete";
        btn.setAttribute("class","btn");
        btn.addEventListener("click",(e)=>{
            e.preventDefault();
            cartData.splice(ind,1);
            localStorage.setItem("cart",JSON.stringify(cartData));
            getCards(cartData);
            checkoutItem(cartData);
            checkoutValue(cartData);
        })
        card.append(image,name,price,calories,minus,quantity,plus,btn);
        container.append(card);
    })
}

function checkoutItem(data){
    let bag=0;
    data.forEach((ele)=>{
        bag+=ele.quantity;
    })
    totalItems.innerText=bag;
}

function checkoutValue(data){
    let bag=0;
    data.forEach((ele)=>{
        bag+=(ele.quantity)*(ele.price);
    })
    cartValue.innerText=bag;
}

checkoutItem(cartData);
checkoutValue(cartData);



