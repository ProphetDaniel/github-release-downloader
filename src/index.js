import {uGetLatestGitHubReleaseInfo} from "./uGeLatestGitHubReleaseInfo"

(async () => {
  let info = await uGetLatestGitHubReleaseInfo("ethereumproject/go-ethereum");
  $(".download").attr("href", info.downloadUrl);
  $(".release-info").text(info.releaseInfo);
  $(".release-info").fadeIn("slow");
})();