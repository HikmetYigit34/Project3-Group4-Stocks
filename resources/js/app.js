
//read data from xml database----------------------------------------------------------------------
var request = new XMLHttpRequest();
request.open("GET", "resources/data/stocks.xml", false);
request.send();
var xml = request.responseXML;
//alert(xml);
//end of read data from xml database---------------------------------------------------------------

var stocks = xml.getElementsByTagName("stock");
for(var i = 0; i < stocks.length; i++) {
    var stock = stocks[i];
    var companies = stock.getElementsByTagName("company");
    for(var j = 0; j < companies.length; j++) {
        c=(companies[j].childNodes[0].nodeValue);
		if(i<companies.length-1){cNext=(companies[j+1].childNodes[0].nodeValue);}else {cNext="";}
    }
}

//loading data to two dimentional array------------------------------------------------------------
function loadObjects() {
    //parser = new DOMParser();
    //xmlDoc = parser.parseFromString(xml, "text/xml");
	xmlDoc=xml;
    object = [];
    ln = xmlDoc.getElementsByTagName("stock").length;
    for (r = 0; r < ln; r++) {
        data0 = xmlDoc.getElementsByTagName("date")[r].childNodes[0].nodeValue;
        data1 = xmlDoc.getElementsByTagName("open")[r].childNodes[0].nodeValue;
        data2 = xmlDoc.getElementsByTagName("high")[r].childNodes[0].nodeValue;
        data3 = xmlDoc.getElementsByTagName("low")[r].childNodes[0].nodeValue;
        data4 = xmlDoc.getElementsByTagName("close")[r].childNodes[0].nodeValue;
        data5 = xmlDoc.getElementsByTagName("volume")[r].childNodes[0].nodeValue;
        data6 = xmlDoc.getElementsByTagName("dividends")[r].childNodes[0].nodeValue;
        data7 = xmlDoc.getElementsByTagName("splits")[r].childNodes[0].nodeValue;
        data8 = xmlDoc.getElementsByTagName("company")[r].childNodes[0].nodeValue;
        var row = [];
        row = [data0, data1, data2, data3, data4, data5, data6, data7, data8];
        object.push(row);
    }
}
loadObjects();

//alert( object[0][0] );
//end of loading data to two dimentional array-----------------------------------------------------

//loading companies in to select options
select = document.getElementById('company');
for (i=0; i<object.length; i++){
	company=object[i][8]
	if(i<object.length-1){companyPrev=object[i+1][8]}
	if(company!=companyPrev){
		//console.log(company)
		var opt = document.createElement('option');
		opt.value = company;
		opt.innerHTML = company;
		select.appendChild(opt);
		}
}

//read data from json file/ database----------------------------------------------------------------------
/*
fetch('resources/data/stock.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
*/
//end of read data from json file/ database----------------------------------------------------------------------

function addMonths(){
	selectedYear   = document.getElementById("year").value;
	if(selectedYear=="2023"){
		document.getElementById('month').options.length = 0;
		var select = document.getElementById('month');
		var opt = document.createElement('option');
		opt.value = "09"; opt.innerHTML = "Sep"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "08"; opt.innerHTML = "Aug"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "07"; opt.innerHTML = "Jul"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "06"; opt.innerHTML = "Jun"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "05"; opt.innerHTML = "May"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "04"; opt.innerHTML = "Apr"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "03"; opt.innerHTML = "Mar"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "02"; opt.innerHTML = "Feb"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "01"; opt.innerHTML = "Jan"; select.appendChild(opt);
	}
	
	if(selectedYear=="2022"){
		document.getElementById('month').options.length = 0;
		var select = document.getElementById('month');
		var opt = document.createElement('option');
		opt.value = "12"; opt.innerHTML = "Dec"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "11"; opt.innerHTML = "Nov"; select.appendChild(opt);
		var opt = document.createElement('option');
		opt.value = "10"; opt.innerHTML = "Oct"; select.appendChild(opt);
		var opt = document.createElement('option');
	}		
}
addMonths();

//selecting dataset for graph----------------------------------------------------------------------
function selectDataset(){
	selectedCompany= document.getElementById("company").value;
	selectedYear   = document.getElementById("year").value;
	selectedMonth  = document.getElementById("month").value
	
	//alert (selectedCompany + " " + selectedYear + " " + selectedMonth)  //for testing
	xValues = [];
	yValues = [];
	dbDays = [];       //will be xValues
	dbClosePrices = []; //will be yValues
	
	for (i=0; i<object.length; i++){
		dateString = object[i][0]
		dbCompany = object[i][8]
		dbYear = dateString.slice(0, 4);
		dbMonth = dateString.slice(5, 7);
		dbDay = (dateString.slice(8, 10));
		dbClosePrice = Number(object[i][4]);
		
		if(selectedCompany==dbCompany && selectedYear==dbYear && selectedMonth==dbMonth ){
			dbDays.push(dbDay);
			dbClosePrices.push(dbClosePrice);
			//console.log(dbCompany + "/" + dbYear + "/" + dbMonth)
			
		}
	}

	xValues = dbDays;
	yValues = dbClosePrices;
	
	//console.log(xValues);
	//console.log(yValues);	

	//alert(dbCompany + "/" + dbYear)
graph();	
}
selectDataset();

//end of selecting dataset for graph---------------------------------------------------------------




//graph--------------------------------------------------------------------------------------------
function graph(){
//const xValues = ["Day1",2,3,4,5,6,7,8,9,10,11, 12,13,14,15,16,17,18,19,20,21,22, 23,24,25,26,27,28,29,30,31];
//const yValues = [7,8,8,9,9,9,10,11,14,14,15,7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
	events: ['click'],
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:500}}],
    }
  }
});

}
//end of graph-------------------------------------------------------------------------------------	
	
	
	
function top_ten_company(){
	alert(this is to 10")
}	

	
	
	
	




