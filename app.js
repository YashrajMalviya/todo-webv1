const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["breakfast","lunch","dinner"];
let workItems = [];

//setting view engine to ejs as we using ejs template module
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//handling main route
app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };

  let day = today.toLocaleDateString("en-US",options);


  res.render('list', {
    listTitle: day, newListItems: items
  });
});

//handling post request from client form data --> from list.ejs file
app.post("/", function(req,res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
      workItems.push(item);
      res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

//handling get & post routes to work
app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems: workItems});
})

app.get("/about", function(req,res){
  res.render("about");
})

// app.post("/work", function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// })

//listening on port 3000
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
