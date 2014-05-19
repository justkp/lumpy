/*
 *********************************************************
 * Automatically initialize the page based on 
 * data-page-id in the body
 *********************************************************
 */

var pageID = document.body.getAttribute("data-js-class").toString();
if (pageID){
	var page = new window[pageID];
	page.init();
}