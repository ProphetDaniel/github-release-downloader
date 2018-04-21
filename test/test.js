var assert = require('assert');
import {GetLatestGitHubReleaseInfo} from "../src/GetLatestGitHubReleaseInfo"

describe('Array', function() {
  it('should get repo info', async function() {
    let info = await GetLatestGitHubReleaseInfo("ethereumproject/go-ethereum")
    assert(info.releaseName.startsWith('Ethereum Classic Geth'))
    console.log(info.releaseName + " was updated " + info.timeAgo + " and downloaded " + info.downloadCount.toLocaleString() + " times.")
    console.log(info.downloadUrl);
  });
});