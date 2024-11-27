/* Write here your custom javascript codes */

var CustomScripts = function () {

    return {
        Init: function () {            
            LoadHeaderAndFooter();
            LoadFBPage();

        }
    }

}();

// Site Footer
function LoadHeaderAndFooter() {
        
    $("#SiteFooterContainer").load("/include/SiteFooter.html");
    
};

function LoadFBPage() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function blinker() {
    $('.blink_me').fadeOut(500);
    $('.blink_me').fadeIn(500);
}

setInterval(blinker, 2000); //Runs every second
