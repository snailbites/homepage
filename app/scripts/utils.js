var Utils = (function(){
  var fade = function(inOrOut){
    return function(el){
      el.style.opacity = (inOrOut === 'in') ? 0 : 1;

      var last = +new Date();

      var tick = function() {
        var step = (new Date() - last) / 200;
        el.style.opacity = (inOrOut === 'in') ? +el.style.opacity + step : +el.style.opacity - step;
        last = +new Date();

        var test = (inOrOut === 'in') ? +el.style.opacity < 1 : +el.style.opacity > 0;
        if (test) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };
      tick();
    }
  };

  // preload the images for faster animation
  var preloadImages = function(array){
    var list = [];
    for (var i = 0, l = array.length; i < l; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        };
        list.push(img);
        img.src = array[i];
    }
  };
  // return array of image paths from json
  var getImgArr = function(json){
    var arr = [];
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        arr.push(json[key].img);
      }
    }
    return arr;
  };


  // PUBLIC API METHODS ///////////////////////
  return {
    fadeIn : fade('in'),
    fadeOut : fade('out'),
    preloadImages : preloadImages,
    getImgArr : getImgArr
  };
})();