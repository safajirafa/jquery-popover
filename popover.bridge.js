// Make sure Object.create is available in the browser (for our prototypal inheritance)
// Courtesy of Papa Crockford
// Note this is not entirely equal to native Object.create, but compatible with our use-case
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {} // optionally move this outside the declaration and into a closure if you need more speed.
        F.prototype = o;
        return new F();
    };
}

(function($) {
    // Start a plugin
    $.fn.popOver = function(options) {

        // Don't act on absent elements -via Paul Irish's advice
        if (this.length) {
            return this.each(

            function() {
                // Create a new popOver object via the Prototypal Object.create
                var customPopOver = Object.create(popOver);

                // Run the initialization function of the popOver
                customPopOver.init(options, this); // 'this' refers to the element
                
                // Save the instance of the popOver object in the element's data store
                $.data(this, 'popOver', customPopOver);
            });
        }
    };
})(jQuery);