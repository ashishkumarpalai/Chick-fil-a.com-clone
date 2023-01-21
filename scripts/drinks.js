let container=document.getElementById("container");
let sortingSelect=document.getElementById("sortingSelect");
let fetched=[];
let drinks=[];
fetch("https://63c793ede52516043f4041a9.mockapi.io/QuickBite")
.then(res=> res.json())
.then((data)=>{
    fetched=data;
    drinks=fetched.filter((ele)=>{
        if(ele.category=="drinks"){
            return true;
        }
    })
    getCards(drinks);
})
.catch(err=>console.log(err));

sortingSelect.addEventListener("change",(e)=>{
    if(e.target.value=="lth"){
        let newData=drinks.sort((a,b)=>a.price-b.price);
        getCards(newData);
    }else if(e.target.value=="htl"){
        let newData=drinks.sort((a,b)=>b.price-a.price);
        getCards(newData);
    }else if(e.target.value=="sort"){
        getCards(sides);
    }
});
function getCards(data){
    container.innerHTML=null;
    data.forEach((ele)=>{
        let card=document.createElement("div");
        let image=document.createElement("img");
        image.src=ele.image;
        let name=document.createElement("h2");
        name.innerText=ele.name;
        let price=document.createElement("h4");
        price.innerText=`Price: ₹ ${ele.price}`;
        let calories=document.createElement("p");
        calories.innerText=ele.calories+" "+"Calories per serving";
        let btn=document.createElement("button");
        btn.innerText="Order now";
        btn.addEventListener("click",(e)=>{
            let cartData=JSON.parse(localStorage.getItem("cart"))||[];
            let count=0;
            for(let i=0;i<cartData.length;i++){
                if(ele.id===cartData[i].id){
                    count=1;
                    break;
                }
            }
            if(count){
                alert("Your dish is already in the cart");
            }else{
                cartData.push(ele);
                localStorage.setItem("cart",JSON.stringify(cartData));
                alert("Your dish is added to the cart");
            }
        })
        card.append(image,name,price,calories,btn);
        container.append(card);
    })
}