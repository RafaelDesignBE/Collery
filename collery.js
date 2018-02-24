// Collery created by Rafael Fernandez (rafaeldesign.be)
// version 0.0.1 (05-07-2017)
var index;
var imgTop;
var windowTop;
var imgLeft;
var windowLeft;
var imgWidth;
var imgHeight;
var showWidth;
var showHeight;
var viewportWidth;
var viewportHeight;
var imgSrc;
var imgColor;
var imgTitle;
var total;
var open = false;

function getPosition() {
    // get top position of image (Y-axis) in viewport
        imgTop = $('.collery').eq(window.index).offset().top;
        windowTop = imgTop - $(window).scrollTop();
        
        // get left position of image (X-axis) in viewport
        imgLeft = $('.collery').eq(window.index).offset().left;
        windowLeft = imgLeft - $(window).scrollLeft();
        
        // get width and height of image in viewport
        imgWidth = $('.collery').eq(window.index).width();
        imgHeight = $('.collery').eq(window.index).height();
        
        // get viewport width
        viewportWidth = $(window).width();
    
        // get viewport height
        viewportHeight = $(window).height();
};

function loadImage(){
    // get link to zoomed in image
        imgSrc = $('.collery').eq(window.index).parent().attr("href");
        
        // get background color
        imgColor = $('.collery').eq(window.index).data("collery-color");
        
        showWidth = $('.collery').eq(window.index).data("collery-width");
        showHeight = $('.collery').eq(window.index).data("collery-height");
    
        // get title
        imgTitle = $('.collery').eq(window.index).attr("title");
        // load image
        $('.gallery').css('background-image', 'url(' + imgSrc + ')');
        $('.cover').css('background-color', imgColor);
        
    
        
        
};

function scaleImage(){
    viewportWidth = $(window).width();
    viewportHeight = $(window).height();
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
                if(showWidth > (viewportWidth*0.8)){
                    $('.gallery.zoom').css('width', '80%');
                    $('.gallery.zoom').css('height', ((viewportWidth*0.8)/showWidth*showHeight) + 'px');
                    $('.gallery.zoom').css('left', '10%');
                    $('.gallery.zoom').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 + 'px');
                    $('.title').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 + ((viewportWidth*0.8)/showWidth*showHeight) + 'px');
                    $('.close, .closex').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 - 48 + 'px');
                    $('.close').css('right', (viewportWidth*0.1 + 56) + 'px');
                    $('.closex').css('right', (viewportWidth*0.1) + 'px');
                } else if(showHeight > (viewportHeight - 120)){
                    $('.gallery.zoom').css('width', ((viewportHeight - 120)/showHeight*showWidth) +'px');
                    $('.gallery.zoom').css('height', (viewportHeight - 120) + 'px');
                    $('.gallery.zoom').css('left', (viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2 + 'px');
                    $('.gallery.zoom').css('top', (viewportHeight - (viewportHeight - 120))/2 + 'px');
                    $('.title').css('top', ((viewportHeight - (viewportHeight - 120))/2 + (viewportHeight - 120)) + 'px');
                    $('.close, .closex').css('top', (viewportHeight - (viewportHeight - 120))/2 - 48 + 'px');
                    $('.close').css('right', ((viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2 + 56) + 'px');
                    $('.closex').css('right', ((viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2) + 'px');
                    
                } else {
                    $('.gallery.zoom').css('width', showWidth + 'px');
                    $('.gallery.zoom').css('height', showHeight + 'px');
                    $('.gallery.zoom').css('left', (viewportWidth-showWidth)/2 + 'px');
                    $('.gallery.zoom').css('top', (viewportHeight - showHeight)/2 + 'px');
                    $('.title').css('top',(viewportHeight - showHeight)/2 + showHeight + 'px');
                    $('.close, .closex').css('top', (viewportHeight - showHeight)/2 - 48 + 'px');
                    $('.close').css('right', ((viewportWidth-showWidth)/2 + 56) + 'px');
                    $('.closex').css('right', ((viewportWidth-showWidth)/2) + 'px');
                }
                 
};

$(window).on('resize', function(){
      scaleImage();
});
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
        if(showWidth > (viewportWidth*0.8)){
            $('.title').css('top', (viewportHeight*0.8)+68 + 'px');
        } else {
            $('.title').css('top', showHeight+68 + 'px');
        }        
        $('.title').css('display', 'block');
        setTimeout(function() {
            $('.gallery').addClass('zoom');
            $('.cover').addClass('zoom');
            $('.title').addClass('zoom');
            $('.close').addClass('zoom');
            scaleImage();
        }, 1);
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

function textColor() {
    if((((hexToRgb(imgColor).r * 299) +
        (hexToRgb(imgColor).g * 587) +
        (hexToRgb(imgColor).b * 114))/1000) > 160 ){
            $('.title').css('color', '#000000');
            $('.close').css('color', '#000000');
            $('.closex .line1, .closex .line2').css('background-color', '#000000');
            $('.previous .arrow').css('border-right', '1.25rem solid #000000');
            $('.next .arrow').css('border-left', '1.25rem solid #000000');
        } else {
            $('.title').css('color', '#ffffff');
            $('.close').css('color', '#ffffff');
            $('.closex .line1, .closex .line2').css('background-color', '#ffffff');
            $('.previous .arrow').css('border-right', '1.25rem solid #ffffff');
            $('.next .arrow').css('border-left', '1.25rem solid #ffffff');
        }
};

$( document ).ready(function() {
    total = $('ul.collery-container li').length - 1;
    $( ".collery" ).click(function(event) {
        // get index of clicked image
        index = $(this).index('.collery');
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
    
    function close() {
        open = false;
        getPosition();
        setTimeout(function() {
            $('.gallery').removeClass('zoom');
            $('.cover').removeClass('zoom');
            $('.title').removeClass('zoom');
            $('.close').removeClass('zoom');
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
    
    function previous() {
        if(index == 0){
            return false;
        } else {index--;
        loadImage();
        showImage();
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
        }
    };
    
    function next() {
        if(index == total){
            return false;
        } else {
            index++;
            loadImage();
            showImage();
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
            return false;
        }
    };
    
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
    
    $("body").keydown(function(e) {
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


/*$(function() {
  var img1Top = $('#img1').offset().top; //get the offset top of the element
  window.img1Window = img1Top - $(window).scrollTop(); //position of the ele w.r.t window
  $(window).scroll(function() { //when window is scrolled
    window.img1Window =img1Top - $(window).scrollTop();
  });
    
    var img1Left = $('#img1').offset().left; //get the offset top of the element
  window.img1WindowX = img1Left - $(window).scrollLeft(); //position of the ele w.r.t window
  $(window).scroll(function() { //when window is scrolled
    window.img1WindowX =img1Left - $(window).scrollLeft();
  });
});


alert( "IMG " + event.target.id + " clicked. at " + window.img1Window +" top and " + window.img1WindowX + "left");*/