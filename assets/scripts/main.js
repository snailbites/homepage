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
  // TODO: combine into set defaults
  // TODO: take in one default obj and parse
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
// -----------------


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
  var mouseOverHandler = function(e){
    e.stopPropagation();    
    Portfolio.prototype.fadeIn(defaults._caption)
  }
  var mouseOutHandler = function(e){
    e.stopPropagation();    
    Portfolio.prototype.fadeOut(defaults._caption)
  }  

  // CONSTRUCTOR METHODS 

  // TODO: combine into set defaults
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
  hover : function(el, inOrOut){
    el.style.opacity = (inOrOut === 'in') ? 0 : 1;

    var last = +new Date();    
    var tick = function() {
      var step = (new Date() - last) / 200;
      el.style.opacity = (inOrOut === 'in') ? +el.style.opacity + step : +el.style.opacity - step;      
      last = +new Date();

      var test = (inOrOut === 'in') ? +el.style.opacity < 1 : +el.style.opacity > 0;      
      if (test) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    };
    tick();
  },
  fadeIn : function(el){
    return Portfolio.prototype.hover(el, 'in');
  },
  fadeOut : function(el){
    return Portfolio.prototype.hover(el, 'out');
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
  // return array of images from json
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