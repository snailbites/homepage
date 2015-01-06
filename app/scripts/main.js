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
    defaults._json = SNAIL.json;
  };
  // var setJSON = function(json){

  // };
  var getDefaults = function(){
    return defaults;
  };
  var getListIndex = function(projectName){ // returns index of project in _list
    return SNAIL.json[projectName].index;
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
    SNAIL.utils.fadeOut(defaults._img);
    setTimeout(function(){
      swapImg(clickedProj);
      SNAIL.utils.fadeIn(defaults._img);
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
    SNAIL.utils.fadeIn(defaults._caption);
  };
  var mouseOutHandler = function(e){
    e.stopPropagation();
    SNAIL.utils.fadeOut(defaults._caption);
  };
  // initalize the static obj
  var init = function(configObj){
    setDefaults(configObj);
    attachEvents();
  };

  // API ///////////////////////
  return {
    init : init,
    getDefaults : getDefaults,
    getListIndex : getListIndex,
    swapImg : swapImg,
    updateSidebar : updateSidebar
  };
})();

