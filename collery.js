// Collery created by Rafael Fernandez (rafaeldesign.be)
// Created on 05-07-2017

// create gallery HTML
document.write('<div class="gallery"> <div class="next"></div><div class="previous"></div></div><div class="title"></div><div class="close" title="Close (Esc)"> Close <div class="closex"> <div class="line1"></div><div class="line2"></div></div></div><div class="next"> <div class="arrow"></div></div><div class="previous"> <div class="arrow"></div></div><div class="cover"></div>');


// define variables
var index;
var totalIndex;
var scrolledY;
var scrolledX;
var imgTop;
var windowTop;
var imgLeft;
var windowLeft;
var imgWidth;
var imgHeight;
var showWidth;
var showHeight;
var showRatio;
var viewportWidth;
var viewportHeight;
var showMaxRatio;
var imgSrc;
var imgColor;
var imgTitle;
var total;
var open = false;


function getPosition() { // gets the positions and widths of image and viewport
        // get top position of image (Y-axis) in viewport
        imgTop = document.querySelectorAll('.collery')[window.totalIndex].offsetTop;
        
        scrolledY = (window.pageYOffset || window.scrollTop)  - (window.clientTop || 0);
        if(isNaN(scrolledY)){
            scrolledY = 0;
        }

        windowTop = imgTop - scrolledY;
        
        
        // get left position of image (X-axis) in viewport
        imgLeft = document.querySelectorAll('.collery')[window.totalIndex].offsetLeft;
        scrolledX = (window.pageXOffset || window.scrollX)  - (window.clientLeft || 0);
        if(isNaN(scrolledX)){
            scrolledX = 0;
        }
        windowLeft = imgLeft - scrolledX;
        
        // get width and height of image in viewport
        imgWidth = document.querySelectorAll('.collery')[window.totalIndex].clientWidth;
        imgHeight = document.querySelectorAll('.collery')[window.totalIndex].clientHeight;
        
        // get viewport width
        viewportWidth = window.clientWidth;
    
        // get viewport height
        viewportHeight = window.clientHeight;
};

function loadImage(){ // load the image and interface
        // get link to zoomed in image
        imgSrc = $('.collery').eq(window.totalIndex).parent().attr("href");
        
        // if there is no link to another image, it displays the image itself in zoom
        if(imgSrc == undefined){
            imgSrc = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("src");
        }
        
        // get background color
        imgColor = $('.collery').eq(window.totalIndex).data("collery-color");
        // if no color is given, defaults to black
        if(imgColor == undefined){
            imgColor = '#000000';
        }
        
        // get the maximum resolution of the zoomed in image
        showWidth = $('.collery').eq(window.totalIndex).data("collery-width");
        showHeight = $('.collery').eq(window.totalIndex).data("collery-height");
        
        // get title
        imgTitle = $('.collery').eq(window.totalIndex).attr("title");
        // load image
        $('.gallery').css('background-image', 'url(' + imgSrc + ')');
        $('.cover').css('background-color', imgColor);
        $('.title').css('opacity', '0');
    
        
        
};

function scaleImage(){ // scale and rescale image to be responsive
    viewportWidth = $(window).width();
    viewportHeight = $(window).height();
    showWidth = $('.collery').eq(window.totalIndex).data("collery-width");
    showHeight = $('.collery').eq(window.totalIndex).data("collery-height");
    showRatio = showWidth/showHeight;
    showMaxRatio = ((viewportWidth-120)/(viewportHeight-120));
    if(index == 0){
        $('.previous .arrow').removeClass('active');
    } else {
        $('.previous .arrow').addClass('active');
        $('.previous').attr('title', 'Previous (Left)');
    }
    
    if(index == total){
        $('.next .arrow').removeClass('active');
    } else {
        $('.next .arrow').addClass('active');
        $('.next').attr('title', 'Next (Right)');
    }

        //showWidth = viewportWidth - 120;
        //showHeight = viewportHeight - 120;
    if( showMaxRatio < showRatio ){ // viewport longer than show
        if(showWidth > (viewportWidth - 120)){
            showWidth = (viewportWidth - 120);
            showHeight = showWidth / showRatio;
        }
    } else { // viewport wider or same as show
            if(showHeight > (viewportHeight - 120)){
                showHeight = (viewportHeight - 120);
                showWidth = showHeight * showRatio;
            }
    }
        
    $('.gallery.zoom').css('width', showWidth + 'px');
    $('.gallery.zoom').css('height', showHeight + 'px');
    $('.gallery.zoom').css('left', (viewportWidth-showWidth)/2 + 'px');
    $('.gallery.zoom').css('top', (viewportHeight - showHeight)/2 + 'px');
    $('.title').css('top',(viewportHeight - showHeight)/2 + showHeight + 'px');
    $('.close, .closex').css('top', (viewportHeight - showHeight)/2 - 48 + 'px');
    $('.close').css('right', ((viewportWidth-showWidth)/2 + 56) + 'px');
    $('.closex').css('right', ((viewportWidth-showWidth)/2) + 'px');
                 
};

// resize the image responsive when resizing window
$(window).on('resize', function(){
      scaleImage();
});

// TEXT RELOAD EFFECTS 
// You can choose between the "Fade from bottom", "Refocus" or "Fade in"

// Fade from bottom
function textLoad() {
    $('.title').css('opacity', '0');
    $('.title').css('transform', 'translateY(0)');
    $('.title').css('transition', 'none');
    setTimeout(function() {
        textColor();
        $('.title').css('opacity', '0');
        $('.title').css('transform', 'translateY(1rem)');
        $('.title').css('transition', 'all 0.3s ease-out');
    }, 1);

    setTimeout(function() {
        $('.title').html(imgTitle);
        $('.title').css('transform', 'translateY(0)');
        $('.title').css('opacity', '1');
    }, 300);
};




// Refocus
/*function textLoad() {
    setTimeout(function() {
        $('.title').css('filter', 'blur(20px)');
        $('.title').css('opacity', '0');
    }, 300);
    
    setTimeout(function() {
    textColor();
        $('.title').html(imgTitle);
        $('.title').css('filter', 'blur(0)');
        $('.title').css('opacity', '1');
    }, 600);
};*/

// Fade in
/*function textLoad() {
    setTimeout(function() {
        $('.title').css('opacity', '0');
    }, 300);
    
    setTimeout(function() {
    textColor();
        $('.title').html(imgTitle);
        $('.title').css('opacity', '1');
    }, 600);
};*/

// END TEXT RELOAD EFFECTS


// show the image
function showImage() {
        $('.gallery').css('top', windowTop + 'px');
        $('.gallery').css('left', windowLeft + 'px');
        $('.gallery').css('width', imgWidth + 'px');
        $('.gallery').css('height', imgHeight + 'px');
        $('.gallery').css('display', 'block');
        $('.cover').css('display', 'block');
        $('.next').css('display', 'block');
        $('.previous').css('display', 'block');
        $('.close').css('display', 'block');       
        $('.title').css('display', 'block');
        setTimeout(function() {
            $('.gallery').addClass('zoom');
            $('.cover').addClass('zoom');
            $('.title').addClass('zoom');
            $('.close').addClass('zoom');
            $('.container').addClass('zoom');
            textLoad();
            scaleImage();
        }, 1);
};

// convert the hex to seperate rgb values
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// invert ui color based on background
function textColor() {
    if((((hexToRgb(imgColor).r * 299) +
        (hexToRgb(imgColor).g * 587) +
        (hexToRgb(imgColor).b * 114))/1000) > 160 ){
            $('.title').css('color', '#000');
            $('.close').css('color', '#000');
            $('.closex .line1, .closex .line2').css('background-color', '#000');
            $('.previous .arrow').css('border-right', '1.25rem solid #000');
            $('.next .arrow').css('border-left', '1.25rem solid #000');
        } else {
            $('.title').css('color', '#fff');
            $('.close').css('color', '#fff');
            $('.closex .line1, .closex .line2').css('background-color', '#fff');
            $('.previous .arrow').css('border-right', '1.25rem solid #fff');
            $('.next .arrow').css('border-left', '1.25rem solid #fff');
        }
};

// click of image in website
$( document ).ready(function() {
    $( ".collery" ).click(function(event) {
        //$(this).parents().eq(2).addClass('selected'); // in case collery-container is two levels higher (ex. ul>li>a>img)
        

        /*if(total == -1){ // in case the collery-container is only one level higher than img (ex. div>a>li)
            $(this).parents().eq(2).removeClass('selected');
            $(this).parents().eq(1).addClass('selected');
            total = $('.collery-container.selected a img.collery').length - 1;
            alert("level 1");
        }*/


        $(this).closest( '.collery-container' ).addClass('selected');
        total = $('.collery-container.selected a img.collery').length - 1;
        
        // get index of clicked image
        totalIndex = $(this).index('.collery');
        index = $(this).index('.collery-container.selected a img.collery');


        // for single image (without collery-container)
        if(total == -1){
            total = 0;
            index = 0;
        }
        //alert('Total: ' + total);
        //alert('Index: ' + index);
        getPosition();
        loadImage();
        textColor();
        $('.title').html(imgTitle);
        showImage();
        open = true;
        // test values
        //alert('The top is: ' + windowTop + ', the left is: ' + windowLeft + ', the width is: ' + imgWidth + ', the height is: ' + imgHeight + ', source is: ' + imgSrc + ', index is: ' + index)
        return false;
        
    });
    
    // close the ui and reset values
    function close() {
        open = false;
        $('.collery-container').removeClass('selected');
        getPosition();
        setTimeout(function() {
            $('.gallery').removeClass('zoom');
            $('.cover').removeClass('zoom');
            $('.title').removeClass('zoom');
            $('.close').removeClass('zoom');
            $('.container').removeClass('zoom');
            $('.gallery').css('top', windowTop + 'px');
            $('.gallery').css('left', windowLeft + 'px');
            $('.gallery').css('width', imgWidth + 'px');
            $('.gallery').css('height', imgHeight + 'px');
            
        }, 1);
        setTimeout(function() {
            $('.gallery').css('display', 'none');
            $('.close').css('display', 'none');
            $('.next').css('display', 'none');
            $('.previous').css('display', 'none');
            $('.cover').css('display', 'none');
            $('.title').css('display', 'none');
            
        }, 300);
    };

    
    // go to previous image
    function previous() {
        if(index == 0){
            return false;
        } else {
            totalIndex--;
            index--;
            loadImage();
            showImage();
            textLoad();
        }
    };
    
    // go to next image
    function next() {
        if(index == total){
            return false;
        } else {
            totalIndex++;
            index++;
            loadImage();
            showImage();
            textLoad();
            return false;
        }
    };
    
    
    // handle click events
    $( ".cover" ).click(function(event) {
        close();
        return false;
    });
    
    $( ".previous" ).click(function(event) {
        previous();
        return false;
    });
    
    $( ".next" ).click(function(event) {
        next();
    });
    
    $( ".close" ).click(function(event) {
        close();
        return false;
    });
    
    // handle keyboard events
    $( "body" ).keydown(function(e) {
      if (open == true){
          if(e.keyCode == 37) { // left
            previous();
            return false;
          }
          else if(e.keyCode == 39) { // right
             next();
          }

          else if(e.keyCode == 27) { // escape
            close();
          }

          else if(e.keyCode == 13) { // enter
            next();
            return false;
          }
      }
    });
});
