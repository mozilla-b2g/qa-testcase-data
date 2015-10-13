(function() {
  function init() {
    var buttons = document.getElementById('software-buttons');
    if (!buttons) {
      console.log('zorro homebar found?');
      return;
    }

    // Clean up any old installs.
    var old = document.getElementById('show-windows-button');
    if (old) {
      old.remove();
    }
    old = document.getElementById('back-window-button');
    if (old) {
      old.remove();
    }

    var showWindows = document.createElement('button');
    showWindows.id = 'show-windows-button';
    showWindows.textContent = '▢';
    showWindows.style.position = 'absolute';
    showWindows.style.right = '1rem';
    showWindows.style.top = 0;
    showWindows.style.height = '5rem';
    showWindows.style.width = '7rem';
    showWindows.style.backgroundColor = 'red';
    showWindows.style.zIndex = 99999999;
    showWindows.style.pointerEvents = 'all';
    showWindows.style.background = 'transparent';
    showWindows.style.border = 'none';
    showWindows.style.color = 'white';
    showWindows.style.fontSize = '3rem';
    showWindows.style.fontWeight = 'bold';
    showWindows.addEventListener('touchstart', function() {
      if (window.wrappedJSObject.appWindowManager.taskManager.isShown()) {
        window.wrappedJSObject.appWindowManager.taskManager.exitToApp();
      } else {
        window.dispatchEvent(new CustomEvent('taskmanagershow'));
      }
    }, true);
    buttons.appendChild(showWindows);

    var back = document.createElement('button');
    back.id = 'back-window-button';
    back.textContent = '◁'; //'〈' ;
    back.style.position = 'absolute';
    back.style.left = '1rem';
    back.style.top = 0;
    back.style.height = '5rem';
    back.style.width = '7rem';
    back.style.backgroundColor = 'yellow';
    back.style.zIndex = 99999999;
    back.style.pointerEvents = 'all';
    back.style.background = 'transparent';
    back.style.border = 'none';
    back.style.color = 'white';
    back.style.fontSize = '3rem';
    back.style.fontWeight = 'bold';
    back.addEventListener('touchstart', function() {
      var app = window.wrappedJSObject.appWindowManager.getActiveApp();

      var request = app.iframe.getCanGoBack();
      setTimeout(function(){
          console.log("RESULT=" + request.result)
          if (request.result){
            app.iframe.goBack();
          } else {
            window.wrappedJSObject.StackManager.goPrev();
          }
      },50); 

      /* 
      The following code will not work, got "Permission denied to access object" 
          when onsuccess was triggered

      request.onsuccess = function(){
          if (this.result){
            app.iframe.goBack();
          } else {
            window.wrappedJSObject.StackManager.goPrev();
          }
      }
      */
    }, true);
    buttons.appendChild(back);
    
    window.addEventListener('orientationchange', function(){
      //console.log("ORIENTATION CHANGED")
      if (window.screen.mozOrientation.includes('landscape')){
        back.style.left = "-10px";
        back.style.top = "";
        back.style.bottom = "1.5rem";
        showWindows.style.right = "";
        showWindows.style.top = "1.5rem";
        showWindows.style.left = "-10px";
      } else {
        back.style.left = "1rem";
        back.style.top = "0";
        back.style.bottom = "";
        showWindows.style.right = "1rem";
        showWindows.style.top = "0";
        showWindows.style.left = "";
      }
    })
  }

  // Make sure we have the homebar element before booting.
  if (document.getElementById('software-buttons')) {
    init();
  } else {
    window.addEventListener('mozContentEvent', function readyListener(e) {
      if (e.detail.type === 'system-message-listener-ready') {
        window.removeEventListener('mozContentEvent', readyListener);
        init();
      }
    });
  }

}());
