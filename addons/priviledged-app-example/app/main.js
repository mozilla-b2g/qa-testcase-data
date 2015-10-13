function reqListener () {
    console.log(this.responseText);
}

var oReq = new XMLHttpRequest({mozSystem: true});
oReq.addEventListener("load", function(){
  alert("SUCCEEDED!")
  document.getElementById('content').contentDocument.body.innerHTML = this.responseText;
  //alert(this.responseText)
});
oReq.addEventListener("error", function(e){
  alert("FAILED!");
});
oReq.open("GET", "http://www.cnn.com/");
oReq.send();
