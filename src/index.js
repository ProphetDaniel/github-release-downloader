import {uGetLatestGitHubReleaseInfo} from "./uGeLatestGitHubReleaseInfo"

(async () => {
  let info = await uGetLatestGitHubReleaseInfo("ethereumproject/go-ethereum");
  let matchesPattern = (url) => {
    return url.endsWith("tar.gz") && url.includes("linux");
  };
  let downloadName = (url) => {
    return url.slice(url.lastIndexOf('/')+1)
  };
  let selectedDownload = info.downloadList.filter(download => matchesPattern(download.url)).pop()
  $(".download").attr("href", selectedDownload.url);
  $(".release-info").text(downloadName(selectedDownload.url) + " was updated " + selectedDownload.timeAgo + " and downloaded " + selectedDownload.count.toLocaleString() + " times.");
  $(".release-info").fadeIn("slow");
})();