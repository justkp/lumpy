/*
 *********************************************************
 * Home Page
 *********************************************************
 */

var Home = PageCore.extend({
    init: function() {
        arguments.callee.$.init.call(this);
        YTVAds.initLetterBox();
        InstagramFeed.init();
        this.mapInfo();
        this.autoReveal();
        this.starReveal();

    },
    mapInfo: function() {
        var question = '.question'
        var answer = '.answer'
        var plusminus = '.map-plus-minus'

    	$(question).click(function(event){
            if ($(this).children(answer).css('display') == 'block') {
                $(this).children(answer).css('display','none');      
                $(this).children('.city').children(plusminus).css('background-position','0 0');
                $('.star').removeClass('hovered');
            }
            else {
                var index = $(this).index();
                $(answer).css('display','none');
                $(plusminus).css('background-position','0 0');
                $('.star').removeClass('hovered');
                $(this).children(answer).css('display','block');
                $(this).children('.city').children(plusminus).css('background-position','100% 0');
                $('.star').eq(index).toggleClass('hovered');
            }
		});
		// $(question).hover(function(event){
  //           if ($(this).children(answer).css('display') == 'block') {
  //               $(this).children(answer).css('display','none')
  //           }
  //           else {
  //               $(answer).css('display','none');
  //               $(this).children(answer).css('display','block');    
  //           }
		// });
    },
    autoReveal: function() {
      setTimeout(function(){
        $('.answer').eq(0).css('display','block');
        $('.map-plus-minus').eq(0).css('background-position','100% 0');
        $('.star').eq(0).toggleClass('hovered');
      }, 1000);
    },
    starReveal: function() {
      $('.star').click(function(event){
        $('.answer').hide();
        $('.map-plus-minus').css('background-position','0 0');
        $('.star').removeClass('hovered');
        var index = $(this).index()-1;
        $('.answer').eq(index).show();
        $('.map-plus-minus').eq(index).css('background-position','100% 0');
        $(this).toggleClass('hovered');
      });
    }    
});



// $(".star").on('click',function(){
//   var index = $(this).index()-1;
//   $('.answer').eq(index).show();
// });