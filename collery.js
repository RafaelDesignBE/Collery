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

function getElPos(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return [xPosition, yPosition];
}

function getPosition() { // gets the positions and widths of image and viewport
        // get top position of image (Y-axis) in viewport
        var elPos = getElPos( document.querySelectorAll('.collery')[window.totalIndex] );
        imgTop = elPos[1];
        
        scrolledY = (window.pageYOffset || window.scrollTop)  - (window.clientTop || 0);
        if(isNaN(scrolledY)){
            scrolledY = 0;
        }

        windowTop = imgTop - scrolledY;
        
        
        // get left position of image (X-axis) in viewport
        imgLeft = elPos[0];
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
        imgSrc = document.querySelectorAll('.collery')[window.totalIndex].parentElement.getAttribute("href");
        
        // if there is no link to another image, it displays the image itself in zoom
        if(imgSrc == undefined){
            imgSrc = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("src");
        }
        
        // get background color
        imgColor = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("data-collery-color");
        // if no color is given, defaults to black
        if(imgColor == undefined){
            imgColor = '#000000';
        }
        
        // get the maximum resolution of the zoomed in image
        showWidth = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("data-collery-width");
        showHeight = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("data-collery-height");
        
        // get title
        imgTitle = document.querySelectorAll('.collery')[window.totalIndex].getAttribute("title");
        // load image
        document.querySelector('.gallery').style.backgroundImage = 'url(' + imgSrc + ')';
        document.querySelector('.cover').style.backgroundColor = imgColor;
        document.querySelector('.title').style.opacity = '0';
    
        
        
};

function scaleImage(){ // scale and rescale image to be responsive
    viewportWidth = document.documentElement.clientWidth;
    viewportHeight = document.documentElement.clientHeight;
    showWidth = parseInt(document.querySelectorAll('.collery')[window.totalIndex].getAttribute("data-collery-width"));
    showHeight = parseInt(document.querySelectorAll('.collery')[window.totalIndex].getAttribute("data-collery-height"));
    showRatio = showWidth/showHeight;
    showMaxRatio = ((viewportWidth-120)/(viewportHeight-120));
    if(index == 0){
        document.querySelector('.previous .arrow').classList.remove("active");
    } else {
        document.querySelector('.previous .arrow').classList.add("active");
        document.querySelectorAll('.previous')[0].setAttribute('title', "Previous (Left)");
        document.querySelectorAll('.previous')[1].setAttribute('title', "Previous (Left)");
    }
    
    if(index == total){
        document.querySelector('.next .arrow').classList.remove("active");
    } else {
        document.querySelector('.next .arrow').classList.add("active");
        document.querySelectorAll('.next')[0].setAttribute('title', "Next (Right)");
        document.querySelectorAll('.next')[1].setAttribute('title', "Next (Right)");
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
    
    document.querySelector('.gallery.zoom').style.width = showWidth + 'px';
    document.querySelector('.gallery.zoom').style.height = showHeight + 'px';
    document.querySelector('.gallery.zoom').style.left = (viewportWidth-showWidth)/2 + 'px';
    document.querySelector('.gallery.zoom').style.top = (viewportHeight - showHeight)/2 + 'px';
    document.querySelector('.title').style.top = (viewportHeight - showHeight)/2 + showHeight + 'px';
    document.querySelector('.close').style.top = (viewportHeight - showHeight)/2 - 48 + 'px';
    document.querySelector('.closex').style.top = (viewportHeight - showHeight)/2 - 48 + 'px';
    document.querySelector('.close').style.right = ((viewportWidth-showWidth)/2 + 56) + 'px';
    document.querySelector('.closex').style.right = ((viewportWidth-showWidth)/2) + 'px';
};

// resize the image responsive when resizing window
window.onresize = function(){
    scaleImage();
};

// TEXT RELOAD EFFECTS 
// You can choose between the "Fade from bottom", "Refocus" or "Fade in"

// Fade from bottom
function textLoad() {
    document.querySelector('.title').style.opacity = "0";
    document.querySelector('.title').style.transform = "translateY(0)";
    document.querySelector('.title').style.transition = "none";
    setTimeout(function() {
        textColor();
        document.querySelector('.title').style.opacity = "0";
        document.querySelector('.title').style.transform = "translateY(1rem)";
        document.querySelector('.title').style.transition = "all 0.3s ease-out";
    }, 1);

    setTimeout(function() {
        document.querySelector('.title').innerHTML = imgTitle;
        document.querySelector('.title').style.transform = "translateY(0)";
        document.querySelector('.title').style.opacity = "1";
    }, 300);
};

// Refocus
/*function textLoad() {
    setTimeout(function() {
        document.querySelector('.title').style.filter = "blur(20px)";
        document.querySelector('.title').style.opacity = "0";
    }, 300);
    
    setTimeout(function() {
    textColor();
        document.querySelector('.title').innerHTML = imgTitle;
        document.querySelector('.title').style.filter = "blur(0)";
        document.querySelector('.title').style.opacity = "1";
    }, 600);
};*/

// Fade in
/*function textLoad() {
    setTimeout(function() {
        document.querySelector('.title').style.opacity = "0";
    }, 300);
    
    setTimeout(function() {
    textColor();
        document.querySelector('.title').innerHTML = imgTitle;
        document.querySelector('.title').style.opacity = "1";
    }, 600);
};*/

// END TEXT RELOAD EFFECTS


// show the image
function showImage() {
        document.querySelector('.gallery').style.top = windowTop + 'px';
        document.querySelector('.gallery').style.left = windowLeft + 'px';
        document.querySelector('.gallery').style.width = imgWidth + 'px';
        document.querySelector('.gallery').style.height = imgHeight + 'px';
        document.querySelector('.gallery').style.display = 'block';
        document.querySelector('.cover').style.display = 'block';
        document.querySelectorAll('.next')[0].style.display = 'block';
        document.querySelectorAll('.next')[1].style.display = 'block';
        document.querySelectorAll('.previous')[0].style.display = 'block';
        document.querySelectorAll('.previous')[1].style.display = 'block';
        document.querySelector('.close').style.display = 'block'; 
        document.querySelector('.title').style.display = 'block';
        setTimeout(function() {
            document.querySelector('.gallery').classList.add("zoom");
            document.querySelector('.cover').classList.add("zoom");
            document.querySelector('.title').classList.add("zoom");
            document.querySelector('.close').classList.add("zoom");
            document.querySelector('.container').classList.add("zoom");
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
            document.querySelector('.title').style.color = "#000";
            document.querySelector('.close').style.color = "#000";
            document.querySelector('.closex .line1').style.backgroundColor = "#000";
            document.querySelector('.closex .line2').style.backgroundColor = "#000";
            document.querySelector('.previous .arrow').style.borderRight = "1.25rem solid #000";
            document.querySelector('.next .arrow').style.borderLeft = "1.25rem solid #000";
        } else {
            document.querySelector('.title').style.color = "#fff";
            document.querySelector('.close').style.color = "#fff";
            document.querySelector('.closex .line1').style.backgroundColor = "#fff";
            document.querySelector('.closex .line2').style.backgroundColor = "#fff";
            document.querySelector('.previous .arrow').style.borderRight = "1.25rem solid #fff";
            document.querySelector('.next .arrow').style.borderLeft = "1.25rem solid #fff";
        }
};


function getIndex(e){
    var es = document.querySelectorAll( ".collery-container.selected .collery" );
    var index = -1;
    for (var i = 0; i < es.length; i++) {
        if(e == es[i]){
            index = i;
        }
    }
    return index;
} 

// click of image in website
document.addEventListener("DOMContentLoaded", function(event) { 
    var colleryAll = document.querySelectorAll( ".collery" );
    for (var i = 0; i < colleryAll.length; i++) {
        colleryAll[i].addEventListener('click', function(event) {
            event.preventDefault();
            
        //$(this).parents().eq(2).addClass('selected'); // in case collery-container is two levels higher (ex. ul>li>a>img)
        var colleryInd = document.querySelectorAll( ".collery" );
        for (var i = 0; i < colleryInd.length; i++) {
            if(this == colleryInd[i]){
                window.totalIndex = i;
            }
        }

        /*if(total == -1){ // in case the collery-container is only one level higher than img (ex. div>a>li)
            $(this).parents().eq(2).removeClass('selected');
            $(this).parents().eq(1).addClass('selected');
            total = $('.collery-container.selected a img.collery').length - 1;
            alert("level 1");
        }*/
        if(this.closest( '.collery-container' )){
            this.closest( '.collery-container' ).classList.add("selected");
        } 
        
        window.total = document.querySelectorAll('.collery-container.selected a img.collery').length - 1;
        // get index of clicked image
        //window.totalIndex = colleryAll.length -1;
        index = getIndex(this);
        // for single image (without collery-container)
        if(window.total == -1 || isNaN(window.total)){
            total = 0;
            index = 0;
        }
        //alert('Total: ' + total);
        //alert('Index: ' + index);
        getPosition();
        loadImage();
        textColor();
        //document.querySelector('.title').innerHTML(imgTitle);
        showImage();
        open = true;
        // test values
        //alert('The top is: ' + windowTop + ', the left is: ' + windowLeft + ', the width is: ' + imgWidth + ', the height is: ' + imgHeight + ', source is: ' + imgSrc + ', index is: ' + index)
        
        
    }, false);
    }
    
    // close the ui and reset values
    function close() {
        open = false;
        if(document.querySelector('.collery-container.selected')){
            document.querySelector('.collery-container.selected').classList.remove("selected");
        }
        getPosition();
        setTimeout(function() {
            document.querySelector('.gallery').classList.remove("zoom");
            document.querySelector('.cover').classList.remove("zoom");
            document.querySelector('.title').classList.remove("zoom");
            document.querySelector('.close').classList.remove("zoom");
            document.querySelector('.container').classList.remove("zoom");
            document.querySelector('.gallery').style.top = windowTop + 'px';
            document.querySelector('.gallery').style.left = windowLeft + 'px';
            document.querySelector('.gallery').style.width = imgWidth + 'px';
            document.querySelector('.gallery').style.height = imgHeight + 'px';
            
        }, 1);
        setTimeout(function() {
            document.querySelector('.gallery').style.display = "none";
            document.querySelector('.close').style.display = "none";
            document.querySelectorAll('.next')[0].style.display = "none";
            document.querySelectorAll('.next')[1].style.display = "none";
            document.querySelectorAll('.previous')[0].style.display = "none";
            document.querySelectorAll('.previous')[1].style.display = "none";
            document.querySelector('.cover').style.display = "none";
            document.querySelector('.title').style.display = "none";
            
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

    document.querySelector( ".cover" ).addEventListener("click", function(event) {
        close();
        return false;
    });

    document.querySelectorAll( ".previous" )[0].addEventListener("click", function(event) {
        previous();
        return false;
    });
    document.querySelectorAll( ".previous" )[1].addEventListener("click", function(event) {
        previous();
        return false;
    });
    
    document.querySelectorAll( ".next" )[0].addEventListener("click", function(event) {
        next();
        return false;
    });
    document.querySelectorAll( ".next" )[1].addEventListener("click", function(event) {
        next();
        return false;
    });
    
    document.querySelector( ".close" ).addEventListener("click", function(event) {
        close();
        return false;
    });
    
    // handle keyboard events
    window.addEventListener("keydown", function (e) {
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