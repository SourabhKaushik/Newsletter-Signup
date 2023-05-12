const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const first = req.body.fname;
    const last = req.body.lname;
    const email = req.body.email;
    // console.log(first, last, email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }

            }
        ]
    };

    const jsondata = JSON.stringify(data);

    const options={
        method:"POST",
        auth:"Sourabh:10f44746aead2dd6155bab834bf7c6f1-us9"
    }

    const url="https://us9.api.mailchimp.com/3.0/lists/7570dd4991";
   const request= https.request(url, options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }

        response.on("data",function(data){
            console.log(JSON.parse(data));
            
            
        });
    });
    
    // request.write(jsondata);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});



//api key
// 10f44746aead2dd6155bab834bf7c6f1-us9


// list id/audience
// 7570dd4991.