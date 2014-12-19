var Portfolio = function(jsonIn, selectedIn, elIn, idIn, captionIn){
  // PRIVATE VARS
  var defaults = {
    _el : '',
    _img : '',
    _caption : '',
    _json : {},
    _list : [],
    _selected : ''
  }

  // SETTERS AND HELPERS
  var setClassName = function(el){
    defaults._el = el;
  }
  var setImg = function(id){
    defaults._img = document.getElementById(id);
  }  
  var setCaption = function(id){
    defaults._caption = document.getElementById(id);
  }
  var fetchProjectList = function(){
    defaults._list = document.getElementsByClassName(defaults._el);
  }
  var setProjects = function(jsonIn){
    defaults._json = jsonIn || {};
  }  
  var setSelectedItem = function(project){
    defaults._selected = project;    
  }
  var getListIndex = function(projectName){ 
    // returns index of project in _list
    // TODO: create hash map for constant lookup time
    for(var i=0, l=defaults._list.length; i < l; i++){
      if(defaults._list[i].dataset['project'] === projectName){        
        return i;
      }
    }
  }

  // EVENTS
  var attachEvents = function(){    
    // attach clicks to project list
    for(var i=0, l=defaults._list.length; i < l; i++){      
      defaults._list[i].addEventListener('click', clickHandler, false)
    }    
    // hovers for caption
    defaults._img.addEventListener('mouseover', mouseOverHandler, false);
    defaults._img.addEventListener('mouseout', mouseOutHandler, false);
  }

  var clickHandler = function(e){    
    var clickedProj = e.target.dataset.project.toString();   
    if( clickedProj === defaults._selected) return false;

    // swap out the old image with the new image
    var restoreImg = function(){      
      defaults._img.src = defaults._json[clickedProj].img
      defaults._img.parentNode.href = defaults._json[clickedProj].url;
      defaults._caption.innerHTML = defaults._json[clickedProj].caption;  
      Portfolio.prototype.fadeIn(defaults._img)
    }    
    Portfolio.prototype.fadeOut(defaults._img)
    setTimeout(restoreImg, 150);      

    // add selected class to the sidebar
    defaults._list[getListIndex(defaults._selected)].classList.remove('selected');    
    defaults._list[getListIndex(clickedProj)].classList.add('selected');    

    // update defaults
    setSelectedItem(clickedProj) 
  }  

  // TODO: might wanna curry these two
  var mouseOverHandler = function(e){
    e.stopPropagation();    
    Portfolio.prototype.fadeIn(defaults._caption)
  }
  var mouseOutHandler = function(e){
    e.stopPropagation();    
    Portfolio.prototype.fadeOut(defaults._caption)
  }  

  // CONSTRUCTOR METHODS   
  setProjects(json);
  setClassName(elIn);
  setSelectedItem(selectedIn)  
  setImg(idIn);
  setCaption(captionIn);
  fetchProjectList();   
  attachEvents();    
};

// PUBLIC METHODS
Portfolio.prototype = {
  // TODO: curry these two also
  fadeIn : function(el) {  
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 200;
      last = +new Date();

      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    };
    tick();
  },
  fadeOut : function(el) {
    el.style.opacity = 1;

    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity - (new Date() - last) / 200;
      last = +new Date();

      if (+el.style.opacity > 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    };
    tick();
  },
  // from stackoverflow!
  preloadImages : function(array){
    var list = [];
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
  },
  getImgArr : function(json){
    var arr = [];
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        arr.push(json[key].img);
      }
    }
    return arr;
  } 
}