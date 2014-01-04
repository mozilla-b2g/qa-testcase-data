var ORIGIN = window.location.protocol + '://' + window.location.host;
var BASE_PATH = ORIGIN + '/qa-testcase-data/webapi/apps/';

function handleAppRequest(request) {
  request.onsuccess = function(e) {
    var app = e.target.result;

    app.ondownloadsuccess = function () {
      alert('Success downloading app : ' + app.manifest.name);
    };

    app.ondownloaderror = function () {
      alert('Error downloading app : ' + app.downloadError.name);
    };

    app.ondownloadavailable = function () {
      console.log('ondownloadavailable fired : ' + app.manifest.name);
    };

    app.ondownloadapplied = function () {
      console.log('ondownloadapplied fired : ' + app.manifest.name);
    };

    app.onprogress = function () {
      console.log('onprogress fired with ' + app.progress);
    };
  };

  request.onerror = function (e) {
    alert('Error installing app : ' + e.target.error.name);
  };
}

function installHostedApp() {
  var manifest = document.getElementById('hostedAppManifest').value;
  var request = navigator.mozApps.install(BASE_PATH + manifest);
  handleAppRequest(request);
}

function installPackagedApp() {
  var miniManifest = document.getElementById('packagedAppMiniManifest').value;
  var request = navigator.mozApps.installPackage(miniManifest);
  handleAppRequest(request);
}

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('installHostedApp').onclick = installHostedApp;
  document.getElementById('installPackagedApp').onclick = installPackagedApp;
});
