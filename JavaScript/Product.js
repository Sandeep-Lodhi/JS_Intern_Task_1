// This script file create for products events 
console.log("Product List ↴");
// Validaion function create for product fields validation
function validationForm() {
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var discount = document.getElementById("discount").value;
    var finalprice = document.getElementById("finalprice").value;
    var type = document.getElementById("type").value;
    var status = document.getElementById("status").value;

    if (name == "") {
        alert("Product Name is required");
        return false;
    }

    if (price == "") {
        alert("Price is required");
        return false;
    }
    else if (price < 1) {
        alert("price must be zero or less than zero");
        return false;
    }

    if (discount == "") {
        alert("Discount is requried");
        return false;
    }

    if (finalprice == "") {
        alert("Final Price is requried");
        return false;
    }
    if (type == "") {
        alert("Product Type is requried");
        return false;
    }
    if (status == "") {
        alert("Payment Status is requried");
        return false;
    }
    return true;

}
 
// This function create for showdata for reading 
function readData() {
    var productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
        console.log(productList)
    }
    var html = "";
    productList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.discount + "</td>";
        html += "<td>" + element.finalprice + "</td>";
        html += "<td>" + element.type + "</td>";
        html += "<td>" + element.status + "</td>";
        html += '<td><button onclick="deleteOnData(' + index + ')" class="btn btn-danger">Delete</button><button onclick= "updateOnData(' + index + ')" class=" btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";


    });

    document.querySelector("#productTable tbody").innerHTML = html;

}

document.onload = readData();

//  funcion add data

function AddOnData() {
    if (validationForm() == true) {
        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;
        var discount = document.getElementById("discount").value;
        var finalprice = document.getElementById("finalprice").value;
        var type = document.getElementById("type").value;
        var status = document.getElementById("status").value;

        var productList;
        if (localStorage.getItem("productList") == null) {
            productList = [];
        } else {
            productList = JSON.parse(localStorage.getItem("productList"));
        }

        productList.push({
            name: name,
            price: price,
            discount: discount,
            finalprice: finalprice,
            type: type,
            status: status,
        });

        localStorage.setItem("productList", JSON.stringify(productList));
        readData();
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("discount").value = "";
        document.getElementById("finalprice").value = "";
        document.getElementById("type").value = "";
        document.getElementById("status").value = "";

    }
}


// function to delete 

function deleteOnData(index) {
    var productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    readData();
}

// function to update 

function updateOnData(index) {
    //  submit button will hide and update button will read for
    //  updating of data in local storage 

    document.getElementById("SubmitOnData").style.display = "none";
    document.getElementById("UpdateOnData").style.display = "block";

    var productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    } else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    document.getElementById("name").value = productList[index].name;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("discount").value = productList[index].discount;
    document.getElementById("finalprice").value = productList[index].finalprice;
    document.getElementById("type").value = productList[index].type;
    document.getElementById("status").value = productList[index].status;

    document.querySelector("#UpdateOnData").onclick = function () {
        if (validationForm() == true) {
            productList[index].name = document.getElementById("name").value;
            productList[index].price = document.getElementById("price").value;
            productList[index].discount = document.getElementById("discount").value;
            productList[index].finalprice = document.getElementById("finalprice").value;
            productList[index].type = document.getElementById("type").value;
            productList[index].status = document.getElementById("status").value;

            localStorage.setItem("productList", JSON.stringify(productList));

            readData();

            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("discount").value = "";
            document.getElementById("finalprice").value = "";
            document.getElementById("type").value = "";
            document.getElementById("status").value = "";

            //  update button will hide and submit button will read for


            document.getElementById("SubmitOnData").style.display = "block";
            document.getElementById("UpdateOnData").style.display = "none";
        }
    }
}