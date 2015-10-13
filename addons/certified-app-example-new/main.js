(function() {
  var startTime = new Date();

  function setHeaderBackgroundToColor(colorString){
    console.log("Add-on ID ADDON_ID started at " + startTime + ": changing the title color.")
    document.getElementsByClassName('view-header')[0].children[0].style.backgroundColor=colorString;
  }


  var flag = false;
  setInterval(function(){
    if (flag){
      setHeaderBackgroundToColor('blue');
      flag = false;
    }
    else {
      setHeaderBackgroundToColor('white');
      flag = true;
    }
  }, 500);

  alert('injected')
  
}());
