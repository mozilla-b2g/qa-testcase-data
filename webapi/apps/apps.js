var BASE_PATH = 'http://mozilla.github.io/qa-testcase-data/webapi/apps/';

function handleAppRequest(request) {
  request.onsuccess = function(e) {
    var app = e.target.result;

    app.onprogress = function() {
      console.log('onprogress fired with ' + app.progress);
    };

    alert("Success installing app : " + app.manifest.name);
  };

  request.onerror = function(e) {
    alert("Error installing app : " + e.target.error.name);
  };
}

function installHostedApp() {
  var manifest = document.getElementById('hostedAppManifest').value;
  var request = navigator.mozApps.install(BASE_PATH + manifest);
  handleAppRequest(request);
}

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('installHostedApp').onclick = installHostedApp;
});
