import {GetLatestGitHubReleaseInfo} from "./GetLatestGitHubReleaseInfo"

(async () => {
  let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum");
  $(".download").attr("href", info.downloadUrl);
  $(".release-info").text(info.releaseInfo);
  $(".release-info").fadeIn("slow");
})();