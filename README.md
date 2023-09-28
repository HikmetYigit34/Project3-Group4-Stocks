# Project3-Group4-Stocks

<ul>
Link to Stocks Web Page:
<br/>
https://HikmetYigit34.github.io/Project3-Group4-Stocks

>Step1:Import csv file to your local host using bash:

>>Bash: cd Documents/GitHub/Project3-Group4-Stocks/resources/data

>Assuming your csv file is in your documents folder

>>mongoimport --db stock --collection ticker --type csv --headerline --file stock.csv

>Step 2 (Option1) To start local host for html using local json

>>Bash python -m http.server 8800

>>>On Chrome

>>>>http://localhost:8800/

> Step 2(Option2) Using Node.js
>> Add:
>>>var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});
>>>On Chrome

>>>>http://localhost:27017/
>>More information can be found at https://www.w3schools.com/nodejs/nodejs_mongodb_find.asp

