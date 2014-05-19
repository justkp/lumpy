/*
 *********************************************************
 * Page Core
 * - Gets extended by each of the pages
 * - Only one page class should be initialized per page
 *********************************************************
 */

var PageCore = CoreClass.extend({
    init: function() {
        var self = this;

        // single resize function - get called when the window resizes and on initialize
        $(window).resize(function() {
            self.resize();
        });
        this.resize();
        this.ytvHeader();
        this.twitterFeed();
        InstagramFeed.init();
    },

    ytvHeader: function () {
    	YTVHeaderFooter.init();
    },

    twitterFeed: function () {
    	SocialFeeds.initTwitter();
    },

    resize:function(){}
});