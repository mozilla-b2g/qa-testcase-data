var BASE_PATH = 'http://mozilla.github.io/qa-testcase-data/webapi/apps/';

function handleAppRequest(request) {
  request.onsuccess = function(e) {
    var app = e.target.result;

    app.ondownloadsuccess = function () {
      alert('Success downloading app : ' + app.manifest.name);
    };

    app.ondownloaderror = function () {
      alert('Error downloading app : ' + app.downloadError);
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

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('installHostedApp').onclick = installHostedApp;
});
