function handlePushMessage(message) {
  console.log('push message received');
  console.log('endpoint: ' + message.pushEndpoint);
  console.log('version: ' + message.version);
}

function registerEndPoint() {
  var outputResult = document.getElementById('endPointRegisteredResult');
  var request = navigator.push.register();

  console.log('navigator.push.register is called');

  request.onsuccess = function(e) {
    var endPoint = e.target.result;
    console.log('register success fired with endpoint: ' + endPoint);

    outputResult.textContent = 'End point registered: ' + endPoint;
  };

  request.onerror = function(err) {
    console.log('register onerror fired with: ' + err.target.error.name);
    outputResult.textContent = 'Error : ' + err.target.error.name;
  };
}

function unregisterEndPoint(endPoint) {
  var request = navigator.push.unregister(endPoint);
  var unregisterStatusUI = document.getElementById('unregistrationStatus');

  request.onsuccess = function(e) {
    var result = e.target.result;
    console.log('unregister success fired with: ' + result);

    unregisterStatusUI.textContent = 'Unregistered: ' + endPoint;
  };

  request.onerror = function(err) {
    console.log('unregister onerror fired with: ' + err.target.error.name);
    unregisterStatusUI.textContent = 'Error: ' + err.target.error.name;
  };
}

function updateCurrentRegistrations() {
  var currentRegistrationsUI = document.getElementById('currentRegistrations');

  while(currentRegistrationsUI.firstChild) {
    currentRegistrationsUI.removeChild(currentRegistrationsUI.firstChild);
  }

  console.log('Retrieve current registrations');
  var registrationsResult = navigator.push.registrations();

  registrationsResult.onsuccess = function(e) {
    var currentRegistrationsData = e.target.result;
    var index = 0;

    for(var currentRegistration of currentRegistrationsData) {
      console.log('End point: ' + currentRegistration.pushEndpoint);
      console.log('Version: ' + currentRegistration.version);

      var currentRegistrationDisplay = document.createElement('p');
      currentRegistrationDisplay.textContent = 'End point: ' + currentRegistration.pushEndpoint + ', version: ' + currentRegistration.version;
      currentRegistrationsUI.appendChild(currentRegistrationDisplay);

      var unregisterEndPointUI = document.createElement('input');
      unregisterEndPointUI.setAttribute('type', 'submit');
      unregisterEndPointUI.setAttribute('value', 'unregister');
      unregisterEndPointUI.setAttribute('data-pushEndPoint', currentRegistration.pushEndpoint);
      unregisterEndPointUI.onclick = function(evt) {
        var target = evt.target;
        var pushURL = target.getAttribute('data-pushEndPoint');
        console.log('onclick fired for : ' + pushURL);

        unregisterEndPoint(pushURL);
      };

      currentRegistrationsUI.appendChild(unregisterEndPointUI);

      index++;
    }
  };

  registrationsResult.onerror = function(err) {
    console.log('navigator.push.registrations onerror fired with: ' + err.target.error.name);
    var errorElement = document.createElement('p');
    errorElement.textContent = 'Error: ' + err.target.error.name;
    currentRegistrationDisplay.appendChild(errorElement);
  };
}

function installAsApp() {
  var request = navigator.mozApps.install('http://mozilla.github.io/qa-testcase-data/webapi/simplepush/manifest.webapp');

  request.onsuccess = function(e) {
    console.log('Installed successfully');
  };

  request.onerror = function(err) {
    console.log('Error: ' + err.target.error.name);
  };
}

function initialize() {
  navigator.mozSetMessageHandler('push', handlePushMessage);

  document.getElementById('registerPushEndPoint').onclick = registerEndPoint;
  document.getElementById('refreshPushEndPoints').onclick = updateCurrentRegistrations;
  document.getElementById('installApp').onclick = installAsApp;
}

window.addEventListener("DOMContentLoaded", initialize);
