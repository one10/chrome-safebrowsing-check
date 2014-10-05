// Check a URL in blacklists extension
// https://github.com/one10/

// defaults
var blacklistUrls = new Array();
blacklistUrls['ysb'] = "http://yandex.ru/infected?url=";
blacklistUrls['gsb'] = "http://www.google.com/safebrowsing/diagnostic?site=";
// phishtank is just the front page so didn't bother with options
blacklistUrls['phishtank'] = "http://www.phishtank.com/";

function getBlacklistUrlFromOpts(blacklistName) {
    return localStorage[blacklistName + "_url"] ? localStorage[blacklistName + "_url"] : blacklistUrls[blacklistName];
}

// this one is very phishtank-specific and will change
function postToPhishtank(targetUrl, tabId) {
    chrome.tabs.executeScript(tabId, {
        code: "document.getElementsByName('isaphishurl')[0].value='" 
                + targetUrl + "';document.getElementsByTagName('form')[1].submit();"
    }, null);
}

function openActiveTab(blacklistUrl, targetUrl, blacklistHandler) {
    chrome.tabs.create({
        url: blacklistUrl,
        active: true
    }, function(tab) {
        blacklistHandler(targetUrl, tab.id);
    });
    alert('submitted');
}

function openBackgroundBlacklistByGet(blacklistUrl, targetUrl) {
    targetUrl = blacklistUrl + encodeURIComponent(targetUrl);
    chrome.tabs.create({
        url: targetUrl,
        active: false
    });
}

function click(e) {
    targetUrl = document.querySelector('#urlbox').value
    if (targetUrl.lastIndexOf("http://", 0) !== 0) {
        targetUrl = "http://" + targetUrl;
    }
    openBackgroundBlacklistByGet(getBlacklistUrlFromOpts("ysb"), targetUrl);
    openBackgroundBlacklistByGet(getBlacklistUrlFromOpts("gsb"), targetUrl);
    openActiveTab(getBlacklistUrlFromOpts("phishtank"), targetUrl, postToPhishtank);
}

// action for the extension popup form
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form')[0].addEventListener('submit', click);
});
