'use strict';

// LOAD NAMESPACE
var SNAIL = SNAIL || {};

SNAIL.folio = (function(){

  // PRIVATE VARS
  var defaults = {
    _el : '',
    _img : '',
    _caption : '',
    _json : {},
    _list : [],
    _selected : ''
  };

  // SETTERS GETTERS ///////////////////////
  var setDefaults = function(configObj){
    defaults._el = configObj.el || 'project';
    defaults._selected = configObj.project || 'mw_searchsale';
    defaults._img = document.getElementById(configObj.img);
    defaults._caption = document.getElementById(configObj.caption);
    defaults._list = document.getElementsByClassName(defaults._el);
  };
  var setJSON = function(json){
    defaults._json = json;
  };
  var getDefaults = function(){
    return defaults;
  };
  var getListIndex = function(projectName){ // returns index of project in _list
    return defaults._json[projectName].index;
  };

  // EVENTS ///////////////////////
  var attachEvents = function(){
    var that = this;
    // attach clicks to project list
    for(var i=0, l=defaults._list.length; i < l; i++){
      defaults._list[i].addEventListener('click', function(e){ clickHandler(e); }.bind(that), false);
    }
    // hovers for caption
    defaults._img.addEventListener('mouseover', function(e){ mouseOverHandler(e); }.bind(that), false);
    defaults._img.addEventListener('mouseout', function(e){ mouseOutHandler(e); }.bind(that), false);
  };
  var clickHandler = function(e){
    var clickedProj = e.target.dataset.project.toString();
    if( clickedProj === defaults._selected){
      return false;
    }

    // fade in out effect on click
    hover(defaults._img, 'out');
    setTimeout(function(){
      swapImg(clickedProj);
      hover(defaults._img, 'in');
    }, 150);

    updateSidebar(clickedProj);
  };
  var updateSidebar = function(clickedProj){
    // add selected class to the sidebar
    defaults._list[getListIndex(defaults._selected)].classList.remove('selected');
    defaults._list[getListIndex(clickedProj)].classList.add('selected');
    // update defaults
    defaults._selected = clickedProj;
  };
  // swap out the old image with the new image
  var swapImg = function(clickedProj){
    defaults._img.src = defaults._json[clickedProj].img;
    defaults._img.parentNode.href = defaults._json[clickedProj].url;
    defaults._caption.innerHTML = defaults._json[clickedProj].caption;
  };
  var mouseOverHandler = function(e){
    e.stopPropagation();
    hover(defaults._caption, 'in');
  };
  var mouseOutHandler = function(e){
    e.stopPropagation();
    hover(defaults._caption, 'out');
  };
  var hover = function(el, inOrOut){
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
    return el;
  };

  // PUBLIC API METHODS ///////////////////////
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
  // initalize the static obj
  var init = function(configObj, json){
    setJSON(json);
    setDefaults(configObj);
    attachEvents();
  };

// API ///////////////////////
  return {
    init : init,
    getDefaults : getDefaults,
    getListIndex : getListIndex,
    hover : hover,
    preloadImages : preloadImages,
    getImgArr : getImgArr,
    swapImg : swapImg,
    updateSidebar : updateSidebar
  };
})();