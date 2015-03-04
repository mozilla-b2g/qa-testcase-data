var ORIGIN = window.location.protocol + '//' + window.location.host;
var BASE_PATH = ORIGIN + '/qa-testcase-data/hermescheng/short_name-support/';
console.log("Base path: " + BASE_PATH);

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

function installHostedApp(manifest) {
  console.log("manifest file name: " + manifest);
  var request = navigator.mozApps.install(BASE_PATH + manifest);
  handleAppRequest(request);
}

function installPackagedApp(manifest) {
  console.log("manifest file name: " + manifest);
  var request = navigator.mozApps.installPackage(BASE_PATH + miniManifest);
  handleAppRequest(request);
}
