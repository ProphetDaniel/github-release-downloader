'use strict';
var XMLHttpRequest = require("xhr2");

function loadJSON(path, success, error)
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function GetLatestGitHubReleaseInfo(repo) {
  return new Promise(resolve => {
    loadJSON("https://api.github.com/repos/"+repo+"/releases/latest", function(release) {
      let tuppleList = [];
      let IsRelease = (url) => {
        return !url.endsWith("sig") && !url.endsWith("asc");
      };
      let oneHour = 60 * 60 * 1000;
      let oneDay = 24 * oneHour;
      release.assets.filter(asset => IsRelease(asset.browser_download_url))
        .forEach((casset) => {
          let dateDiff = new Date() - new Date(casset.updated_at);
          let timeAgo;
          if (dateDiff < oneDay)
            timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
          else
            timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
          tuppleList.push({count: casset.download_count, url: casset.browser_download_url, timeAgo: timeAgo})
        })

      let returnStructVar = {
        releaseName: release.name,
        downloadList: tuppleList
      }
      resolve(returnStructVar);
    },
    function(xhr) {
      throw new URIError("Error loading JSON!");
    });
  }, 2000);
}

function factory (type, config, load, typed) {
  /**
   * Clone an object.
   *
   * Syntax:
   *
   *     math.clone(x)
   *
   * Examples:
   *
   *    math.clone(3.5);                   // returns number 3.5
   *    math.clone(math.complex('2-4i'); // returns Complex 2 - 4i
   *    math.clone(math.unit(45, 'deg'));  // returns Unit 45 deg
   *    math.clone([[1, 2], [3, 4]]);      // returns Array [[1, 2], [3, 4]]
   *    math.clone("hello world");         // returns string "hello world"
   *
   * @param {*} x   Object to be cloned
   * @return {*} A clone of object x
   */
  var get = typed('get', {
    'string': GetLatestGitHubReleaseInfo,
  });

  get.toTex = {1: '\\left|${args[0]}\\right|'};

  return get;
}

exports.name = 'get';
exports.factory = factory;