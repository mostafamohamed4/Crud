var InputproductName = document.getElementById("productName");
var Inputproductprice = document.getElementById("productprice");
var InputproductCategory = document.getElementById("productCategory");
var InputproductDescription = document.getElementById("productDescription");
var productlist;
if (localStorage.getItem("product") != null) {
    productlist = JSON.parse(localStorage.getItem("product"));
    display()
} else {
    productlist = [];
}

function checkInput() {
    if (InputproductName.value != "" && Inputproductprice.value != "" && InputproductCategory.value != ""
        && InputproductDescription.value != "") {
        return true;
    } else {
        return false;

    }
}
function validateInputproductName() {
    let regex=/^[A-Z-a-z]{3,10}$/
    if ( regex.test(InputproductName.value)==true) {
        return true;
    } else {
        return false;

    }
}
function validateInputproductprice() {
    let regex=/^[0-9][1-9]{4,8}$/
    if ( regex.test(Inputproductprice.value)==true) {
        return true;
    } else {
        return false;

    }
}

function addproduct() {
    if (validateInputproductName() == true && validateInputproductprice()==true) {
        var product = {
            name: InputproductName.value,
            price: Inputproductprice.value,
            Category: InputproductCategory.value,
            Description: InputproductDescription.value,
        }

        productlist.push(product);
        localStorage.setItem("product", JSON.stringify(productlist))
        display()
    } else
        window.alert("eror")
}
function clearproduct() {
    InputproductName.value = "";
    Inputproductprice.value = "";
    InputproductCategory.value = "mobile";
    InputproductDescription.value = "";
}
function display() {
    var temp = ""
    for (var i = 0; i < productlist.length; i++) {
        temp += ` <tr>
      <td>${i}</td>
      <td>${productlist[i].name}</td>
      <td>${productlist[i].price}</td>
      <td>${productlist[i].Category}</td>
      <td>${productlist[i].Description}</td>
      <td> <button onclick="Updateproduct(`+ i + `)" class="btn btn-outline-info">Update</button></td>
      <td> <button onclick="Deleteproduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
  </tr>`
    }

    document.getElementById("TableBody").innerHTML = temp
}
function Deleteproduct(Index) {
    productlist.splice(Index, 1)
    localStorage.setItem("product", JSON.stringify(productlist))
    display()

}


function searchproduct(searches) {
    var temp = ""
    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].name.includes(searches) == true) {
            temp += ` <tr>
      <td>${i}</td>
      <td>${productlist[i].name.replace(searches, `<span class="text-danger fw-bolder">` + searches + `</span>`)}</td>
      <td>${productlist[i].price}</td>
      <td>${productlist[i].Category}</td>
      <td>${productlist[i].Description}</td>
      <td> <button  class="btn btn-outline-info">Update</button></td>
      <td> <button onclick="Deleteproduct(`+ i + `)" class="btn btn-outline-danger">Delete</button></td>
  </tr>`
        }
        else {
            console.log("eroor");
        }
    }
    document.getElementById("TableBody").innerHTML = temp

}
// update
var test;

function Updateproduct(Index) {
    InputproductName.value = productlist[Index].name
    Inputproductprice.value = productlist[Index].price
    InputproductCategory.value = productlist[Index].Category
    InputproductDescription.value = productlist[Index].Description
    document.getElementById("AddProduct").style.display = "none"
    document.getElementById("EditProduct").style.display = "inline-block"

    test = Index;
}

function editProduct() {
    var product = {
        name: InputproductName.value,
        price: Inputproductprice.value,
        Category: InputproductCategory.value,
        Description: InputproductDescription.value,
    }

    productlist[test] = product
    localStorage.setItem("product", JSON.stringify(productlist))
    display()
    document.getElementById("AddProduct").style.display = "inline-block"
    document.getElementById("EditProduct").style.display = "none"
}