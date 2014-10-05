// Check a URL in blacklists extension
// https://github.com/one10/

var extraChecksScript = "./extra_checks.js";

// defaults
var blacklistData = new Array();
blacklistData.push({
    'url': 'http://yandex.ru/infected?url=',
    'handler': getBackgroundBl,
    'name': 'gsb'
});
blacklistData.push({
    'url': 'http://www.google.com/safebrowsing/diagnostic?site=',
    'handler': getBackgroundBl,
    'name': 'ysb'
});
// phishtank is just the front page so didn't bother with options
blacklistData.push({
    'url': 'http://www.phishtank.com/',
    'handler': postToPhishtank,
    'name': 'phishtank'
});


function getBlacklistUrlFromOpts(blacklistObj) {
    blacklistName = blacklistObj.name;
    return localStorage[blacklistName + "_url"] ? localStorage[blacklistName + "_url"] : blacklistObj.url;
}

// this one is very phishtank-specific and will change
function postToPhishtank(blacklistUrl, targetUrl) {
    chrome.tabs.create({
        url: blacklistUrl,
        active: true
    }, function(tab) {


        chrome.tabs.executeScript(tab.id, {
            code: "document.getElementsByName('isaphishurl')[0].value='" 
                + targetUrl + "';document.getElementsByTagName('form')[1].submit();"
        }, null);
    });
    window.close();
}

function getBackgroundBl(blacklistUrl, targetUrl) {
    targetUrl = blacklistUrl + encodeURIComponent(targetUrl);
    chrome.tabs.create({
        url: targetUrl,
        active: false
    });
}

function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL(scriptName);
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}

function click(e) {
    loadScript(extraChecksScript, process);
}

function process() {
    targetUrl = document.querySelector('#urlbox').value
    if (targetUrl.lastIndexOf("http://", 0) !== 0) {
        targetUrl = "http://" + targetUrl;
    }
    var arrayLength = blacklistData.length;
    for (var i = 0; i < arrayLength; i++) {
        blacklistData[i].handler(getBlacklistUrlFromOpts(blacklistData[i]), targetUrl);
    }
}

// action for the extension popup form
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form')[0].addEventListener('submit', click);
});
