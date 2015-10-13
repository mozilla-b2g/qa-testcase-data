(function() {
  var startTime = new Date();

  function setBackgroundToColor(colorString){
    console.log("Add-on ID ADDON_ID started at " + startTime + ": changing the title color.")
    document.body.style.backgroundColor=colorString;
  }


  var flag = false;
  setInterval(function(){
    if (flag){
      setBackgroundToColor('red');
      flag = false;
    }
    else {
      setBackgroundToColor('yellow');
      flag = true;
    }
  }, 500);

  alert('injected')
  
}());
