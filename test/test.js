var assert = require('assert');
import {GetLatestGitHubReleaseInfo} from "../src/GetLatestGitHubReleaseInfo"

// (async () => {
//   let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum");
//   $(".download").attr("href", info.downloadUrl);
//   $(".release-info").text(info.releaseInfo);
//   $(".release-info").fadeIn("slow");
// })();

describe('Array', function() {
  it('should get repo info', async function() {
    let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum")
    assert(info.releaseName.startsWith('Ethereum Classic Geth'))
    console.log(info.downloadUrl)
  });
});