const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", handleNavClick);
});

function handleNavClick(e) {
  e.preventDefault();
  // Remove the active class from all content divs
  const contents = document.querySelectorAll(".content");
  contents.forEach(content => {
    content.classList.remove("active");
  });
  // Add the active class to the clicked link's corresponding content div
  const href = e.target.getAttribute("href");
  const activeContent = document.querySelector(href);
  activeContent.classList.add("active");
}
//  adding data to the api ---------------------------------------------------------------Adding data start
// Add event listener for the Add button
let form=document.getElementById("form");
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", handleAdd);
// let add=document.getElementById("add")
// add.addEventListener("click",handleAdd)
async function handleAdd(){
  event.preventDefault()
  if(form.name.value==""||form.image.value==""||form.price.value==""||form.calories.value==""||form.category.value==""||form.desc.value==""){
    alert ("plsese fill all the detail")
  }else{
    let obj={
      name:form.name.value,
      image:form.image.value,
      price:form.price.value,
      calories:form.calories.value,
      category:form.category.value,
      desc:form.desc.value
    }
    console.log(obj);
 // POST 
   
  let resp=await fetch("https://63c793ede52516043f4041a9.mockapi.io/QuickBite",{
    method:"POST",
    headers:{'Content-type': 'application/json'},
    body:JSON.stringify(obj)
  })
   
  console.log(resp) 
  }
         
}
// adding data to the api ------------------------------------------------------------------Adding data END


// Fetch data from the API and populate the tables
fetch("https://63c793ede52516043f4041a9.mockapi.io/QuickBite/")
  .then(response => response.json())
  .then(data => {
    // Populate the menu table
    const menuBody = document.querySelector("#menuBody");
    data.forEach(item => {
      menuBody.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.calories}</td>
          <td>${item.category}</td>
          <td>$${item.price}</td>
          <td>
            <button class="editBtn" data-id="${item.id}">Edit</button>
            <button class="deleteBtn" data-id="${item.id}">Delete</button>
          </td>
        </tr>
      `;
    });
    // Add event listeners for the Edit and Delete buttons
    const editBtns = document.querySelectorAll(".editBtn");
    editBtns.forEach(btn => {
      btn.addEventListener("click", handleEdit);
    });
    // delate code heare--------------------------------------------------------------------------delate start
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        const id = event.target.getAttribute('data-id');
        if (confirm(`Are you sure you want to delete item with ID: ${id}?`)) {
          // Delete item from API
          fetch(`https://63c793ede52516043f4041a9.mockapi.io/QuickBite/${id}`, {
            method: 'DELETE'
          })
          .then(response => {
            if (response.ok) {
              alert(`Item with ID ${id} deleted successfully`);
              // remove the row from the table
              event.target.closest('tr').remove();
              total()
            } else {
              alert(`Error deleting item with ID ${id}`);
            }
          })
          .catch(error => {
            console.error(error);
            alert(`Error deleting item with ID ${id}`);
          });
        }
      });
      
    });
    // delate code heare--------------------------------------------------------------------------delate end
    // Populate the order table
    //...
    // Populate the customer table
    //...
    
  });

// fetch data -------------------------------------------------------------start
  // customer management
  
  fetch("https://cobalt-blue-jaguar-boot.cyclic.app/users")
  .then(response => response.json())
  .then(data => {
    // Populate the menu table
    const customerTable = document.querySelector("#customerTable");
    data.forEach(item => {
      customerTable.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.username}</td>
          <td>${item.email}</td>
          <td>
            <button class="editBtn" data-id="${item.id}">Edit</button>
            <button class="deleteBtn" data-id="">Delete</button>
          </td>
        </tr>
      `;
    });
    // const deleteBtns = document.querySelectorAll(".deleteBtn");
    // deleteBtns.forEach(btn => {
    //   btn.addEventListener('click', event => {
    //     event.preventDefault();
    //     const id = event.target.getAttribute('data-id');
    //     if (confirm(`Are you sure you want to delete item with ID: ${id}?`)) {
    //       // Delete item from API
    //       fetch(`https://cobalt-blue-jaguar-boot.cyclic.app/users/${id}`, {
    //         method: 'DELETE'
    //       })
    //       .then(response => {
    //         if (response.ok) {
    //           alert(`Item with ID ${id} deleted successfully`);
    //           // remove the row from the table
    //           event.target.closest('tr').remove();
    //           total()
    //         } else {
    //           alert(`Error deleting item with ID ${id}`);
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //         alert(`Error deleting item with ID ${id}`);
    //       });
    //     }
    //   });
      
    // });
  })
  // fetch data-----------------------------------------------------------------------------end

  function handleEdit(e) {
  // Show a form to edit the menu item
  // ...
}

function handleDelete(e) {
  // Delete the menu item from the API
  // ...
}
// total Product---------------------------------------------------------------------------------total product count start
function total(){
  fetch('https://63c793ede52516043f4041a9.mockapi.io/QuickBite/')
    .then(response => response.json())
    .then(data => {
        // count the total number of products
        let totalItems = data.length;

        // display the total number of products in the "total-items" div
       return document.getElementById("total").innerHTML = totalItems+1;
  });
}
total()
// total product---------------------------------------------------------------------------------total product count end
