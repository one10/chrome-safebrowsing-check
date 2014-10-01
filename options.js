// Check a URL in blacklists extension
// https://github.com/one10/

// Saves options to localStorage
function save_options() {
    var input = document.getElementById("ysb_url");
    var url_prefix = input.value;


    localStorage["ysb_url"] = url_prefix;

    var input = document.getElementById("gsb_url");
    var url_prefix = input.value;
    localStorage["gsb_url"] = url_prefix;
}

function restore_options() {

    var ysb_url = localStorage["ysb_url"];
    if (!ysb_url) {
        return;
    }

    var gsb_url = localStorage["gsb_url"];
    if (!gsb_url) {
        return;
    }

    var input = document.getElementById("ysb_url");
    input.value = ysb_url;

    var input = document.getElementById("gsb_url");
    input.value = gsb_url;

}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);