//firebase js that should be combined with other JS files//

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBJS2bPJfrDXmDz5ELuD-wDe76wzssPuJI",
    authDomain: "teamawesome-d42da.firebaseapp.com",
    databaseURL: "https://teamawesome-d42da.firebaseio.com",
    projectId: "teamawesome-d42da",
    storageBucket: "",
    messagingSenderId: "441742324691"
 };
 firebase.initializeApp(config);

   // Create a variable to reference the database
   var database = firebase.database();

$("#submit").on("click", function(event) {
 event.preventDefault();

 // Grabs user input
 var name = $("#name").val().trim();
 var email = $("#email").val().trim();
 var numberOfPeople = $("#people").val().trim();
 var housing = $("#housing").val().trim();
 var food = $("#food").val().trim();



//  $("#housing").on("click", function() {
//    console.log("checked")
//    if (checkBox.checked === true) {
//        console.log(checkBox.checked)

//    checkBox.push(newPerson.housing);
//    }
//  })
 

 // Creates local "temporary" object for holding employee data
 var newPerson = {
   name: name,
   email: email,
   numberOfPeople: numberOfPeople,
   food: food,
   housing: housing,

 };

 // Uploads employee data to the database
 database.ref().push(newPerson);

 // Logs everything to console
 console.log(newPerson.name);
 console.log(newPerson.email);
 console.log(newPerson.numberOfPeople);
 console.log(newPerson.food);
 console.log(newPerson.housing);


 alert("People can see your help message");

 $("#name").val("");
 $("#email").val("");
 $("#people").val("");
 $("#housing").val("");
 $("#food").val("");


});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
 console.log(childSnapshot.val());

 // Store everything into a variable.
 var name = childSnapshot.val().name;
 var email = childSnapshot.val().email;
 var numberOfPeople = childSnapshot.val().numberOfPeople;
 var food = childSnapshot.val().food;
 var housing = childSnapshot.val().housing;

 

 // Employee Info
 console.log(name);
 console.log(email);
 console.log(numberOfPeople);
 console.log(food);
 console.log(housing);


 
 // Create the new row
 var newRow = $("<tr>").append(
   $("<td>").text(name),
   $("<td>").text(email),
   $("<td>").text(numberOfPeople),
   $("<td>").text(food),
   $("<td>").text(housing)
 );

 // Append the new row to the table
 $("#person-table > tbody").append(newRow);
});
