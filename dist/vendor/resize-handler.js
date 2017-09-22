/**
 * Created by dominikhorn on 12.07.17.
 */
var isResizing = false,
    lastDownX = 0,
    expanded = true;

$(function () {
    var container = $('#js-drop-zone'),
        right = $('#js-properties-panel'),
        handle = $('#resize-drag');

    handle.on('mousedown', function (e) {

        isResizing = true;
        lastDownX = e.clientX;
    });



    var unFocus = function () {
        if (document.selection) {
            document.selection.empty()
        } else {
            window.getSelection().removeAllRanges()
        }

    };

    $('#toggle-resize').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (expanded){
            right.css('width', 2)
        }else{
            right.css('width', 360)
        }
        expanded = !expanded;
    });
    $(document).on('mousemove', function (e) {

        // we don't want to do anything if we aren't resizing.
        if (!isResizing)
            return;
        unFocus();
        var offsetRight = container.width() - (e.clientX - container.offset().left);

        right.css('width', offsetRight);
    }).on('mouseup', function (e) {
        // stop resizing
        isResizing = false;
    });
});
