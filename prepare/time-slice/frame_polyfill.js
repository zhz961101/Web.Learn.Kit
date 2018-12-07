function poly_RAF(_easy_) {
    _easy_ = _easy_ || False
    if (_easy_) {
        // easy mode
        return fn => setTimeout(fn,/* 1000/60 */ 17)
    } else {
        // strict mode
        function frame(callback) {
            var lastTime = 0;
            return function(callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
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
