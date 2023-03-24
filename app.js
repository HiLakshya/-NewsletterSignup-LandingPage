const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const https = require('https');


require("dotenv").config() //Not working for me



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");

})

app.post("/", function (req, res) {

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,

                }

            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/" + ListID;

    const options = {
        method: "POST",
        auth: "HiLakshya :" + APIKey ,
    }

    const request = https.request(url, options, function (response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");

        }else{ res.sendFile(__dirname + "/failure.html");}


        response.on("data", function (data){
        console.log(JSON.parse(data));
    })
})

    request.write(jsonData);

    request.end();



});

app.post("/success.html", function (req1, res1) {
    res1.redirect("/");
})
app.post("/failure.html", function (req, res) {
    res.redirect("/");
})


app.get("/success.html", function (req, res) {

    res.sendFile(__dirname + "/success.html");
})

app.get("/failure.html", function (req, res) {

    res.sendFile(__dirname + "/failure.html");
})

app.listen(process.env.PORT || 3000, function () { //processs.env.PORT is for heroku 
    console.log("Server started on port 3000.");
    
})

var APIKey = "9064a7xxxxxxxxxa5e9c89-us8";
var ListID= "c8exxxxxxxa0f";