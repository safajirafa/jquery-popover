/**
 * Pop over object
 * Representing an iOS like pop over
 * Use this object along Alex Sexton bridge technique
 */
var popOver = {

    options: {
        title: "Create", // The shorter the better :)
        height: 420,
        width: 280,
        closeText : "Close"
    },
    init: function(options, elem) {
        // Mix in the passed in options with the default options
        this.options = $.extend({}, this.options, options);

        var mainObject = this;
        this.elem = elem; // Save the element reference (object)
        this.$elem = $(elem); // Save the element reference (jQuery)

        this._build();

        // return this so we can chain/use the bridge with less code.
        return this;
    },
    // Build initial DOM structure
    _build: function(){
        var popOverArrow = $('<div>').addClass('pop-over-arrow');
        var popOverHeader = $('<div>').addClass('pop-over-header');
        var popOverTitle = $('<div>').addClass('pop-over-title').append(this.options.title);
        var popOverCloseButton = $('<input>').prop({
            'type' : 'button',
            'id' : 'btnClosePopOver',
            'value' : this.options.closeText
        });

        var popOverContent = $('<div>').addClass('pop-over-content');

        this.$elem.append(popOverArrow); // Append arrow to element
        this.$elem.append(popOverHeader); // Append header to element
        $(popOverTitle).appendTo('.pop-over-header'); // Append title to header
        $(popOverCloseButton).appendTo('.pop-over-header'); // Append close button to header
        this.$elem.append(popOverContent);

        // Delegate close function
        this.$elem.delegate("#btnClosePopOver", "click", function() {
            $(this).closest('#categoriesPopOver').hide();
        });

        this.$elem.width(this.options.width);
        this.$elem.height(this.options.height);
    },
    // Show pop over with given x-position and y-position
    show: function(event) {

        var xPos = event.target.offsetLeft;
        var yPos = event.target.clientHeight + 30;
        var arrowWidth = 15;
        var xPosArrow = (event.target.clientWidth / 2) - arrowWidth;

        // If xPosArrow results in negative value, set it to 2px
        if(xPosArrow < 0)
            xPosArrow = 2;

        this.$elem.css({
            'left': xPos + 'px',
            'top': yPos + 'px',
            'display': 'block'
        });

        // Set arrow position
        this.$elem.find('.pop-over-arrow').css({
            'top' : '-28px', // This is the height of the arrow
            'left' : xPosArrow
        });
    },
    // Hides pop over
    hide: function() {
        this.$elem.css({
            'display': 'none'
        });
    },
    // Check if pop over is visible
    isVisible : function() {
        if(this.$elem.is(':visible'))
            return true;
        else
            return false;
    }
};