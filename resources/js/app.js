//read data from xml database----------------------------------------------------------------------
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML = this.responseText;
	  xml_db = this.responseText;
    }
  };
  xhttp.open("GET", "resources/data/stocks.xml", true);
  xhttp.send();
}
loadXMLDoc();



msg=xml_db.getElementsByTagName("field2")[0].childNodes[0].nodeValue;
alert(msg)

//end of read data from xml database---------------------------------------------------------------









//selecting dataset for graph----------------------------------------------------------------------


graph();
//end of selecting dataset for graph---------------------------------------------------------------




//graph--------------------------------------------------------------------------------------------
function graph(){
const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];

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
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

}
//end of graph-------------------------------------------------------------------------------------	
	
	
	
	

	
	
	
	




