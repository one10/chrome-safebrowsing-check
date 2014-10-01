// Check a URL in blacklists extension
// https://github.com/one10/

function openGsbTab(target_url) {
    prefix = localStorage["gsb_url"] ? localStorage["gsb_url"] : "http://www.google.com/safebrowsing/diagnostic?site="
    newURL = prefix + encodeURIComponent(target_url);
    chrome.tabs.create({
        url: newURL,
        active: false
    });
}

function openYsbTab(target_url) {
    prefix = localStorage["ysb_url"] ? localStorage["ysb_url"] : "http://yandex.ru/infected?url="
    newURL = prefix + encodeURIComponent(target_url);
    chrome.tabs.create({
        url: newURL,
        active: false
    });
}

function click(e) {
    target_url = document.querySelector('#urlbox').value
    if (target_url.lastIndexOf("http://", 0) !== 0) {
        target_url = "http://" + target_url;
    }
    openYsbTab(target_url);
    openGsbTab(target_url);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form')[0].addEventListener('submit', click);
});