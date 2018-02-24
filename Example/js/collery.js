// Collery created by Rafael Fernandez (rafaeldesign.be)
// Copyright 2017 Rafael Fernandez
// Created on 05-07-2017
// version 0.2 (20-08-2017)
// define variables
var index;
var totalIndex;
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

function getPosition() { // gets the positions and widths of image and viewport
        // get top position of image (Y-axis) in viewport
        imgTop = $('.collery').eq(window.totalIndex).offset().top;
        windowTop = imgTop - $(window).scrollTop();
        
        // get left position of image (X-axis) in viewport
        imgLeft = $('.collery').eq(window.totalIndex).offset().left;
        windowLeft = imgLeft - $(window).scrollLeft();
        
        // get width and height of image in viewport
        imgWidth = $('.collery').eq(window.totalIndex).width();
        imgHeight = $('.collery').eq(window.totalIndex).height();
        
        // get viewport width
        viewportWidth = $(window).width();
    
        // get viewport height
        viewportHeight = $(window).height();
};

function loadImage(){ // load the image and interface
        // get link to zoomed in image
        imgSrc = $('.collery').eq(window.totalIndex).parent().attr("href");
        
        // if there is no link to another image, it displays the image itself in zoom
        if(imgSrc == undefined){
            imgSrc = $('.collery').eq(window.totalIndex).attr("src");
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
        
    
        
        
};

function scaleImage(){ // scale and rescale image to be responsive
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
                if(showWidth > (viewportWidth*0.8)){ // scale if image is too wide
                    $('.gallery.zoom').css('width', '80%');
                    $('.gallery.zoom').css('height', ((viewportWidth*0.8)/showWidth*showHeight) + 'px');
                    $('.gallery.zoom').css('left', '10%');
                    $('.gallery.zoom').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 + 'px');
                    $('.title').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 + ((viewportWidth*0.8)/showWidth*showHeight) + 'px');
                    $('.close, .closex').css('top', (viewportHeight - ((viewportWidth*0.8)/showWidth*showHeight))/2 - 48 + 'px');
                    $('.close').css('right', (viewportWidth*0.1 + 56) + 'px');
                    $('.closex').css('right', (viewportWidth*0.1) + 'px');
                } else if(showHeight > (viewportHeight - 120)){ // scahe if image is too long
                    $('.gallery.zoom').css('width', ((viewportHeight - 120)/showHeight*showWidth) +'px');
                    $('.gallery.zoom').css('height', (viewportHeight - 120) + 'px');
                    $('.gallery.zoom').css('left', (viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2 + 'px');
                    $('.gallery.zoom').css('top', (viewportHeight - (viewportHeight - 120))/2 + 'px');
                    $('.title').css('top', ((viewportHeight - (viewportHeight - 120))/2 + (viewportHeight - 120)) + 'px');
                    $('.close, .closex').css('top', (viewportHeight - (viewportHeight - 120))/2 - 48 + 'px');
                    $('.close').css('right', ((viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2 + 56) + 'px');
                    $('.closex').css('right', ((viewportWidth-((viewportHeight - 120)/showHeight*showWidth))/2) + 'px');
                    
                } else { // scale normal centering image
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

// resize the image responsive when resizing window
$(window).on('resize', function(){
      scaleImage();
});

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

// click of image in website
$( document ).ready(function() {
    $( ".collery" ).click(function(event) {
        $(this).parents().eq(2).addClass('selected');
        total = $('ul.collery-container.selected li').length - 1;
        //alert('Total: ' + total);
        // get index of clicked image
        totalIndex = $(this).index('.collery');
        index = $(this).index('ul.collery-container.selected li .collery');
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
                
        // text refocus
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
    
    // go to next image
    function next() {
        if(index == total){
            return false;
        } else {
            totalIndex++;
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