// ==UserScript==
// @name         Binge watchcartoononline
// @namespace    https://www.watchcartoononline.io
// @version      0.2
// @description  Auto watch next episode on watchcartoononline. Execute in main frame only.
// @author       d3xtr0
// @match        https://*.watchcartoononline.io/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    var live = GM_getValue('binger') || false;
    var seek = GM_getValue('seek') || 0;
    //Button for Binger
    $("body").append(`
<div style="display:inline-block;position:fixed;top:15px;right:15px;background:#fecb34;box-shadow:0px 0px 10px #000;padding:10px 15px;">
  <button class="binger-btn" style="width:150px;cursor:pointer;background:#fff;border:1px solid #ccc;padding:3px;box-sizing: border-box;">START BINGE!</button><br>
  <input type="number" class="seeksec" title="skip intro. seek to second" value="`+seek+`" style="width:150px;margin:5px 0 0 0;padding:3px;box-sizing: border-box;">
</div>
`);

    if(live){
        //go to mobile
        if(window.location.href.indexOf("m.watchcartoononline.io") === -1){
            window.location.href = "http://m." + window.location.href.split("www.")[1];
        }

        $(".binger-btn").text("STOP BINGE!");

        //Play Video
        playVideo();

        //go to next episode when finished
        if(jwplayer() !== undefined){
            jwplayer().onComplete(function(){
                if($("a.ui-btn[data-iconpos='right']") !== undefined && $("a.ui-btn[data-iconpos='right']").length){
                    window.location.href = $("a.ui-btn[data-iconpos='right']").eq(0).attr("href");
                }
            });
        }
    }else{
        $(".binger-btn").text("START BINGE!");
    }

    $(document).on("click",".binger-btn",function(){
        live = !live;
        GM_setValue('binger',live);
        if(live){
            //go to mobile site
            if(window.location.href.indexOf("m.watchcartoononline.io") === -1){
                window.location.href = "http://m." + window.location.href.split("www.")[1];
            }
            $(".binger-btn").text("STOP BINGE!");
        }else{
            //go to regular site
            if(window.location.href.indexOf("m.watchcartoononline.io") !== -1){
                window.location.href = "http://www." + window.location.href.split("m.")[1];
            }
            $(".binger-btn").text("START BINGE!");
        }
    });
    
    $(document).on("input",".seeksec",function(){
        GM_setValue('seek',parseInt($(".seeksec").val()));
    });

    function playVideo(){
        //click button functions
        $("#gizli").show();
        $("#play_group").remove();
        $("#headerPadstmIn").remove();

        //play & set fullscreen
        setTimeout(function(){
            if(jwplayer() !== undefined){
                jwplayer().play();
                jwplayer().setFullscreen(true);
                if(seek){
                    jwplayer().seek(seek);
                }
            }
        }, 1000);
    }

})();
