// write-data.js
// clear input fields 
function clearFields() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("publisher").value = "";
  document.getElementById("year").value = "";
  document.getElementById("isbn").value = "";
}
// Submit button
document.getElementById("submitBtn").addEventListener("click", function () {
  var postData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    publisher: document.getElementById("publisher").value,
    year: document.getElementById("year").value,
    isbn: document.getElementById("isbn").value
  };
  // Send data to server
  fetch("/write-data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if(data.msg === "SUCCESS") {
      alert("Submit button was pressed");
      clearFields();
    } else {
      alert("ERROR");
    }
  })
  .catch(error => {
    alert(error);
  });
});

document.getElementById("clearBtn").addEventListener("click", function () {
  clearFields();
});
