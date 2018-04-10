# SETUP:

To use the Collery Gallery plugin, you must link the collery.js and collery.css files correctly.

## Text transitions:
You can change the transition of the text in the collery.js file, 
under `// TEXT RELOAD EFFECTS` you can find three different transitions, 
by default the first (Fade from bottom) is selected, 
to change this put it in comments and take the one you want out of comments.

## Adding image to gallery:
All images you want in your slideshow must have the collery class.
If you want an image to be displayed inside of the slideshow but not on your page, also give it the class "hidden".
Also, you have to add the "data-collery-width" and "data-collery-height" attributes 
to your img with the maximum dimensions you want it to display (might be smaller than actual image file for 2x files), 
also make sure your image has a title as this is the name that will be displayed.
If you want the gallery image to be a different file than the one in your page, 
you must put your image inside of a link to the zoomed in image, if not it will just zoom into the same image (from the img tag) note: not using link may break gallery.
To get a colored background, you must specify this with a HEX in the "data-collery-color" attribute, if this is not set, it will default to a black background.


## Example code:

    <div class="container">
            <ul class="collery-container">
                <li><a href="img/diamond@2x.jpg"><img src="img/diamond.jpg" title="Diamond" data-collery-width="450" data-collery-height="800" class="collery" alt=""></a></li>
    	</ul>
    </div>
