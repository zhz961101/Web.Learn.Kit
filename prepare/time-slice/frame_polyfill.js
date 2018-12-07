function poly_RAF(_easy_) {
    _easy_ = _easy_ || False
    if (_easy_) {
        // easy mode
        return fn => setTimeout(fn, /* 1000/60 */ 16.7)
    } else {
        // strict mode
        return function frame(fn) {
            var lastTime = 0;
            return function(fn) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = setTimeout(function() {
                    fn(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            }
        }
    }
}

window.requestFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || poly_RAF();
})();

window.cancelFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        id => clearTimeout(id)
})();

// idle frame
window.requestIdleFrame = (function() {
    return window.requestIdleCallback || function(cb) {
        var start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 33 - (Date.now() - start));
                },
            });
        }, 1);
    };
})();

window.cancelIdleFrame = (function() {
    return window.cancelIdleCallback || id => clearTimeout(id);
})();
