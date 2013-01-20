/*
 * 	Dynamic Title 1.0 - jQuery plugin
 *	written by Dmitry Beskorsy aka dVb	
 *	http://dvbscript.ru
 *
 *	Copyright (c) 2012 Dmitry Beskorsy (http://dvbscript.ru)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */



        (function ($) {
            $.dsOffsetWindow = function (elem, point, fromBottomOrRight) {
                fromBottomOrRight = fromBottomOrRight || false;
                var result;
                var elemHeight = elem.height();
                var elemWidth = elem.width();
                var elemOffset = elem.offset();
                var elemTop = elemOffset.top - $(window).scrollTop();
                var elemLeft = elemOffset.left - $(window).scrollLeft();
                result = ((point == 'top') || (point == 'bottom'))
                 ? ($.dsOffsetWindow.point[point].call(this,elemTop, elemHeight, fromBottomOrRight))
                  : ($.dsOffsetWindow.point[point].call(this,elemLeft, elemWidth, fromBottomOrRight));

                return result;
            };

          $.dsOffsetWindow.point = {
            top: function(elemTop, elemHeight, fromBottomOrRight) {
              return elemTop;
            },
            bottom: function(elemTop, elemHeight, fromBottomOrRight) {
              return elemTop + elemHeight;
            },
            left: function(elemLeft, elemWidth, fromBottomOrRight) {
              return elemLeft;
            },
            right: function(elemLeft, elemWidth, fromBottomOrRight) {
                if(fromBottomOrRight == true) return $(window).width() - (elemLeft + elemWidth);
                else return elemLeft + elemWidth;
            }
          };
        })(jQuery);

        (function ($) {
            $.fn.dsMovePosition = function () {
                var this$ = $(this).children();
                var float = this$.css("float");
                if (float != 'none') {
                    $(this).css("float", float);
                    this$.css("float", 'none');
                }
                var pl = this$.css("left");
                if (pl != 'auto') {
                    this$.css("left", 0);
                    $(this).css("left", pl);
                }
                var pt = this$.css("top");
                if (pt != 'auto') {
                    this$.css("top", 0);
                    $(this).css("top", pt);
                }

            }

            $.dsGetWinWithTite = function (title, spliter) {
                var result;
                var titleArr = title.split(spliter);
                if(titleArr.length <= 1 ) return '<div class="dynamictitle-body">' + title + '</div>';
                else{
                    return '<div class="dynamictitle-title">' + titleArr[0] + '</div><div class="dynamictitle-body dynamictitle-body-wt">' + titleArr[1] + '</div>';
                }
            }

            $.fn.dynamictitle = function (options) {
                var settings = $.extend({
                    tagattr: 'title', 
                    titleSplitter: '::', 
                    stickWinWidth: 300, 
                    lageElementSize: 500, 
                    margin: 5, 
                    speedTitleShow: 300,
                    changePositionSpeed: 500, 
                    collapseSpeed: 150, 
                    expandSpeed: null, 
                    leftOffset: 0, 
                    movingTitle: true, 
                    closeLabel: 'Свернуть',
                    expandLabel: 'Развернуть',
                    stickWinClass: 'stickWin'
                }, options || {});

                var t;

                settings.expandSpeed = settings.expandSpeed || settings.collapseSpeed;

                function createStickWin(whereAppentTo, stickWinContent){
                    var stickWinContent = stickWinContent;
                    var stickWin = '<div class="stickWin" style="display: none; padding: 0px; position: absolute; z-index: 1000;">   <div style="position: absolute;  width: 100%; right: 5px; top: -33px; display: none;" class="ds-help-collapse"><div style="background: none repeat scroll 0% 0% rgb(255, 255, 255); float: right; padding: 5px; opacity: 0.6;">' + settings.closeLabel + '</div></div>    <div style="position: absolute;  width: 100%; left: 5px; top: -33px; display: none;" class="ds-help-expand"><div style="background: none repeat scroll 0% 0% rgb(255, 255, 255); float: left; padding: 5px; opacity: 0.6;">' + settings.expandLabel + '</div></div>    <div class="dynamictitle-close"></div>' + $.dsGetWinWithTite(stickWinContent, settings.titleSplitter) + '</div>';
                    $(stickWin).appendTo(whereAppentTo);
                    var $stickWin = $(".stickWin");
                    return $stickWin;
                }

                function getElemIndents(elem){
                    var this$ = elem;
                    var inds = [];

                    inds ['epl'] = parseInt(this$.css("padding-left"));
                    inds ['epr'] = parseInt(this$.css("padding-right"));
                    inds ['ept'] = parseInt(this$.css("padding-top"));
                    inds ['epb'] = parseInt(this$.css("padding-bottom"));

                    inds ['eml'] = parseInt(this$.css("margin-left"));
                    inds ['emr'] = parseInt(this$.css("margin-right"));
                    inds ['emt'] = parseInt(this$.css("margin-top"));
                    inds ['emb'] = parseInt(this$.css("margin-bottom"));

                    return inds;
                }

                function core(obj){
                    var this$=obj.this$;
                    var offsetW = obj.OffsetWindow;
                    var stickWinHeight = obj.stickWinHeight;
                    var spanHeight = obj.spanHeight;
                    var elemHeight = obj.elemHeight;
                    var elemIndents = getElemIndents(obj.this$);

                    var stickWinTop = ((offsetW + stickWinHeight + settings.margin + elemIndents['ept'] + 0) < $(window).height())
                        ? settings.margin + spanHeight - elemIndents['epb'] - elemIndents['emb']
                        : ((((offsetW - elemHeight) - (stickWinHeight + settings.margin - elemIndents['ept'] - 0)) > 0)
                        ? -(elemHeight + stickWinHeight + settings.margin + settings.margin - spanHeight + elemIndents['epb'] + elemIndents['emb'])
                        : ((offsetW + elemIndents['ept'] + 0 < $(window).height())
                            ? -(stickWinHeight - spanHeight + elemIndents['epb'] + elemIndents['emb']) 
                            : -(offsetW - $(window).height() + stickWinHeight - spanHeight + elemIndents['ept'] + 0 + elemIndents['epb'] + elemIndents['emb'])));

                    return stickWinTop;
                }

                function makeCloseButtn(obj){
                var this$=obj.this$;
                var $stickWin = obj.$stickWin;
                t = parseInt($stickWin.css('top')); 
                var l = parseInt($stickWin.css('left'));
                var elemHeight = obj.elemHeight;
                var elemIndents = getElemIndents(obj.this$);

                if(($.dsOffsetWindow($stickWin, 'bottom') - 10 - elemIndents['ept'] - 0  < $.dsOffsetWindow(this$, 'bottom')) 
                    && ($.dsOffsetWindow($stickWin, 'bottom') - elemIndents['ept'] - 0 - elemIndents['epb'] - 0 - 10 > ($.dsOffsetWindow(this$, 'bottom')- elemHeight ))){

                    if($(".dynamictitle-close").length == 0){
                    }
                    $(".dynamictitle-close").show();
                    }
                    else{
                    $(".dynamictitle-close").hide();
                    $('.dynamictitle-closed').triggerHandler('click');
                    $('.dynamictitle-close').removeClass('dynamictitle-closed'); 
                    }
                }


                function leftPos(obj, pageX){
                    pageX = pageX || 0;

                    var elemWidth = obj.elemWidth;
                    var OffsetWindow = obj.OffsetWindowLeft;
                    var stickWinWidth = obj.stickWinWidth;
                    var elemIndents = getElemIndents(obj.this$);

                    var stickWinLeft;
                    stickWinLeft = (elemWidth < settings.lageElementSize) ? settings.leftOffset : 0;

                    stickWinLeft = ((OffsetWindow + stickWinWidth + settings.leftOffset) > $(window).width())
                        ? -stickWinWidth + elemWidth - settings.leftOffset
                        : stickWinLeft;
                    stickWinLeft = (OffsetWindow + settings.leftOffset + pageX <= 0) 
                        ? stickWinLeft - (OffsetWindow + settings.leftOffset + pageX) : stickWinLeft;
                        var rightSideOfStick = OffsetWindow + stickWinLeft + stickWinWidth; 
                        var hiddenPartOfStick = rightSideOfStick - $(window).width(); 
                        var mousemoveHiddenPartOfStick = pageX+hiddenPartOfStick;
                        stickWinLeft = (mousemoveHiddenPartOfStick > 0) ? stickWinLeft - mousemoveHiddenPartOfStick : stickWinLeft; 

                        return stickWinLeft + elemIndents['epl'] + elemIndents['eml'];
                    }

                this.each(function () {

                    var stickWinContent = $(this).attr(settings.tagattr);

                    $(this)
                    .wrap('<span class="dsaltertitle-elem-wraper" style="position:relative;"></span>')
                    .parent()
                    .dsMovePosition();

                    var this$ = $(this);

                    var epl = parseInt(this$.css("padding-left"));
                    var epr = parseInt(this$.css("padding-right"));
                    var ept = parseInt(this$.css("padding-top"));
                    var epb = parseInt(this$.css("padding-bottom"));

                    var eml = parseInt(this$.css("margin-left"));
                    var emr = parseInt(this$.css("margin-right"));
                    var emt = parseInt(this$.css("margin-top"));
                    var emb = parseInt(this$.css("margin-bottom"));

                    var elemWidth = this$.width();
                    var elemHeight = this$.height();

               $(this).parent().hover(function () {

                    this$.attr(settings.tagattr , "");

                    $stickWin = createStickWin($(this), stickWinContent);

                    var stickWinWidth = (settings.lageElementSize > 0) 
                     ? ((elemWidth > settings.lageElementSize)
                      ? elemWidth 
                       : settings.stickWinWidth)
                      : (settings.stickWinWidth) || (elemWidth) ;
                    $stickWin.css("width", stickWinWidth);

                    var stickWinHeight = $stickWin.height();
                    var spanHeight = parseInt(this$.css('font-size'));

                     var objHoverVars = {
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        spanHeight: spanHeight,
                        this$: this$,
                        $stickWin: $stickWin,
                        OffsetWindow: $.dsOffsetWindow(this$, 'bottom'),
                        OffsetWindowLeft: $.dsOffsetWindow(this$, 'left'),
                        stickWinHeight: stickWinHeight,
                        stickWinWidth: stickWinWidth                        
                     };

                    var stickWinLeft = leftPos(objHoverVars);
                    var stickWinTop = core( objHoverVars ); 

                    $stickWin.fadeIn(settings.speedTitleShow); 

                    $stickWin.css({
                        "height": stickWinHeight,
                        "top": stickWinTop,
                        "left": stickWinLeft
                    });

                    if($(this).css("float") != 'none'){
                        $stickWin.css({
                            "top": stickWinTop - spanHeight + epb + ept + emb + emt  + elemHeight,
                        });
                        var float = true;
                    }

                     makeCloseButtn(objHoverVars);

                    var w = parseInt($stickWin.css('width'));
                    var h = parseInt($stickWin.css('height'));
                    $(".dynamictitle-close").toggle(function(){
                        $('.ds-help-collapse').hide();
                        $stickWin.animate({
                                top: parseInt($stickWin.css('top'))+stickWinHeight-30,
                                left: epl+eml,
                                width: 30,
                                height: 30,
                            },
                            settings.collapseSpeed,
                            function(){ 
                                $('.dynamictitle-title').hide();
                                $('.dynamictitle-body').hide();
                                $('.dynamictitle-close').addClass('dynamictitle-closed'); 
                            }
                            );
                        },
                        function(){
                            $('.ds-help-expand').hide();
                            $('.dynamictitle-title').show();
                            $('.dynamictitle-body').show();
                            $('.dynamictitle-close').removeClass('dynamictitle-closed'); 
                            $stickWin.animate({
                                top: t,
                                width: w,
                                height: h,
                                },
                                settings.expandSpeed,
                                function(){}
                            );
                        }
                    );

                     $('.dynamictitle-close:not(".dynamictitle-closed")').live('mouseover',
                     function(){
                        $('.ds-help-collapse').fadeIn(100);
                     });
                     $('.dynamictitle-closed').live('mouseover',
                     function(){
                        $('.ds-help-expand').fadeIn(100);
                     });
                     $('.dynamictitle-close').live('mouseout',
                     function(){
                        $('.ds-help-collapse').fadeOut(100);
                        $('.ds-help-expand').fadeOut(100);
                     });
                     
                    $(window).bind('scroll.stickWin', function (event) {
                        var stickWinTopNow = stickWinTop; 

                        objHoverVars.OffsetWindow = $.dsOffsetWindow(this$, 'bottom');

                        stickWinTop = core( objHoverVars );

                        if(stickWinTop != stickWinTopNow) {
                            if(float == true){
                                $stickWin.animate({
                                    top: stickWinTop - spanHeight + elemHeight + epb + ept + emb + emt,
                                },settings.changePositionSpeed, function(){makeCloseButtn(objHoverVars);});
                            }
                            else{
                                   $stickWin.animate({
                                      top: stickWinTop
                                    },
                                    settings.changePositionSpeed, function(){makeCloseButtn(objHoverVars);});
                                 }
                         }
                });

                if(elemWidth < settings.lageElementSize && settings.movingTitle == true){
			    $(this).mousemove(function(e){
                      var e_pageX = e.pageX - $.dsOffsetWindow(this$, 'left');
                      var ll = e_pageX + leftPos(objHoverVars,e_pageX);
                    $stickWin.css({
                        "left": ll 
                    });
			    });
                }	

            },
            function () {
                $(".stickWin").remove();
                $(window).unbind('scroll.stickWin');
            });
                });
        };
    })(jQuery);

