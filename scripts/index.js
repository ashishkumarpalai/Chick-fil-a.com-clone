

 const menu = document.querySelector(".menu");
 const menuMain = menu.querySelector(".menu-main");
 const goBack = menu.querySelector(".go-back");
 const menuTrigger = document.querySelector(".mobile-menu-trigger");
 const closeMenu = menu.querySelector(".mobile-menu-close");
 let subMenu;
 menuMain.addEventListener("click", (e) =>{
 	if(!menu.classList.contains("active")){
 		return;
 	}
   if(e.target.closest(".menu-item-has-children")){
   	 const hasChildren = e.target.closest(".menu-item-has-children");
      showSubMenu(hasChildren);
   }
 });
 goBack.addEventListener("click",() =>{
 	 hideSubMenu();
 })
 menuTrigger.addEventListener("click",() =>{
 	 toggleMenu();
 })
 closeMenu.addEventListener("click",() =>{
 	 toggleMenu();
 })
 document.querySelector(".menu-overlay").addEventListener("click",() =>{
 	toggleMenu();
 })
 function toggleMenu(){
 	menu.classList.toggle("active");
 	document.querySelector(".menu-overlay").classList.toggle("active");
 }
 function showSubMenu(hasChildren){
    subMenu = hasChildren.querySelector(".sub-menu");
    subMenu.classList.add("active");
    subMenu.style.animation = "slideLeft 0.5s ease forwards";
    const menuTitle = hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
    menu.querySelector(".current-menu-title").innerHTML=menuTitle;
    menu.querySelector(".mobile-menu-head").classList.add("active");
 }

 function  hideSubMenu(){  
    subMenu.style.animation = "slideRight 0.5s ease forwards";
    setTimeout(() =>{
       subMenu.classList.remove("active");	
    },300); 
    menu.querySelector(".current-menu-title").innerHTML="";
    menu.querySelector(".mobile-menu-head").classList.remove("active");
 }
 
 window.onresize = function(){
 	if(this.innerWidth >991){
 		if(menu.classList.contains("active")){
 			toggleMenu();
 		}

 	}
 }

document.querySelector(".fa-search").addEventListener("click",()=>{
   console.log("its working")
})
   const searchInput = document.getElementById("search-input");
    const searchBtn = document.querySelector(".fa-search");

    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    async function handleSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const resultContainer = document.getElementById("container");
      resultContainer.innerHTML = "";
      try {
        const response = await fetch("https://63c793ede52516043f4041a9.mockapi.io/QuickBite/");
        const data = await response.json();
        const results = data.filter(item => {
          return item.name.toLowerCase().includes(searchTerm);
        });
        if (results.length === 0) {
          resultContainer.innerHTML = "No results found.";
        } else {
          results.forEach(ele => {
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
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
   //  serch function end