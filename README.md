# Project3-Group4-Stocks

<ul>
Link to Stocks Web Page:
<br/>
https://HikmetYigit34.github.io/Project3-Group4-Stocks
  
#Import csv file to your local host using bash:

Bash: cd Documents/GitHub/Project3-Group4-Stocks/resources/data

Assuming your csv file is in your documents folder

mongoimport --db stock --collection ticker --type csv --headerline --file stock.csv

#To start local host for html using local json

Bash python -m http.server 8800

On Chrome

http://localhost:8800/
