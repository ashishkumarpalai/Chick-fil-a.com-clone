let container=document.getElementById("container");
let cartData=JSON.parse(localStorage.getItem("cart"))||[];
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
        })
        let plus=document.createElement("button");
        plus.setAttribute("class","qty");
        plus.innerText="+";
        plus.addEventListener("click",()=>{
            ele.quantity++;
            quantity.innerText=ele.quantity;
        })
        let btn=document.createElement("button");
        btn.innerText="Delete";
        btn.setAttribute("class","btn");
        btn.addEventListener("click",()=>{
            cartData.splice(ind,1);
            localStorage.setItem("cart",JSON.stringify(cartData));
            getCards(cartData);
        })
        card.append(image,name,price,calories,minus,quantity,plus,btn);
        container.append(card);
    })
}