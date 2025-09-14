//ellipsis
if (ntb_anims.ellipsis == true) {!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):factory(jQuery)}(function($){"use strict";function Ellipsis(el,opts){function create(){base.text=base.$cont.text(),base.opts.ellipLineClass=base.opts.ellipClass+"-line",base.$el=$('<span class="'+base.opts.ellipClass+'" />'),base.$el.text(base.text),base.$cont.empty().append(base.$el),init()}function init(){return"number"==typeof base.opts.lines&&base.opts.lines<2?void base.$el.addClass(base.opts.ellipLineClass):(contHeight=base.$cont.height(),void("auto"===base.opts.lines&&base.$el.prop("scrollHeight")<=contHeight||setStartEllipAt&&(words=$.trim(escapeText(base.text)).split(/\s+/),base.$el.html(span+words.join("</span> "+span)+"</span>"),base.$el.find("span").each(setStartEllipAt),null!=startEllipAt&&updateText(startEllipAt))))}function updateText(nth){words[nth]='<span class="'+base.opts.ellipLineClass+'">'+words[nth],words.push("</span>"),base.$el.html(words.join(" "))}function escapeText(text){return String(text).replace(/[&<>"'``\/]/g,function(s){return htmlEntities[s]})}var setStartEllipAt,startEllipAt,resizeTimer,currOffset,lineHeight,contHeight,words,htmlEntities,base=this,currLine=0,lines=[];if(htmlEntities={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","/":"&#x2F;","\\":"&#x5C;"},base.$cont=$(el),base.opts=$.extend({},defaults,opts),"auto"===base.opts.lines){var setStartEllipByHeight=function(i,word){var $word=$(word),top=$word.position().top;return lineHeight=lineHeight||$word.height(),top===currOffset?lines[currLine].push($word):(currOffset=top,currLine+=1,lines[currLine]=[$word]),top+lineHeight>contHeight?(startEllipAt=i-lines[currLine-1].length,!1):void 0};setStartEllipAt=setStartEllipByHeight}if("number"==typeof base.opts.lines&&base.opts.lines>1){var setStartEllipByLine=function(i,word){var $word=$(word),top=$word.position().top;return top!==currOffset&&(currOffset=top,currLine+=1),currLine===base.opts.lines?(startEllipAt=i,!1):void 0};setStartEllipAt=setStartEllipByLine}if(base.opts.responsive){var resize=function(){lines=[],currLine=0,currOffset=null,startEllipAt=null,base.$el.html(escapeText(base.text)),clearTimeout(resizeTimer),resizeTimer=setTimeout(init,100)};$(window).on("resize."+namespace,resize)}create()}var namespace="ntb_ellipsis",span='<span style="white-space: nowrap;">',defaults={lines:"auto",ellipClass:"ellip",responsive:!1};$.fn[namespace]=function(opts){return this.each(function(){try{$(this).data(namespace,new Ellipsis(this,opts))}catch(err){window.console&&console.error(namespace+": "+err)}})}});

(function($){
$('.news-ticker-ntb ul a').ntb_ellipsis({
  lines: 1,             // force ellipsis after a certain number of lines. Default is 'auto'
  ellipClass: 'ntb_ellip',  // class used for ellipsis wrapper and to namespace ellip line
  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
});
})(jQuery);}
//ellipsis

if ( ntb_anims.is_two == true && ntb_anims.disable_anim == false ) {
!function($,undefined){"use strict";function debug(s){$.fn.cycle.debug&&log(s)}function log(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "))}function triggerPause(cont,byHover,onPager){var opts=$(cont).data("cycle.opts");if(opts){var paused=!!cont.cyclePause;paused&&opts.paused?opts.paused(cont,opts,byHover,onPager):!paused&&opts.resumed&&opts.resumed(cont,opts,byHover,onPager)}}function handleArguments(cont,options,arg2){function checkInstantResume(isPaused,arg2,cont){if(!isPaused&&arg2===!0){var options=$(cont).data("cycle.opts");if(!options)return log("options not found, can not resume"),!1;cont.cycleTimeout&&(clearTimeout(cont.cycleTimeout),cont.cycleTimeout=0),go(options.elements,options,1,!options.backwards)}}if(cont.cycleStop===undefined&&(cont.cycleStop=0),(options===undefined||null===options)&&(options={}),options.constructor==String){switch(options){case"destroy":case"stop":var opts=$(cont).data("cycle.opts");return opts?(cont.cycleStop++,cont.cycleTimeout&&clearTimeout(cont.cycleTimeout),cont.cycleTimeout=0,opts.elements&&$(opts.elements).stop(),$(cont).removeData("cycle.opts"),"destroy"==options&&destroy(cont,opts),!1):!1;case"toggle":return cont.cyclePause=1===cont.cyclePause?0:1,checkInstantResume(cont.cyclePause,arg2,cont),triggerPause(cont),!1;case"pause":return cont.cyclePause=1,triggerPause(cont),!1;case"resume":return cont.cyclePause=0,checkInstantResume(!1,arg2,cont),triggerPause(cont),!1;case"prev":case"next":return(opts=$(cont).data("cycle.opts"))?("string"==typeof arg2&&(opts.oneTimeFx=arg2),$.fn.cycle[options](opts),!1):(log('options not found, "prev/next" ignored'),!1);default:options={fx:options}}return options}if(options.constructor==Number){var num=options;return(options=$(cont).data("cycle.opts"))?0>num||num>=options.elements.length?(log("invalid slide index: "+num),!1):(options.nextSlide=num,cont.cycleTimeout&&(clearTimeout(cont.cycleTimeout),cont.cycleTimeout=0),"string"==typeof arg2&&(options.oneTimeFx=arg2),go(options.elements,options,1,num>=options.currSlide),!1):(log("options not found, can not advance slide"),!1)}return options}function removeFilter(el,opts){if(!$.support.opacity&&opts.cleartype&&el.style.filter)try{el.style.removeAttribute("filter")}catch(smother){}}function destroy(cont,opts){opts.next&&$(opts.next).unbind(opts.prevNextEvent),opts.prev&&$(opts.prev).unbind(opts.prevNextEvent),(opts.pager||opts.pagerAnchorBuilder)&&$.each(opts.pagerAnchors||[],function(){this.unbind().remove()}),opts.pagerAnchors=null,$(cont).unbind("mouseenter.cycle mouseleave.cycle"),opts.destroy&&opts.destroy(opts)}function buildOptions($cont,$slides,els,options,o){var startingSlideSpecified,opts=$.extend({},$.fn.cycle.defaults,options||{},$.metadata?$cont.metadata():$.meta?$cont.data():{}),meta=$.isFunction($cont.data)?$cont.data(opts.metaAttr):null;meta&&(opts=$.extend(opts,meta)),opts.autostop&&(opts.countdown=opts.autostopCount||els.length);var cont=$cont[0];if($cont.data("cycle.opts",opts),opts.$cont=$cont,opts.stopCount=cont.cycleStop,opts.elements=els,opts.before=opts.before?[opts.before]:[],opts.after=opts.after?[opts.after]:[],!$.support.opacity&&opts.cleartype&&opts.after.push(function(){removeFilter(this,opts)}),opts.continuous&&opts.after.push(function(){go(els,opts,0,!opts.backwards)}),saveOriginalOpts(opts),$.support.opacity||!opts.cleartype||opts.cleartypeNoBg||clearTypeFix($slides),"static"==$cont.css("position")&&$cont.css("position","relative"),opts.width&&$cont.width(opts.width),opts.height&&"auto"!=opts.height&&$cont.height(opts.height),opts.startingSlide!==undefined?(opts.startingSlide=parseInt(opts.startingSlide,10),opts.startingSlide>=els.length||opts.startSlide<0?opts.startingSlide=0:startingSlideSpecified=!0):opts.backwards?opts.startingSlide=els.length-1:opts.startingSlide=0,opts.random){opts.randomMap=[];for(var i=0;i<els.length;i++)opts.randomMap.push(i);if(opts.randomMap.sort(function(a,b){return Math.random()-.5}),startingSlideSpecified)for(var cnt=0;cnt<els.length;cnt++)opts.startingSlide==opts.randomMap[cnt]&&(opts.randomIndex=cnt);else opts.randomIndex=1,opts.startingSlide=opts.randomMap[1]}else opts.startingSlide>=els.length&&(opts.startingSlide=0);opts.currSlide=opts.startingSlide||0;var first=opts.startingSlide;$slides.css({position:"absolute",top:0,left:0}).hide().each(function(i){var z;z=opts.backwards?first?first>=i?els.length+(i-first):first-i:els.length-i:first?i>=first?els.length-(i-first):first-i:els.length-i,$(this).css("z-index",z)}),$(els[first]).css("opacity",1).show(),removeFilter(els[first],opts),opts.fit&&(opts.aspect?$slides.each(function(){var $slide=$(this),ratio=opts.aspect===!0?$slide.width()/$slide.height():opts.aspect;opts.width&&$slide.width()!=opts.width&&($slide.width(opts.width),$slide.height(opts.width/ratio)),opts.height&&$slide.height()<opts.height&&($slide.height(opts.height),$slide.width(opts.height*ratio))}):(opts.width&&$slides.width(opts.width),opts.height&&"auto"!=opts.height&&$slides.height(opts.height))),!opts.center||opts.fit&&!opts.aspect||$slides.each(function(){var $slide=$(this);$slide.css({"margin-left":opts.width?(opts.width-$slide.width())/2+"px":0,"margin-top":opts.height?(opts.height-$slide.height())/2+"px":0})}),!opts.center||opts.fit||opts.slideResize||$slides.each(function(){var $slide=$(this);$slide.css({"margin-left":opts.width?(opts.width-$slide.width())/2+"px":0,"margin-top":opts.height?(opts.height-$slide.height())/2+"px":0})});var reshape=(opts.containerResize||opts.containerResizeHeight)&&$cont.innerHeight()<1;if(reshape){for(var maxw=0,maxh=0,j=0;j<els.length;j++){var $e=$(els[j]),e=$e[0],w=$e.outerWidth(),h=$e.outerHeight();w||(w=e.offsetWidth||e.width||$e.attr("width")),h||(h=e.offsetHeight||e.height||$e.attr("height")),maxw=w>maxw?w:maxw,maxh=h>maxh?h:maxh}opts.containerResize&&maxw>0&&maxh>0&&$cont.css({width:maxw+"px",height:maxh+"px"}),opts.containerResizeHeight&&maxh>0&&$cont.css({height:maxh+"px"})}var pauseFlag=!1;if(opts.pause&&$cont.bind("mouseenter.cycle",function(){pauseFlag=!0,this.cyclePause++,triggerPause(cont,!0)}).bind("mouseleave.cycle",function(){pauseFlag&&this.cyclePause--,triggerPause(cont,!0)}),supportMultiTransitions(opts)===!1)return!1;var requeue=!1;if(options.requeueAttempts=options.requeueAttempts||0,$slides.each(function(){var $el=$(this);if(this.cycleH=opts.fit&&opts.height?opts.height:$el.height()||this.offsetHeight||this.height||$el.attr("height")||0,this.cycleW=opts.fit&&opts.width?opts.width:$el.width()||this.offsetWidth||this.width||$el.attr("width")||0,$el.is("img")){var loading=0===this.cycleH&&0===this.cycleW&&!this.complete;if(loading){if(o.s&&opts.requeueOnImageNotLoaded&&++options.requeueAttempts<100)return log(options.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH),setTimeout(function(){$(o.s,o.c).cycle(options)},opts.requeueTimeout),requeue=!0,!1;log("could not determine size of image: "+this.src,this.cycleW,this.cycleH)}}return!0}),requeue)return!1;if(opts.cssBefore=opts.cssBefore||{},opts.cssAfter=opts.cssAfter||{},opts.cssFirst=opts.cssFirst||{},opts.animIn=opts.animIn||{},opts.animOut=opts.animOut||{},$slides.not(":eq("+first+")").css(opts.cssBefore),$($slides[first]).css(opts.cssFirst),opts.timeout){opts.timeout=parseInt(opts.timeout,10),opts.speed.constructor==String&&(opts.speed=$.fx.speeds[opts.speed]||parseInt(opts.speed,10)),opts.sync||(opts.speed=opts.speed/2);for(var buffer="none"==opts.fx?0:"shuffle"==opts.fx?500:250;opts.timeout-opts.speed<buffer;)opts.timeout+=opts.speed}if(opts.easing&&(opts.easeIn=opts.easeOut=opts.easing),opts.speedIn||(opts.speedIn=opts.speed),opts.speedOut||(opts.speedOut=opts.speed),opts.slideCount=els.length,opts.currSlide=opts.lastSlide=first,opts.random?(++opts.randomIndex==els.length&&(opts.randomIndex=0),opts.nextSlide=opts.randomMap[opts.randomIndex]):opts.backwards?opts.nextSlide=0===opts.startingSlide?els.length-1:opts.startingSlide-1:opts.nextSlide=opts.startingSlide>=els.length-1?0:opts.startingSlide+1,!opts.multiFx){var init=$.fn.cycle.transitions[opts.fx];if($.isFunction(init))init($cont,$slides,opts);else if("custom"!=opts.fx&&!opts.multiFx)return log("unknown transition: "+opts.fx,"; slideshow terminating"),!1}var e0=$slides[first];return opts.skipInitializationCallbacks||(opts.before.length&&opts.before[0].apply(e0,[e0,e0,opts,!0]),opts.after.length&&opts.after[0].apply(e0,[e0,e0,opts,!0])),opts.next&&$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)}),opts.prev&&$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)}),(opts.pager||opts.pagerAnchorBuilder)&&buildPager(els,opts),exposeAddSlide(opts,els),opts}function saveOriginalOpts(opts){opts.original={before:[],after:[]},opts.original.cssBefore=$.extend({},opts.cssBefore),opts.original.cssAfter=$.extend({},opts.cssAfter),opts.original.animIn=$.extend({},opts.animIn),opts.original.animOut=$.extend({},opts.animOut),$.each(opts.before,function(){opts.original.before.push(this)}),$.each(opts.after,function(){opts.original.after.push(this)})}function supportMultiTransitions(opts){var i,tx,txs=$.fn.cycle.transitions;if(opts.fx.indexOf(",")>0){for(opts.multiFx=!0,opts.fxs=opts.fx.replace(/\s*/g,"").split(","),i=0;i<opts.fxs.length;i++){var fx=opts.fxs[i];tx=txs[fx],tx&&txs.hasOwnProperty(fx)&&$.isFunction(tx)||(log("discarding unknown transition: ",fx),opts.fxs.splice(i,1),i--)}if(!opts.fxs.length)return log("No valid transitions named; slideshow terminating."),!1}else if("all"==opts.fx){opts.multiFx=!0,opts.fxs=[];for(var p in txs)txs.hasOwnProperty(p)&&(tx=txs[p],txs.hasOwnProperty(p)&&$.isFunction(tx)&&opts.fxs.push(p))}if(opts.multiFx&&opts.randomizeEffects){var r1=Math.floor(20*Math.random())+30;for(i=0;r1>i;i++){var r2=Math.floor(Math.random()*opts.fxs.length);opts.fxs.push(opts.fxs.splice(r2,1)[0])}debug("randomized fx sequence: ",opts.fxs)}return!0}function exposeAddSlide(opts,els){opts.addSlide=function(newSlide,prepend){var $s=$(newSlide),s=$s[0];opts.autostopCount||opts.countdown++,els[prepend?"unshift":"push"](s),opts.els&&opts.els[prepend?"unshift":"push"](s),opts.slideCount=els.length,opts.random&&(opts.randomMap.push(opts.slideCount-1),opts.randomMap.sort(function(a,b){return Math.random()-.5})),$s.css("position","absolute"),$s[prepend?"prependTo":"appendTo"](opts.$cont),prepend&&(opts.currSlide++,opts.nextSlide++),$.support.opacity||!opts.cleartype||opts.cleartypeNoBg||clearTypeFix($s),opts.fit&&opts.width&&$s.width(opts.width),opts.fit&&opts.height&&"auto"!=opts.height&&$s.height(opts.height),s.cycleH=opts.fit&&opts.height?opts.height:$s.height(),s.cycleW=opts.fit&&opts.width?opts.width:$s.width(),$s.css(opts.cssBefore),(opts.pager||opts.pagerAnchorBuilder)&&$.fn.cycle.createPagerAnchor(els.length-1,s,$(opts.pager),els,opts),$.isFunction(opts.onAddSlide)?opts.onAddSlide($s):$s.hide()}}function go(els,opts,manual,fwd){function queueNext(){var ms=0;opts.timeout;opts.timeout&&!opts.continuous?(ms=getTimeout(els[opts.currSlide],els[opts.nextSlide],opts,fwd),"shuffle"==opts.fx&&(ms-=opts.speedOut)):opts.continuous&&p.cyclePause&&(ms=10),ms>0&&(p.cycleTimeout=setTimeout(function(){go(els,opts,0,!opts.backwards)},ms))}var p=opts.$cont[0],curr=els[opts.currSlide],next=els[opts.nextSlide];if(manual&&opts.busy&&opts.manualTrump&&(debug("manualTrump in go(), stopping active transition"),$(els).stop(!0,!0),opts.busy=0,clearTimeout(p.cycleTimeout)),opts.busy)return void debug("transition active, ignoring new tx request");if(p.cycleStop==opts.stopCount&&(0!==p.cycleTimeout||manual)){if(!manual&&!p.cyclePause&&!opts.bounce&&(opts.autostop&&--opts.countdown<=0||opts.nowrap&&!opts.random&&opts.nextSlide<opts.currSlide))return void(opts.end&&opts.end(opts));var changed=!1;if(!manual&&p.cyclePause||opts.nextSlide==opts.currSlide)queueNext();else{changed=!0;var fx=opts.fx;curr.cycleH=curr.cycleH||$(curr).height(),curr.cycleW=curr.cycleW||$(curr).width(),next.cycleH=next.cycleH||$(next).height(),next.cycleW=next.cycleW||$(next).width(),opts.multiFx&&(fwd&&(opts.lastFx===undefined||++opts.lastFx>=opts.fxs.length)?opts.lastFx=0:!fwd&&(opts.lastFx===undefined||--opts.lastFx<0)&&(opts.lastFx=opts.fxs.length-1),fx=opts.fxs[opts.lastFx]),opts.oneTimeFx&&(fx=opts.oneTimeFx,opts.oneTimeFx=null),$.fn.cycle.resetState(opts,fx),opts.before.length&&$.each(opts.before,function(i,o){p.cycleStop==opts.stopCount&&o.apply(next,[curr,next,opts,fwd])});var after=function(){opts.busy=0,$.each(opts.after,function(i,o){p.cycleStop==opts.stopCount&&o.apply(next,[curr,next,opts,fwd])}),p.cycleStop||queueNext()};debug("tx firing("+fx+"); currSlide: "+opts.currSlide+"; nextSlide: "+opts.nextSlide),opts.busy=1,opts.fxFn?opts.fxFn(curr,next,opts,after,fwd,manual&&opts.fastOnEvent):$.isFunction($.fn.cycle[opts.fx])?$.fn.cycle[opts.fx](curr,next,opts,after,fwd,manual&&opts.fastOnEvent):$.fn.cycle.custom(curr,next,opts,after,fwd,manual&&opts.fastOnEvent)}if(changed||opts.nextSlide==opts.currSlide){var roll;opts.lastSlide=opts.currSlide,opts.random?(opts.currSlide=opts.nextSlide,++opts.randomIndex==els.length&&(opts.randomIndex=0,opts.randomMap.sort(function(a,b){return Math.random()-.5})),opts.nextSlide=opts.randomMap[opts.randomIndex],opts.nextSlide==opts.currSlide&&(opts.nextSlide=opts.currSlide==opts.slideCount-1?0:opts.currSlide+1)):opts.backwards?(roll=opts.nextSlide-1<0,roll&&opts.bounce?(opts.backwards=!opts.backwards,opts.nextSlide=1,opts.currSlide=0):(opts.nextSlide=roll?els.length-1:opts.nextSlide-1,opts.currSlide=roll?0:opts.nextSlide+1)):(roll=opts.nextSlide+1==els.length,roll&&opts.bounce?(opts.backwards=!opts.backwards,opts.nextSlide=els.length-2,opts.currSlide=els.length-1):(opts.nextSlide=roll?0:opts.nextSlide+1,opts.currSlide=roll?els.length-1:opts.nextSlide-1))}changed&&opts.pager&&opts.updateActivePagerLink(opts.pager,opts.currSlide,opts.activePagerClass)}}function getTimeout(curr,next,opts,fwd){if(opts.timeoutFn){for(var t=opts.timeoutFn.call(curr,curr,next,opts,fwd);"none"!=opts.fx&&t-opts.speed<250;)t+=opts.speed;if(debug("calculated timeout: "+t+"; speed: "+opts.speed),t!==!1)return t}return opts.timeout}function advance(opts,moveForward){var val=moveForward?1:-1,els=opts.elements,p=opts.$cont[0],timeout=p.cycleTimeout;if(timeout&&(clearTimeout(timeout),p.cycleTimeout=0),opts.random&&0>val)opts.randomIndex--,-2==--opts.randomIndex?opts.randomIndex=els.length-2:-1==opts.randomIndex&&(opts.randomIndex=els.length-1),opts.nextSlide=opts.randomMap[opts.randomIndex];else if(opts.random)opts.nextSlide=opts.randomMap[opts.randomIndex];else if(opts.nextSlide=opts.currSlide+val,opts.nextSlide<0){if(opts.nowrap)return!1;opts.nextSlide=els.length-1}else if(opts.nextSlide>=els.length){if(opts.nowrap)return!1;opts.nextSlide=0}var cb=opts.onPrevNextEvent||opts.prevNextClick;return $.isFunction(cb)&&cb(val>0,opts.nextSlide,els[opts.nextSlide]),go(els,opts,1,moveForward),!1}function buildPager(els,opts){var $p=$(opts.pager);$.each(els,function(i,o){$.fn.cycle.createPagerAnchor(i,o,$p,els,opts)}),opts.updateActivePagerLink(opts.pager,opts.startingSlide,opts.activePagerClass)}function clearTypeFix($slides){function hex(s){return s=parseInt(s,10).toString(16),s.length<2?"0"+s:s}function getBg(e){for(;e&&"html"!=e.nodeName.toLowerCase();e=e.parentNode){var v=$.css(e,"background-color");if(v&&v.indexOf("rgb")>=0){var rgb=v.match(/\d+/g);return"#"+hex(rgb[0])+hex(rgb[1])+hex(rgb[2])}if(v&&"transparent"!=v)return v}return"#ffffff"}debug("applying clearType background-color hack"),$slides.each(function(){$(this).css("background-color",getBg(this))})}var ver="3.0.3";$.expr[":"].paused=function(el){return el.cyclePause},$.fn.cycle=function(options,arg2){var o={s:this.selector,c:this.context};return 0===this.length&&"stop"!=options?!$.isReady&&o.s?(log("DOM not ready, queuing slideshow"),$(function(){$(o.s,o.c).cycle(options,arg2)}),this):(log("terminating; zero elements found by selector"+($.isReady?"":" (DOM not ready)")),this):this.each(function(){var opts=handleArguments(this,options,arg2);if(opts!==!1){opts.updateActivePagerLink=opts.updateActivePagerLink||$.fn.cycle.updateActivePagerLink,this.cycleTimeout&&clearTimeout(this.cycleTimeout),this.cycleTimeout=this.cyclePause=0,this.cycleStop=0;var $cont=$(this),$slides=opts.slideExpr?$(opts.slideExpr,this):$cont.children(),els=$slides.get();if(els.length<2)return void log("terminating; too few slides: "+els.length);var opts2=buildOptions($cont,$slides,els,opts,o);if(opts2!==!1){var startTime=opts2.continuous?10:getTimeout(els[opts2.currSlide],els[opts2.nextSlide],opts2,!opts2.backwards);startTime&&(startTime+=opts2.delay||0,10>startTime&&(startTime=10),debug("first timeout: "+startTime),this.cycleTimeout=setTimeout(function(){go(els,opts2,0,!opts.backwards)},startTime))}}})},$.fn.cycle.resetState=function(opts,fx){fx=fx||opts.fx,opts.before=[],opts.after=[],opts.cssBefore=$.extend({},opts.original.cssBefore),opts.cssAfter=$.extend({},opts.original.cssAfter),opts.animIn=$.extend({},opts.original.animIn),opts.animOut=$.extend({},opts.original.animOut),opts.fxFn=null,$.each(opts.original.before,function(){opts.before.push(this)}),$.each(opts.original.after,function(){opts.after.push(this)});var init=$.fn.cycle.transitions[fx];$.isFunction(init)&&init(opts.$cont,$(opts.elements),opts)},$.fn.cycle.updateActivePagerLink=function(pager,currSlide,clsName){$(pager).each(function(){$(this).children().removeClass(clsName).eq(currSlide).addClass(clsName)})},$.fn.cycle.next=function(opts){advance(opts,1)},$.fn.cycle.prev=function(opts){advance(opts,0)},$.fn.cycle.createPagerAnchor=function(i,el,$p,els,opts){var a;if($.isFunction(opts.pagerAnchorBuilder)?(a=opts.pagerAnchorBuilder(i,el),debug("pagerAnchorBuilder("+i+", el) returned: "+a)):a='<a href="#">'+(i+1)+"</a>",a){var $a=$(a);if(0===$a.parents("body").length){var arr=[];$p.length>1?($p.each(function(){var $clone=$a.clone(!0);$(this).append($clone),arr.push($clone[0])}),$a=$(arr)):$a.appendTo($p)}opts.pagerAnchors=opts.pagerAnchors||[],opts.pagerAnchors.push($a);var pagerFn=function(e){e.preventDefault(),opts.nextSlide=i;var p=opts.$cont[0],timeout=p.cycleTimeout;timeout&&(clearTimeout(timeout),p.cycleTimeout=0);var cb=opts.onPagerEvent||opts.pagerClick;$.isFunction(cb)&&cb(opts.nextSlide,els[opts.nextSlide]),go(els,opts,1,opts.currSlide<i)};/mouseenter|mouseover/i.test(opts.pagerEvent)?$a.hover(pagerFn,function(){}):$a.bind(opts.pagerEvent,pagerFn),/^click/.test(opts.pagerEvent)||opts.allowPagerClickBubble||$a.bind("click.cycle",function(){return!1});var cont=opts.$cont[0],pauseFlag=!1;opts.pauseOnPagerHover&&$a.hover(function(){pauseFlag=!0,cont.cyclePause++,triggerPause(cont,!0,!0)},function(){pauseFlag&&cont.cyclePause--,triggerPause(cont,!0,!0)})}},$.fn.cycle.hopsFromLast=function(opts,fwd){var hops,l=opts.lastSlide,c=opts.currSlide;return hops=fwd?c>l?c-l:opts.slideCount-l:l>c?l-c:l+opts.slideCount-c},$.fn.cycle.commonReset=function(curr,next,opts,w,h,rev){$(opts.elements).not(curr).hide(),"undefined"==typeof opts.cssBefore.opacity&&(opts.cssBefore.opacity=1),opts.cssBefore.display="block",opts.slideResize&&w!==!1&&next.cycleW>0&&(opts.cssBefore.width=next.cycleW),opts.slideResize&&h!==!1&&next.cycleH>0&&(opts.cssBefore.height=next.cycleH),opts.cssAfter=opts.cssAfter||{},opts.cssAfter.display="none",$(curr).css("zIndex",opts.slideCount+(rev===!0?1:0)),$(next).css("zIndex",opts.slideCount+(rev===!0?0:1))},$.fn.cycle.custom=function(curr,next,opts,cb,fwd,speedOverride){var $l=$(curr),$n=$(next),speedIn=opts.speedIn,speedOut=opts.speedOut,easeIn=opts.easeIn,easeOut=opts.easeOut,animInDelay=opts.animInDelay,animOutDelay=opts.animOutDelay;$n.css(opts.cssBefore),speedOverride&&(speedIn=speedOut="number"==typeof speedOverride?speedOverride:1,easeIn=easeOut=null);var fn=function(){$n.delay(animInDelay).animate(opts.animIn,speedIn,easeIn,function(){cb()})};$l.delay(animOutDelay).animate(opts.animOut,speedOut,easeOut,function(){$l.css(opts.cssAfter),opts.sync||fn()}),opts.sync&&fn()},$.fn.cycle.transitions={fade:function($cont,$slides,opts){$slides.not(":eq("+opts.currSlide+")").css("opacity",0),opts.before.push(function(curr,next,opts){$.fn.cycle.commonReset(curr,next,opts),opts.cssBefore.opacity=0}),opts.animIn={opacity:1},opts.animOut={opacity:0},opts.cssBefore={top:0,left:0}}},$.fn.cycle.ver=function(){return ver},$.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:!1,animIn:null,animInDelay:0,animOut:null,animOutDelay:0,aspect:!1,autostop:0,autostopCount:0,backwards:!1,before:null,center:null,cleartypeNoBg:!1,containerResize:1,containerResizeHeight:0,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:!0,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:!0,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:!1,slideExpr:null,slideResize:1,speed:1e3,speedIn:null,speedOut:null,startingSlide:undefined,sync:1,timeout:4e3,timeoutFn:null,updateActivePagerLink:null,width:null}}(jQuery);
}

if (ntb_anims.animation == 'fadein' && ntb_anims.disable_anim == false) { // +++++++++++++++++++++++++++ fadein

(function($) {

    $.fn.newsTicker = function (options) {
        var options = $.extend({}, $.fn.newsTicker.config, options);
		
		/* check that the passed element is actually in the DOM */
		if ($(this).length == 0) {
			if (window.console && window.console.log) {
				window.console.log('Element does not exist in DOM!');
			}
			else {
				alert('Element does not exist in DOM!');		
			}
			return false;
		}
		
		/* ID of the identifier */
		var newsID = '#' + $(this).attr('id');
		$(newsID).hide();
		
        return this.each(function () {
            /* initialize the elements in the collection */
			var settings = {				
				count: 0,
				newsArr: {},
				play: true,
				contentLoaded: false,
				interval:'',
				clearIntrvl:0
			};
			
			/* Next button click button handler */
			$(options.nextBtnDiv).click(function() {
				settings.clearIntrvl = 1;
				putNews();
			});
			
			/* Prev button click button handler */
			$(options.prevBtnDiv).click(function() {
				if (settings.count == 0) {
					settings.count = countSize(settings.newsArr) -2;
				}
				else if (settings.count == 1) {
					settings.count = countSize(settings.newsArr) -1;
				}
				else {
					settings.count = settings.count - 2;
				}
				
				if (settings.count < 0) {
					settings.count = countSize(settings.newsArr)-1;
				}
				settings.clearIntrvl = 1;
				putNews();
			});
			
			/* Play/Pause button click button handler */
			$(options.playPauseID).click(function() {
				if(settings.play == true)
				{
					if(settings.interval)
					{
						settings.clearIntrvl = 1;
						clearInterval(settings.interval);
					}
					settings.play= false;
					debugError('Paused:'+settings.count);
				}
				else				
				{
					debugError('Play :'+settings.count);
					settings.play= true;
					putNews();
				}
			});
			
			initPage();
			
			function initPage()
			{
				populateNews();
				
				if(settings.contentLoaded)
				{
					settings.clearIntrvl = 1;
					putNews();
				}
			}
            
			function runIntervals()
			{
				settings.clearIntrvl=0;	
				settings.interval = setInterval(function(){ putNews() }, options.interval);
					
				$(options.newsData).hover(function() {
						if(settings.interval)
						{
							settings.clearIntrvl = 1;
                            if (ntb_anims.pause_fadein != '') {
							clearInterval(settings.interval);
                            }
						}
					 }, function(){
						putNews();
					 });
			}
         
			/* Function to get the size of an Object*/
			function countSize(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			/* This function populates news from the array to newsData div */
			function putNews()
			{
				debugError('in News putting :'+settings.count);
				if(settings.clearIntrvl == 1)
				{
					if(settings.interval)
						clearInterval(settings.interval);
						
				}
			
				$(options.newsData).fadeOut('slow',function(){
					var news = settings.newsArr[settings.count].content;
					
					$(options.newsData).html(news).fadeIn('slow');
					settings.count++;
					if (settings.count == countSize(settings.newsArr) ) {
						settings.count = 0;
					}
				});
				
				if(settings.clearIntrvl == 1)
				{
					if (ntb_anims.autostart_fadein != 1) {
					runIntervals();
					}
				}
			}	
			
			/* This function populates news array from the UL list */
			function populateNews()
			{
				var tagType = $(newsID).get(0).tagName; 
				
				if (tagType != 'UL' ) {
					debugError('Cannot use <' + tagType.toLowerCase() + '> type of element for this plugin - must of type <ul> or <ol>');
					return false;
				}
				
				if($(newsID + ' LI').length > 0) {
					$(newsID + ' LI').each(function (i) {
						// Populating the news array from LI elements
						settings.newsArr[i] = { type: options.titleText, content: $(this).html()};
					});		
				}	
				else {
					debugError('There are no news in UL tag!');
					return false;
				}
				
				if (countSize(settings.newsArr < 1)) {
					debugError('Couldn\'t find any content from the UL news!');
					return false;
				}
				settings.contentLoaded = true;
			}
			
			/* Function for handling debug and error messages */ 
			function debugError(obj) {
				if (options.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);			
					}
				}
			}
        });
    };

    $.fn.newsTicker.config = {
        // set values and custom functions
		interval: ntb_anims.timeout_fadein,
		newsData: "#ntbne_five",
		prevBtnDiv: ntb_anims.is_ntb_rtl ? "#next-button-ntb" : "#prev-button-ntb",
		nextBtnDiv: ntb_anims.is_ntb_rtl ? "#prev-button-ntb" : "#next-button-ntb",
		playPauseID: "#play-pause",
		effect: "fadeIn",
		debugMode:0
    };
	
	$('#ntbne_five').newsTicker();

})(jQuery);

} else if (ntb_anims.animation == 'Scroll_Up_NTB' && ntb_anims.disable_anim == false) { // +++++++++++++++++++++++++++ Scroll_Up_NTB

(function($) {

        var ntb_scr_up = 'news_ticker_benaceur',
                defaults = {
                        max_rows: 3,
                        speed: 500,
                        duration: 4000,
                        direction: 'up',
                        autostart: 1,
                        pauseOnHover: 1,
                        nextButton: null,
                        prevButton: null,
                        startButton: null,
                        stopButton: null,
                        hasMoved: function() {},
                        movingUp: function() {},
                        movingDown: function() {},
                        start: function() {},
                        stop: function() {},
                        pause: function() {},
                        unpause: function() {}
                };

function ntb_Plugin(a, b) {
    this.element = a, this.$el = $(a), this.options = $.extend({}, defaults, b), this._defaults = defaults, 
    this._name = ntb_scr_up, this.moveInterval, this.state = 0, this.paused = 0, this.moving = 0, 
    this.$el.is("ul") && this.init();
}


ntb_Plugin.prototype = {
    init: function() {
		
	if (ntb_anims.enable_style_mobile) {	
	var row__height = window.innerWidth < ntb_anims.screen_min_width ? ntb_anims.height_mobile - ntb_anims.bor : ntb_anims.height - ntb_anims.bor;
    } else {
	var row__height = ntb_anims.height - ntb_anims.bor;
	}

        this.$el.height(row__height * this.options.max_rows).css({
            overflow: "hidden"
        }), this.checkSpeed(), this.options.nextButton && $(this.options.nextButton).click(function(a) {
            this.moveNext(), this.resetInterval();
        }.bind(this)), this.options.prevButton && $(this.options.prevButton).click(function(a) {
            this.movePrev(), this.resetInterval();
        }.bind(this)), this.options.stopButton && "undefined" != typeof this.options.stopButton[0] && this.options.stopButton.click(function(a) {
            this.stop();
        }.bind(this)), this.options.startButton && "undefined" != typeof this.options.startButton[0] && this.options.startButton.click(function(a) {
            this.start();
        }.bind(this)), this.options.pauseOnHover && this.$el.hover(function() {
            this.state && this.pause();
        }.bind(this), function() {
            this.state && this.unpause();
        }.bind(this)), this.options.autostart && this.start();
    },
    start: function() {
        this.state || (this.state = 1, this.resetInterval(), this.options.start());
    },
    stop: function() {
        this.state && (clearInterval(this.moveInterval), this.state = 0, this.options.stop());
    },
    resetInterval: function() {
        this.state && (clearInterval(this.moveInterval), this.moveInterval = setInterval(function() {
            this.move();
        }.bind(this), this.options.duration));
    },
    move: function() {
        this.paused || this.moveNext();
    },
    moveNext: function() {
        "down" === this.options.direction ? this.moveDown() : "up" === this.options.direction && this.moveUp();
    },
    movePrev: function() {
        "down" === this.options.direction ? this.moveUp() : "up" === this.options.direction && this.moveDown();
    },
    pause: function() {
        this.paused || (this.paused = 1), this.options.pause();
    },
    unpause: function() {
        this.paused && (this.paused = 0), this.options.unpause();
    },
    moveDown: function() {
	if (ntb_anims.enable_style_mobile) {
	var row__height = window.innerWidth < ntb_anims.screen_min_width ? ntb_anims.height_mobile - ntb_anims.bor : ntb_anims.height - ntb_anims.bor;
    } else {
	var row__height = ntb_anims.height - ntb_anims.bor;
	}
        this.moving || (this.moving = 1, this.options.movingDown(), this.$el.children("li:last").detach().prependTo(this.$el).css("margin-top", "-" + row__height + "px").animate({
            marginTop: "0px"
        }, this.options.speed, function() {
            this.moving = 0, this.options.hasMoved();
        }.bind(this)));
    },
    moveUp: function() {
        if (!this.moving) {
            this.moving = 1, this.options.movingUp();
            var a = this.$el.children("li:first");
	if (ntb_anims.enable_style_mobile) {	
	var row__height = window.innerWidth < ntb_anims.screen_min_width ? ntb_anims.height_mobile - ntb_anims.bor : ntb_anims.height - ntb_anims.bor;
    } else {
	var row__height = ntb_anims.height - ntb_anims.bor;
	}
            a.animate({
                marginTop: "-" + row__height + "px"
            }, this.options.speed, function() {
                a.detach().css("margin-top", "0").appendTo(this.$el), this.moving = 0, this.options.hasMoved();
            }.bind(this));
        }
    },
    updateOption: function(a, b) {
        "undefined" != typeof this.options[a] && (this.options[a] = b, "duration" != a && "speed" != a || (this.checkSpeed(), 
        this.resetInterval()));
    },
    getState: function() {
        return paused ? 2 : this.state;
    },
    checkSpeed: function() {
        this.options.duration < Number(this.options.speed) + 25 && (this.options.speed = this.options.duration - 25);
    },
    destroy: function() {
        this._destroy();
    }
}, $.fn[ntb_scr_up] = function(a) {
    var b = arguments;
    return this.each(function() {
        var c = $(this), d = $.data(this, "plugin_" + ntb_scr_up), e = "object" == typeof a && a;
        d || c.data("plugin_" + ntb_scr_up, d = new ntb_Plugin(this, e)), "string" == typeof a && d[a].apply(d, Array.prototype.slice.call(b, 1));
    });
};


            $('#ntbne_five').news_ticker_benaceur({
                max_rows: 1,
				speed: ntb_anims.speed_slide_up_down,
                duration: ntb_anims.timeout_slide_up_down,
				direction: ntb_anims.updown_slide_up_down == 'up_slide_u_d' ? 'up' : 'down',
				autostart: ntb_anims.autostart_slide_up_down != '' ? 0 : 1,
                pauseOnHover: ntb_anims.pause_slide_up_down != '' ? 1 : 0,
		        prevButton: ntb_anims.is_ntb_rtl ? "#next-button-ntb" : "#prev-button-ntb",
		        nextButton: ntb_anims.is_ntb_rtl ? "#prev-button-ntb" : "#next-button-ntb"
            });
})(jQuery);

} else if (ntb_anims.animation == 'ScrollNTB') { // +++++++++++++++++++++++++++ Scroll-H

if (ntb_anims.disable_anim == false) {
	
(function($) {
$(".n_t_ntb_bimg").show();
})(jQuery);
	
!function(a){function b(b,c,d){b.bind("marquee",function(b,e){var f=a(this),g=parseInt(f.parent().width()),h=parseInt(f.width()),i=parseInt(f.position().left),j=c;switch(d){case"right":"undefined"==typeof e?(f.css({left:g}),g=-h):g=i-(h+g);break;default:"undefined"==typeof e?f.css({left:-h}):g+=i+h}f.animate({left:g},{duration:j,easing:"linear",complete:function(){f.trigger("marquee")},step:function(){"right"==d?parseInt(f.position().left)<-parseInt(f.width())&&(f.stop(),f.trigger("marquee")):parseInt(f.position().left)>parseInt(f.parent().width())&&(f.stop(),f.trigger("marquee"))}})}).trigger("marquee");var e=ntb_anims.mouse;1==e&&(b.mouseover(function(){a(this).stop()}),b.mouseout(function(){a(this).trigger("marquee",["resume"])}))}var c=a("#scroll-ntb-elem"),d=4e3*ntb_anims.speed_scr,e=ntb_anims.ori_scr;b(c,d,e)}(jQuery);

} else {
	
(function($) {
$(".ntb_img_post_t_scrollntb").css({"display": "none"});
$(".n_t_ntb_bimg").css({"margin": "initial"});	
setTimeout(function(){
$(".n_t_ntb_bimg").show();
}, 300);
})(jQuery);

}

} else if (ntb_anims.animation == 'TickerNTB') { // +++++++++++++++++++++++++++ typing 1

(function($) {
	
	$.fn.ticker = function(options) { //$(settings.dom.revealElem).hide();
		// Extend our default options with those provided.
		// Note that the first arg to extend is an empty object -
		// this is to keep from overriding our "defaults" object.
		var opts = $.extend({}, $.fn.ticker.defaults, options); 

		// check that the passed element is actually in the DOM
		if ($(this).length == 0) {
			if (window.console && window.console.log) {
				window.console.log('Element does not exist in DOM!');
			}
			else {
				alert('Element does not exist in DOM!');		
			}
			return false;
		}
		
		/* Get the id of the UL to get our news content from */
		var newsID = '#' + $(this).attr('id');

		/* Get the tag type - we will check this later to makde sure it is a UL tag */
		var tagType = $(this).get(0).tagName; 	

		return this.each(function() { 
			// get a unique id for this ticker
			var uniqID = getUniqID();
			
                var arrData_tp1 = {
					contentID: '#ticker-content-' + uniqID,
					titleID: '#ntb--title-' + uniqID,
					titleElem: '#ntb--title-' + uniqID + ' SPAN',
					tickerID : '#ticker',
					wrapperID: '#ticker-wrapper-' + uniqID,
					revealID: '#ticker-swipe-' + uniqID,
					revealElem: '#ticker-swipe-' + uniqID + ' SPAN',
					controlsID: '#ticker-controls-' + uniqID,
					playPauseID: '#play-pause-' + uniqID
                };
	
		        if(ntb_anims.np_img_no_scr_typ == 'enable') {
		        arrData_tp1.prevID = ntb_anims.is_ntb_rtl ? "#next-button-ntb" : "#prev-button-ntb"; // add to arrData_tp1 array
				arrData_tp1.nextID = ntb_anims.is_ntb_rtl ? "#prev-button-ntb" : "#next-button-ntb"; // add to arrData_tp1 array
		        } else {
		        arrData_tp1.prevID = ''; // add to arrData_tp1 array
				arrData_tp1.nextID = ''; // add to arrData_tp1 array
				}
			
			/* Internal vars */
			var settings = {				
				position: 0,
				time: 0,
				distance: 0,
				newsArr: {},
				play: ntb_anims.disable_anim ? false : true,
				paused: ntb_anims.pause__typing == 1 ? false : true,
				contentLoaded: false,
				dom: arrData_tp1
			};

			// if we are not using a UL, display an error message and stop any further execution
			if (tagType != 'UL' && tagType != 'OL' && opts.htmlFeed === true) {
				debugError('Cannot use <' + tagType.toLowerCase() + '> type of element for this plugin - must of type <ul> or <ol>');
				return false;
			}

			// set the ticker direction
			opts.direction == 'rtl' ? opts.direction = 'right' : opts.direction = 'left';
			
			// lets go...
			initialisePage();
			/* Function to get the size of an Object*/
			function countSize(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			function getUniqID() {
				var newDate = new Date;
				return newDate.getTime();			
			}
			
			/* Function for handling debug and error messages */ 
			function debugError(obj) {
				if (opts.debugMode) {
					if (window.console && window.console.log) {
						window.console.log(obj);
					}
					else {
						alert(obj);			
					}
				}
			}

        pauseTicker(); // show the first content without animatin (modified)

			/* Function to setup the page */
			function initialisePage() {
				// process the content for this ticker
				processContent();
				
				// add our HTML structure for the ticker to the DOM
				$(newsID).wrap('<div id="' + settings.dom.wrapperID.replace('#', '') + '"></div>');
				
				// remove any current content inside this ticker
				$(settings.dom.wrapperID).children().remove();
				
				$(settings.dom.wrapperID).append('<div id="' + settings.dom.tickerID.replace('#', '') + '" class="ticker"><p id="' + settings.dom.contentID.replace('#', '') + '" class="ticker-content"></p><div id="' + settings.dom.revealID.replace('#', '') + '" class="ticker-swipe"><span><!-- --></span></div></div>');
				$(settings.dom.wrapperID).removeClass('no-js').addClass('ticker-wrapper has-js ' + opts.direction);
				// hide the ticker
				$(settings.dom.tickerElem + ',' + settings.dom.contentID).hide();
				// add the controls to the DOM if required
				if (opts.controls) {
					// add related events - set functions to run on given event
					$(document).on('click mouseover mousedown mouseout mouseup', settings.dom.controlsID, function (e) {
						var button = e.target.id;
						if (e.type == 'click') {	
							switch (button) {
								case settings.dom.prevID.replace('#', ''):
									// show previous item
									settings.paused = true;
									$(settings.dom.playPauseID).addClass('paused');
									manualChangeContent('prev');
									break;
								case settings.dom.nextID.replace('#', ''):
									// show next item
									settings.paused = true;
									$(settings.dom.playPauseID).addClass('paused');
									manualChangeContent('next');
									break;
								case settings.dom.playPauseID.replace('#', ''):
									// play or pause the ticker
									if (settings.play == true) {
										settings.paused = true;
										$(settings.dom.playPauseID).addClass('paused');
										pauseTicker();
									}
									else {
										settings.paused = false;
										$(settings.dom.playPauseID).removeClass('paused');
										restartTicker();
									}
									break;
							}	
						}
						else if (e.type == 'mouseover' && $('#' + button).hasClass('controls')) {
							$('#' + button).addClass('over');
						}
						else if (e.type == 'mousedown' && $('#' + button).hasClass('controls')) {
							$('#' + button).addClass('down');
						}
						else if (e.type == 'mouseup' && $('#' + button).hasClass('controls')) {
							$('#' + button).removeClass('down');
						}
						else if (e.type == 'mouseout' && $('#' + button).hasClass('controls')) {
							$('#' + button).removeClass('over');
						}
					});
					// add controls HTML to DOM
					$(settings.dom.wrapperID).append('<ul id="' + settings.dom.controlsID.replace('#', '') + '" class="ticker-controls"><li id="' + settings.dom.playPauseID.replace('#', '') + '" class="jnt-play-pause controls"><a href=""><!-- --></a></li><li id="' + settings.dom.prevID.replace('#', '') + '" class="jnt-prev controls"><a href=""><!-- --></a></li><li id="' + settings.dom.nextID.replace('#', '') + '" class="jnt-next controls"><a href=""><!-- --></a></li></ul>');
				}
				if (opts.displayType != 'fade') {
                	// add mouse over on the content
               		$(settings.dom.contentID).mouseover(function () {
               			if (settings.paused == false) {
               				pauseTicker();
               			}
               		}).mouseout(function () {
               			if (settings.paused == false) {
               				restartTicker();
               			}
               		});
				}
				// we may have to wait for the ajax call to finish here
				if (!opts.ajaxFeed) {
					setupContentAndTriggerDisplay();
				}
			}

			/* Start to process the content for this ticker */
			function processContent() {
				// check to see if we need to load content
				if (settings.contentLoaded == false) {
					// construct content
					if (opts.ajaxFeed) {
						if (opts.feedType == 'xml') {							
							$.ajax({
								url: opts.feedUrl,
								cache: false,
								dataType: opts.feedType,
								async: true,
								success: function(data){
									count = 0;	
									// get the 'root' node
									for (var a = 0; a < data.childNodes.length; a++) {
										if (data.childNodes[a].nodeName == 'rss') {
											xmlContent = data.childNodes[a];
										}
									}
									// find the channel node
									for (var i = 0; i < xmlContent.childNodes.length; i++) {
										if (xmlContent.childNodes[i].nodeName == 'channel') {
											xmlChannel = xmlContent.childNodes[i];
										}		
									}
									// for each item create a link and add the article title as the link text
									for (var x = 0; x < xmlChannel.childNodes.length; x++) {
										if (xmlChannel.childNodes[x].nodeName == 'item') {
											xmlItems = xmlChannel.childNodes[x];
											var title, link = false;
											for (var y = 0; y < xmlItems.childNodes.length; y++) {
												if (xmlItems.childNodes[y].nodeName == 'title') {      												    
													title = xmlItems.childNodes[y].lastChild.nodeValue;
												}
												else if (xmlItems.childNodes[y].nodeName == 'link') {												    
													link = xmlItems.childNodes[y].lastChild.nodeValue; 
												}
												if ((title !== false && title != '') && link !== false) {
												    settings.newsArr['item-' + count] = { type: opts.titleText, content: '<a href="' + link + '">' + title + '</a>' };
												    count++;												    
													title = false;												    
													link = false;
												}
											}	
										}		
									}			
									// quick check here to see if we actually have any content - log error if not
									if (countSize(settings.newsArr < 1)) {
										debugError('Couldn\'t find any content from the XML feed for the ticker to use!');
										return false;
									}
									settings.contentLoaded = true;
									setupContentAndTriggerDisplay();
								}
							});							
						}
						else {
							debugError('Code Me!');	
						}						
					}
					else if (opts.htmlFeed) { 
						if($(newsID + ' LI').length > 0) {
							$(newsID + ' LI').each(function (i) {
								// maybe this could be one whole object and not an array of objects?
								settings.newsArr['item-' + i] = { type: opts.titleText, content: $(this).html()};
							});		
						}	
						else {
							debugError('Couldn\'t find HTML any content for the ticker to use!');
							return false;
						}
					}
					else {
						debugError('The ticker is set to not use any types of content! Check the settings for the ticker.');
						return false;
					}					
				}			
			}

			function setupContentAndTriggerDisplay() {

				settings.contentLoaded = true;

				// update the ticker content with the correct item
				// insert news content into DOM
				$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
				$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);

				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) -1)) {
					settings.position = 0;
				}
				else {		
					settings.position++;
				}			
				
				// start the ticker animation						
				revealContent();		

			}
			
$(document).ready(NTBresizefunReveal);
$(window).on('resize',NTBresizefunReveal);
function NTBresizefunReveal() {

	var sw = $('.news-ticker-ntb').width();
    var swww = sw - ntb_anims.typ1_margin_mobile;
	var scr_typ = ntb_anims.np_img_no_scr_typ == 'enable' ? 54 : 0;
	var scr_typDT = ntb_anims.disable_title != '1' ? ntb_anims.width_title_background : 0;
    var sww = sw - (Number(scr_typDT) + Number(scr_typ) + 5);						
	
if (ntb_anims.enable_style_mobile == 1) {
if( window.innerWidth < ntb_anims.screen_min_width ) {
$(settings.dom.revealID + ',' + settings.dom.revealElem).hide(); // show the first content without animatin (modified)
$(settings.dom.contentID).css('max-width', swww + 'px');	
} else {
$(settings.dom.revealID + ',' + settings.dom.revealElem).hide(); // show the first content without animatin (modified)
$(settings.dom.contentID).css('max-width', sww + 'px');	
}
} else {
$(settings.dom.revealID + ',' + settings.dom.revealElem).hide(); // show the first content without animatin (modified)
$(settings.dom.contentID).css('max-width', sww + 'px');	
}

}

			// slide back cover or fade in content
			function revealContent() {
						

				distance = $(settings.dom.contentID).width();
				//var distance = measureWidth(settings.dom.contentID);
				time = distance / opts.speed;

				$(settings.dom.contentID).css('opacity', '1');
				if(settings.play) {	

					// get the width of the title element to offset the content and reveal
					var offset = $(settings.dom.titleID).width();

					$(settings.dom.revealID).css(opts.direction, offset + 'px');
					// show the reveal element and start the animation
					if (opts.displayType == 'fade') {
						// fade in effect ticker
						$(settings.dom.revealID).hide(0, function () {
							$(settings.dom.contentID).css(opts.direction, offset + 'px').fadeIn(opts.fadeInSpeed, postReveal);
						});						
					}
					else if (opts.displayType == 'scroll') {
						// to code
					}
					else {
	
						// default bbc scroll effect
						$(settings.dom.revealElem).show(0, function () {
							$(settings.dom.contentID).show();
							// set our animation direction
							animationAction = opts.direction == 'right' ? { marginRight: distance + 'px'} : { marginLeft: distance + 'px' };
							$(settings.dom.revealID).css('margin-' + opts.direction, '0px').delay(0).animate(animationAction, time, 'linear', postReveal);
						});	
						
					}
				}
				else {
					return false;					
				}

			};


			// here we hide the current content and reset the ticker elements to a default state ready for the next ticker item
			function postReveal() {				
				if(settings.play) {

                    if(ntb_anims.autostart_typ1 == 1) {
                    $(settings.dom.revealElem).hide();
					} else {
					// we have to separately fade the content out here to get around an IE bug - needs further investigation
					$(settings.dom.contentID).delay(opts.pauseOnItems).fadeOut(opts.fadeOutSpeed);
					// deal with the rest of the content, prepare the DOM and trigger the next ticker
					if (opts.displayType == 'fade') {
						$(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
							$(settings.dom.wrapperID)
								.find(settings.dom.revealElem + ',' + settings.dom.contentID)
									.hide()
								.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
									.show()
								.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
									.removeAttr('style');								
							setupContentAndTriggerDisplay();						
						});
					}
					else {
						$(settings.dom.revealID).hide(0, function () {
							$(settings.dom.contentID).fadeOut(opts.fadeOutSpeed, function () {
								$(settings.dom.wrapperID)
									.find(settings.dom.revealElem + ',' + settings.dom.contentID)
										.hide()
									.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
										.show()
									.end().find(settings.dom.tickerID + ',' + settings.dom.revealID)
										.removeAttr('style');								
								setupContentAndTriggerDisplay();						
							});
						});	
					}
					}
				}
				else {
					$(settings.dom.revealElem).hide();
				}
			}

			// pause ticker
			function pauseTicker() {				
				settings.play = true;
				// stop animation and show content - must pass "true, true" to the stop function, or we can get some funky behaviour
				$(settings.dom.tickerID + ',' + settings.dom.revealID + ',' + settings.dom.titleID + ',' + settings.dom.titleElem + ',' + settings.dom.revealElem + ',' + settings.dom.contentID).stop();
				$(settings.dom.revealID + ',' + settings.dom.revealElem).hide();
				$(settings.dom.wrapperID)
					.find(settings.dom.titleID + ',' + settings.dom.titleElem).show()
						.end().find(settings.dom.contentID).show();
			}

			// play ticker
			function restartTicker() {				
				settings.play = true;
				settings.paused = false;
				// start the ticker again
				postReveal();	
			}

			// change the content on user input
			function manualChangeContent(direction) {
				pauseTicker();
				switch (direction) {
					case 'prev':
						if (settings.position == 0) {
							settings.position = countSize(settings.newsArr) -2;
						}
						else if (settings.position == 1) {
							settings.position = countSize(settings.newsArr) -1;
						}
						else {
							settings.position = settings.position - 2;
						}
						$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
						$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);						
						break;
					case 'next':
						$(settings.dom.titleElem).html(settings.newsArr['item-' + settings.position].type);
						$(settings.dom.contentID).html(settings.newsArr['item-' + settings.position].content);
						break;
				}
				// set the next content item to be used - loop round if we are at the end of the content
				if (settings.position == (countSize(settings.newsArr) -1)) {
					settings.position = 0;
				}
				else {		
					settings.position++;
				}	
			}
		});  
		
	}; 
	
	// plugin defaults - added as a property on our plugin function
	$.fn.ticker.defaults = {
		speed: '0.' + ntb_anims.speed_no_scr_typ,			
		ajaxFeed: false,
		feedUrl: '',
		feedType: 'xml',
		displayType: 'reveal',
		htmlFeed: true,
		debugMode: true,
		controls: true,
		titleText: ntb_anims.titletext_tp1,	
		direction: ntb_anims.direction_tp1,	
		pauseOnItems: ntb_anims.pause_on_items_tp1,
		fadeInSpeed: 600,
		fadeOutSpeed: 300
	};	

	// start the ticker 
	$('#ntbne2').ticker();

	// hide the release history when the page loads
	$('#release-wrapper').css('margin-top', '-' + ($('#release-wrapper').height() + 20) + 'px');

	// show/hide the release history on click
	$('a[href="#release-history"]').toggle(function () {	
		$('#release-wrapper').animate({
			marginTop: '0px'
		}, 600, 'linear');
	}, function () {
		$('#release-wrapper').animate({
			marginTop: '-' + ($('#release-wrapper').height() + 20) + 'px'
		}, 600, 'linear');
	});	

					if (ntb_anims.is_ntb_rtl) {
                    $('#prev-button-ntb').prop('title', ntb_anims.next);	
                    $('#next-button-ntb').prop('title', ntb_anims.prev);	
					} else {
                    $('#prev-button-ntb').prop('title', ntb_anims.prev);	
                    $('#next-button-ntb').prop('title', ntb_anims.next);	
					}
	
})(jQuery);

} else if (ntb_anims.is_two == true && ntb_anims.disable_anim == false) { // +++++++++++++++++++++++++++ two

(function($) {
"use strict";

$(document).ready(NTBresizefun1);
$(window).on('resize',NTBresizefun1);
function NTBresizefun1() {
$("#ntbne_five").css({"overflow": "hidden"});
}

switch (ntb_anims.animation) {
	
    case 'curtainY':

$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	ntb_anims.ocb = 0;
};
	
        break;
    case 'curtainX':
	
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		ntb_anims.ocb = next.cycleW;
		ntb_anims.oai = 0;
		opts.animIn.width = this.cycleW;
		ntb_anims.oao = curr.cycleW;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
		
        break;
    case 'turnUp':

$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
	
        break;
    case 'turnDown':

$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
		
        break;
    case 'turnLeft':
	
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = next.cycleW : opts.cssBefore.left = next.cycleW;
		cssBeforeO;
		opts.animIn.width = next.cycleW;
	});
	
		var animO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	animO;
	opts.animOut.width = 0;
};
		
        break;
    case 'turnRight':

$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		var animOutO = ntb_anims.isrtl ? opts.animOut.right = next.cycleW : opts.animOut.left = next.cycleW;
		animOutO;
	});
	
	var animO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
		var arrData = { top: 0, width: 0 };
		if (ntb_anims.isrtl) {
		arrData.right = 0; 
		} else {
		arrData.left = 0;	
		}
	$.extend(opts.cssBefore, arrData);
	animO;
	opts.animOut.width = 0;
};
	
        break;
    case 'slideY':

$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};
	
        break;
    case 'slideX':

$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = 0 : opts.cssBefore.left = 0;
	cssBeforeO;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
	
        break;
    case 'growX':

$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
	
        break;
    case 'growY':

$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};
	
        break;
    case 'scrollLeft':

$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
    $cont.css({'z-index': '1'});
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
		var cssFirstO = ntb_anims.isrtl ? opts.cssFirst.right = 0 : opts.cssFirst.left = 0;
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = w : opts.cssBefore.left = w;
		var animInO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
		var animOutO = ntb_anims.isrtl ? opts.animOut.right = 0-w : opts.animOut.left = 0-w;
	
	cssFirstO;
	cssBeforeO;
	opts.cssBefore.top = 0;
	animInO;
	animOutO;
};
		
        break;
    case 'scrollRight':

$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css({'overflow': 'hidden'});
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
		var cssFirstO = ntb_anims.isrtl ? opts.cssFirst.right = 0 : opts.cssFirst.left = 0;
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = -w : opts.cssBefore.left = -w;
		var animInO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
		var animOutO = ntb_anims.isrtl ? opts.animOut.right = w : opts.animOut.left = w;
	
	cssFirstO;
	cssBeforeO;
	opts.cssBefore.top = 0;
	animInO;
	animOutO;
};
	
        break;
    case 'fadeUp':

$.fn.cycle.transitions.fadeUp = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = next.cycleW/2 : opts.cssBefore.left = next.cycleW/2;
		cssBeforeO;
		opts.cssBefore.top = next.cycleH;
		var arrData = { top: 0, width: next.cycleW, height: next.cycleH };
		if (ntb_anims.isrtl) {
		arrData.right = 0; 
		} else {
		arrData.left = 0;	
		}
		$.extend(opts.animIn, arrData);
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};
		
        break;
    case 'fadeLR':

$.fn.cycle.transitions.fadeLR = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = next.cycleW : opts.cssBefore.left = next.cycleW;
		cssBeforeO;
		opts.cssBefore.top = next.cycleH;
		var arrData = { top: 0, width: next.cycleW, height: next.cycleH };
		if (ntb_anims.isrtl) {
		arrData.right = 0; 
		} else {
		arrData.left = 0;	
		}
		$.extend(opts.animIn, arrData);
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};
	
        break;
    case 'fadeZoom':

$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = next.cycleW/2 : opts.cssBefore.left = next.cycleW/2;
		cssBeforeO;
		opts.cssBefore.top = next.cycleH/2;
		var arrData = { top: 0, width: next.cycleW, height: next.cycleH };
		if (ntb_anims.isrtl) {
		arrData.right = 0; 
		} else {
		arrData.left = 0;	
		}
		$.extend(opts.animIn, arrData);
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};
		
        break;
    case 'zoom':

$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = next.cycleW/2 : opts.cssBefore.left = next.cycleW/2;
		cssBeforeO;
		
		var arrData1 = { top: 0, width: next.cycleW, height: next.cycleH };
		if (ntb_anims.isrtl) {
		arrData1.right = 0; 
		} else {
		arrData1.left = 0;	
		}
		
		var arrData2 = { width: 0, height: 0, top: curr.cycleH/2 };
		if (ntb_anims.isrtl) {
		arrData2.right = curr.cycleW/2; 
		} else {
		arrData2.left = curr.cycleW/2;	
		}
		
		$.extend(opts.animIn, arrData1);
		$.extend(opts.animOut, arrData2);
	});
	opts.cssFirst.top = 0;
	var cssFirstO = ntb_anims.isrtl ? opts.cssFirst.right = 0 : opts.cssFirst.left = 0;
	cssFirstO;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};
		
        break;
    case 'shuffle':

$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:0, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++) {
				if (fwd)
					opts.els.push(opts.els.shift());
				else
					opts.els.unshift(opts.els.pop());
			}
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

        break;
    case 'toss':

$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: 0, top: 0, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};
		
        break;
    case 'blindZ':

$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	
		var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = w : opts.cssBefore.left = w;
		var animInO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
		var animOutO = ntb_anims.isrtl ? opts.animOut.right = w : opts.animOut.left = w;
	
	opts.cssBefore.top = h;
	cssBeforeO;
	opts.animIn.top = 0;
	animInO;
	opts.animOut.top = h;
	animOutO;
};
	
        break;
    case 'uncover':

$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	var w = $cont.css('z-index','1').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		    var animOutO = ntb_anims.isrtl ? opts.animOut.right = -w : opts.animOut.left = -w;
			animOutO;
	});
	
		var animInO = ntb_anims.isrtl ? opts.animIn.right = 0 : opts.animIn.left = 0;
	    var cssBeforeO = ntb_anims.isrtl ? opts.cssBefore.right = 0 : opts.cssBefore.left = 0;
	
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	animInO;
	cssBeforeO;
};
	
        break;
    case 'simple':

$.fn.cycle.transitions.simple = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

        break;
    case 'typing_2':

$.fn.cycle.transitions.typing_2 = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
};

        break;
    default:

$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	$slides.css(ntb_anims.rtl , "0px");
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

}

})(jQuery);

(function($) {

	if (ntb_anims.animation == 'typing_2') {
	var sPlus = 4000; 
	var tPlus = 2000;
	} else {
	var sPlus = 0;
	var tPlus = 0;
	}
	
	 if (ntb_anims.is_ntb_rtl) { 
	 var nextt = '#prev-button-ntb';
     var prevv = '#next-button-ntb';
	 } else { 
	 var nextt = '#next-button-ntb';
     var prevv = '#prev-button-ntb';
	 }
	
	var timeoutt = ntb_anims.autostart_animtwo ? 0 : ntb_anims.timeout_anms_two;
	
    var arrData = {
	 speed: Number(ntb_anims.speed_anms_two) + Number(sPlus),
	 timeout: Number(timeoutt) + Number(tPlus),
	 height: '100%',		 
	 fx: ntb_anims.animation,
	 pause: ntb_anims.pause_anms_two ? 1 : 0,
     containerResize: true,
	 next: nextt,
     prev: prevv,
     fit: 1,   
	 width: '100%'
    };
	
		if(ntb_anims.anim_two__if != true) {
		arrData.sync = 0; // add to arrData array
		}
	
	$('#ntbne_five').cycle(arrData);

})(jQuery);

}

(function($) {
$(document).ready(NTBresizefunAll);
$(window).on('resize',NTBresizefunAll);
function NTBresizefunAll() {
//var ht = $('#ntb--title,.n_t_ntb_b-name').height();	

if (ntb_anims.enable_style_mobile == 1) {
if( window.innerWidth < ntb_anims.screen_min_width ) {
	    $(".news-ticker-ntb #ticker p").css({"line-height": ntb_anims.line_height_mobile - ntb_anims.bor_ticker + "px"});
		$(".ticker-swipe,#ticker").css({"height": ntb_anims.height_mobile - ntb_anims.bor__ + "px", "line-height": ntb_anims.line_height_mobile - ntb_anims.bor_ticker + "px"});
		$("#ntbne_five li,#ntbne_five").css({"height": ntb_anims.height_mobile - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height_mobile - ntb_anims.bor_li + "px"});
		$("#scroll-ntb").css({"height": ntb_anims.height_mobile - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height_mobile - ntb_anims.bor_scroll + "px"});
		$("#next-button-ntb,#prev-button-ntb").css({"line-height": ntb_anims.line_height_mobile - ntb_anims.bor__pn + "px"});
} else {
	    $(".news-ticker-ntb #ticker p").css({"line-height": ntb_anims.line_height - ntb_anims.bor_ticker + "px"});
		$(".ticker-swipe,#ticker").css({"height": ntb_anims.height - ntb_anims.bor__ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_ticker + "px"});
		$("#ntbne_five li,#ntbne_five").css({"height": ntb_anims.height - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_li + "px"});
		$("#scroll-ntb").css({"height": ntb_anims.height - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_scroll + "px"});
		//$("#ntb--title,.n_t_ntb_b-name").css({"line-height": ht + "px"});
		$("#next-button-ntb,#prev-button-ntb").css({"line-height": ntb_anims.height - ntb_anims.bor__pn + "px"});
}
} else {
	    $(".news-ticker-ntb #ticker p").css({"line-height": ntb_anims.line_height - ntb_anims.bor_ticker + "px"});
		$(".ticker-swipe,#ticker").css({"height": ntb_anims.height - ntb_anims.bor__ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_ticker + "px"});
		$("#ntbne_five li,#ntbne_five").css({"height": ntb_anims.height - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_li + "px"});
		$("#scroll-ntb").css({"height": ntb_anims.height - ntb_anims.bor_ + "px", "line-height": ntb_anims.line_height - ntb_anims.bor_scroll + "px"});
		//$("#ntb--title,.n_t_ntb_b-name").css({"line-height": ht + "px"});
		$("#next-button-ntb,#prev-button-ntb").css({"line-height": ntb_anims.height - ntb_anims.bor__pn + "px"});
}

}

	$("#ntbne_five, #ticker p").css({"display": "block"});
	$(".ticker-swipe span").css({"display": "none"});

/*	
    $(window).resize(function() {
    });
    $(window).trigger('resize');
	//$("#ntbne_five").css({"display": "block"});
*/	
})(jQuery);

    if (ntb_anims.top_600) {
   (function($) {
   $(window).scroll(function () {
   var height = $('#wpadminbar').outerHeight();
   
    if($(this).scrollTop() > height){
        $('.n_t_ntb_b, .news-ticker-ntb').addClass('fixed_news_ticker_600_ntb');    
    }else{
        $('.n_t_ntb_b, .news-ticker-ntb').removeClass('fixed_news_ticker_600_ntb');
    }
		
    });
    })(jQuery);		
	}
	
	if (ntb_anims.arr_s_script) {
	console.log(eval(ntb_anims.s_script));
	}