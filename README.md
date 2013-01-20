#Dynamic Title

This plugin allows you to show 'title' or 'alt' attributes of images as animated sticker: floating, collapsing, having its own Titles, above, beneath or inside of image etc, with lot of settings.

## Getting Started
Download the [javascript file][js] of version 0.1.0, [css file][css], [collapse icon][ci] and [expand icon][ei], or simply download [zip archive][zip] with all needed files.

[js]: https://raw.github.com/dvbscript/dynamictitle/master/dynamictitle.js
[css]: https://raw.github.com/dvbscript/dynamictitle/master/dynamictitle.css
[ci]: https://raw.github.com/dvbscript/dynamictitle/master/top_right_collapse.png
[ei]: https://raw.github.com/dvbscript/dynamictitle/master/top_right_expand.png
[zip]: https://github.com/dvbscript/dynamictitle/archive/master.zip

In your web page:

```html
<link rel="stylesheet" type="text/css" href="dynamictitle.css" />
<script type="text/javascript" src="jquery-1.8.3.js"></script>
<script type="text/javascript" src="dynamictitle.js"></script>

<script type="text/javascript">
$(window).load(function(){  
    $('.content img').dynamictitle({
        changePositionSpeed:500,
        collapseSpeed: 150,
        margin: 5,
        leftOffset: 50,
    });
});
</script>
```
Why "$(window).load()" instead of "$(document).ready()"? It is because of Google Chrome and Safari can not calculate size of an image until it's loaded. If you are sure all your images have "widht" and "height" attributes, you can use "$(document).ready()".

In some CMS, for example, Drupal 7, you need to wrap your code in the jQuery.noConflict() function:
```html
<script type="text/javascript">
var $dr = jQuery.noConflict();

$noConf(window).load(function(){	
        $noConf('.content img').dynamictitle({
            changePositionSpeed:500,
            collapseSpeed: 150,
            margin: 5,
            leftOffset: 50,
        });
});  
</script>
```
##Settings

<table>
  <tr>
    <th>Feature</th>
    <th>Description</th>
    <th>Type</th>
    <th>Default</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>tagattr</td>
    <td>'title' or 'alt' attributes.</td>
    <td>String</td>
    <td>'title'</td>
    <td>'alt'</td>
  </tr>
  <tr>
    <td>titleSplitter</td>
    <td>Separator header and content of the Dynamic Title, must be in the attribute 'title' or 'alt'.</td>
    <td>String</td>
    <td>'::'</td>
    <td>&lt;img src=&quot;demo.jpg&quot; title=&quot;PLUGIN DYNAMIC TITLE::This plugin allows you to show...&quot;/&gt;<br />
  </td>
  </tr>
  <tr>
    <td>stickWinWidth</td>
    <td>The width of the Dynamic Title. If 'lageElementSize' not set to 0, it will be applied to 'small' pictures only.</td>
    <td>Integer</td>
    <td>300</td>
    <td>300</td>
  </tr>
  <tr>
    <td>lageElementSize</td>
    <td>If the picture is larger than this value, the Dynamic Title is set to entire width of the picture, and don't respond to mouse movements.</td>
    <td>Integer</td>
    <td>500</td>
    <td>300</td>
  </tr>
  <tr>
    <td>margin</td>
    <td>Vertical indent from the image.</td>
    <td>Integer</td>
    <td>5</td>
    <td>5</td>
  </tr>
  <tr>
    <td>speedTitleShow</td>
    <td>Rate of appearance of the Dynamic Title.</td>
    <td>Integer</td>
    <td>300</td>
    <td>300</td>
  </tr>
  <tr>
    <td>changePositionSpeed</td>
    <td>Speed of the image moving up and down while scrolling.</td>
    <td>Integer</td>
    <td>500</td>
    <td>200</td>
  </tr>
  <tr>
    <td>collapseSpeed</td>
    <td>Speed of collapsing of the Dynamic Title by clicking on the "Collapse" button.</td>
    <td>Integer</td>
    <td>150</td>
    <td>150</td>
  </tr>
  <tr>
    <td>expandSpeed</td>
    <td>Speed of expanding of the Dynamic Title by clicking on the "Expand" button. If it is not set this speed equal to the collapsing.</td>
    <td>Integer</td>
    <td>null</td>
    <td>100</td>
  </tr>
</table>
The rest coming soon...
## Live demo
http://dvbscript.ru/dynamictitle
