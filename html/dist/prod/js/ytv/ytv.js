//Be sure to check ytv.ashx and set the URL to the respective deployment environment.
//var _ytvDomain = "http://localhost:41745";
//var _ytvDomain = "http://dev.partner.corusinteractive.com";
var _ytvDomain = "http://partner.corusinteractive.com";


var _ytvCB = new Date().getTime();

//document.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"/content/ytv/main.css?_=" + _ytvCB + "\" />");
//document.write("<script type=\"text/javascript\" src=\"/content/ytv/scripts/s_code.js?_=" + _ytvCB + "\"></scri" + "" + "pt>");

document.write("<link type=\"text/css\" rel=\"stylesheet\" href=\"" + _ytvDomain + "/content/ytv/main.css?_=" + _ytvCB + "\" />");
document.write("<script type=\"text/javascript\" src=\"" + _ytvDomain + "/content/ytv/scripts/s_code.js?_=" + _ytvCB + "\"></scri" + "" + "pt>");

(function ($) {
    var _ytvFullURL = window.location.href;
    var _ytvBasePartnerURL = "/ytv.ashx?p=";
    var _ytvPath = window.location.pathname;
    var _ytvComScore = "3005670";

    if(typeof(_ytvLoader) != 'undefined') { _ytvBasePartnerURL = _ytvLoader; }

    if (_ytvPath.length > 1) { _ytvPath = _ytvPath.substring(1); }

    $.extend($, {
        ytvHeaderNoTracking: function (showId, customPath) {
            //render header script  
            var scPath = customPath || _ytvPath;
            var scriptPath = _ytvBasePartnerURL + "headernt/" + showId + "/" + scPath.replace(/\//gi, ';');

            $("#ytv-header-container").load(scriptPath);
        },
        ytvHeader: function (showId, customPath) {
            //render header script  
            var scPath = customPath || _ytvPath;
            var scriptPath = _ytvBasePartnerURL + "header/" + showId + "/" + scPath.replace(/\//gi, ';');

            $("#ytv-header-container").load(scriptPath);
        },
        ytvFooter: function () {
            var scriptPath = _ytvBasePartnerURL + "footer";
            $("#ytv-footer-container").load(scriptPath);
        }
    });
})(jQuery);