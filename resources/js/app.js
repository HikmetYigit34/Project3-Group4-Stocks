
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

//loading data to two dimensional array------------------------------------------------------------
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
//end of loading data to two dimentional array-----------------------------------------------------


//loading companies in to select options-----------------------------------------------------------
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
//end of loading companies in to select options----------------------------------------------------


//read data from json file/ database---------------------------------------------------------------
/*
fetch('resources/data/stock.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
*/
//end of read data from json file/ database--------------------------------------------------------

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
	
linegraph();	

graphTitle="Stock Close Prices vs Days of Selected Month"
document.getElementById("graphTitle").innerHTML=graphTitle;
}
selectDataset();
//end of selecting dataset for graph---------------------------------------------------------------




//graph--------------------------------------------------------------------------------------------
function linegraph(){
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
	
	
	
function top_five_company(){
xValues = [];
yValues = [];
xValues = ["tesla_inc", "apple_inc", "advanced_micro_devices_inc", "amazoncom_inc", "alphabet_inc"	]
yValues = [33313240100 ,17029388100 ,16762837000 ,16627034900 ,15096098158	 ]	
bargraph();
graphTitle="Total Stock Volume for Top 5 Companies"
document.getElementById("graphTitle").innerHTML=graphTitle;
}	

//graph--------------------------------------------------------------------------------------------
function bargraph(){
new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor:     "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
	events: ['click'],
	title: {
      display: true,
      text: "Total Stock Volume for Top 5 Companies"
    }
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:35000000000}}],
    }
  }
});
}
//end of graph-------------------------------------------------------------------------------------		
	


function bottom_five_company(){
xValues = [];
yValues = [];
xValues = ["apellis_pharmaceuticals_inc", "hayward_holdings_inc", "crh_plc", "immunovant_inc", "magellan_midstream_partners_lp"	]
yValues = [614285089,466259837,364693800,334798377,319539580		 ]	
piegraph();
graphTitle="Total Stock Volume for Bottom 5 Companies"
document.getElementById("graphTitle").innerHTML=graphTitle;
}	


//graph--------------------------------------------------------------------------------------------
function piegraph(){
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
	events: ['click'],
    title: {
      display: true,
      text: "Total Stock Volume for Bottom 5 Companies"
    }
  }
});
}
//end of graph-------------------------------------------------------------------------------------	
