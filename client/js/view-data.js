// view-data.js

function activateDelete() {
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');

    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deleteID = this.getAttribute("data-id");  // get the record id
            handleDelete(deleteID);  // delete  
        });
    });
}

// Function to create table rows from data
function createTable(data) {
  var tbody = document.getElementById("libraryBody");
  tbody.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var row = "<tr>"
      + "<td>" + data[i].title + "</td>"
      + "<td>" + data[i].author + "</td>"
      + "<td>" + data[i].publisher + "</td>"
      + "<td>" + data[i].year + "</td>"
      + "<td>" + data[i].isbn + "</td>"
      + "<td><button class=\"delete-button\" data-id=\"" + data[i].id + "\">DELETE</button></td>"
      + "</tr>";
    tbody.innerHTML += row;
  }

  activateDelete();
}
// Function to retrieve data from server
function retrieveData() {
  fetch("/get-data", {
    method: "GET",
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    createTable(data);
  })
  .catch(error => {
    alert(error);
  });
}
// Function to handle delete operation
function handleDelete(deleteID) {
  var deleteData = { id: deleteID };

  fetch("/delete-record", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deleteData)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if(data.msg === "SUCCESS") {
      retrieveData();
    } else {
      alert(data.error);
    }
  })
  .catch(error => {
    alert(error);
  });
}

window.onload = function () {
  retrieveData();
};
