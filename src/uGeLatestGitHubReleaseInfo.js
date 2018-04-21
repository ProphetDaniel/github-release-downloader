async function uGetLatestGitHubReleaseInfo(repo) {
  return new Promise(resolve => {
    $.getJSON("https://api.github.com/repos/"+repo+"/releases/latest").done(function(release) {
      var asset = release.assets[0];
      var downloadCount = 0;
      for (var i = 0; i < release.assets.length; i++) {
        downloadCount += release.assets[i].download_count;
      }
      var oneHour = 60 * 60 * 1000;
      var oneDay = 24 * oneHour;
      var dateDiff = new Date() - new Date(asset.updated_at);
      var timeAgo;
      if (dateDiff < oneDay)
        timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
      else
        timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
      var returnStructVar = {
        timeAgo: timeAgo,
        releaseName: release.name,
        downloadUrl: asset.browser_download_url,
        downloadCount: downloadCount,
        releaseInfo: release.name + " was updated " + timeAgo + " and downloaded " + downloadCount.toLocaleString() + " times.",
      }
      resolve(returnStructVar);
    });
  }, 2000);
}

module.exports = {
  uGetLatestGitHubReleaseInfo: uGetLatestGitHubReleaseInfo,
};