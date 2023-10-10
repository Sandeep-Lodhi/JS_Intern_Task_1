// This script file create  for customer form 
console.log("Customers List ↴");
// Validation function create here for customer form
function validateForm() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var dob = document.getElementById("dob").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if (firstname == "") {
        alert("First Name is required");
        return false;
    }

    if (lastname == "") {
        alert("Last Name is required");
        return false;
    }

    if (dob == "") {
        alert("Date Of Birth is required");
        return false;
    }
    if (mobile == "") {
        alert("Mobile No. is required");
        return false;
    }

    if (email == "") {
        alert("Email is requried");
        return false;
    }
    else if (!email.includes("@")) {
        alert("Invalid email address ");
        return false;
    }

    if (address == "") {
        alert("Address is requried");
        return false;
    }


    return true;

}

// This function create for customer data showing 
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
        console.log(peopleList)
    }
    var html = "";
    peopleList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.firstname + "</td>";
        html += "<td>" + element.lastname + "</td>";
        html += "<td>" + element.dob + "</td>";
        html += "<td>" + element.mobile + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.address + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick= "update(' + index + ')" class=" btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";


    });

    document.querySelector("#customerTable tbody").innerHTML = html;

}

// document.onload = showData();

//  funcion add data

// This function create for add customer data in table 
function AddData() {
    if (validateForm() == true) {
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var dob = document.getElementById("dob").value;
        var mobile = document.getElementById("mobile").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;


        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            firstname: firstname,
            lastname: lastname,
            dob: dob,
            mobile: mobile,
            email: email,
            address: address,

        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";


    }
}


// function to delete 

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// function to update 

function update(index) {
    //  submit button will hide and update button will show for
    //  updating of data in local storage 

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("firstname").value = peopleList[index].firstname;
    document.getElementById("lastname").value = peopleList[index].lastname;
    document.getElementById("dob").value = peopleList[index].dob;
    document.getElementById("mobile").value = peopleList[index].mobile;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("address").value = peopleList[index].address;


    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].firstname = document.getElementById("firstname").value;
            peopleList[index].lastname = document.getElementById("lastname").value;
            peopleList[index].dob = document.getElementById("dob").value;
            peopleList[index].mobile = document.getElementById("mobile").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].address = document.getElementById("address").value;


            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("dob").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("email").value = "";
            document.getElementById("address").value = "";


            //  update button will hide and submit button will show for


            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}