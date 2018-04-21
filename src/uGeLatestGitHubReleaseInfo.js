async function uGetLatestGitHubReleaseInfo(repo) {
  return new Promise(resolve => {
    $.getJSON("https://api.github.com/repos/"+repo+"/releases/latest").done(function(release) {
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
    });
  }, 2000);
}

module.exports = {
  uGetLatestGitHubReleaseInfo: uGetLatestGitHubReleaseInfo,
};