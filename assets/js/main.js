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

  // PRIVATE METHODS  
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
  var swapSelectedImg = function(newProject){
    Portfolio.prototype.fadeOut(defaults._img)    
    var restoreImg = function(){      
      defaults._img.src = defaults._json[newProject].img
      defaults._img.parentNode.href = defaults._json[newProject].url;
      defaults._caption.innerHTML = defaults._json[newProject].caption;  
      Portfolio.prototype.fadeIn(defaults._img)
    }
    
    setTimeout(restoreImg, 150);
  }  
  var swapSelectedItem = function(oldProject, newProject){
    defaults._list[getListIndex(oldProject)].classList.remove('selected');    
    defaults._list[getListIndex(newProject)].classList.add('selected');    
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
    swapSelectedImg(clickedProj);        
    swapSelectedItem(defaults._selected, clickedProj)    // add selected class        
    setSelectedItem(clickedProj) // update defaults
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

  // PRIVILEGED METHODS
  this.getProjects = function(){
    return defaults._json;
  }
  this.getList = function(){
    return defaults._list;
  }
  this.getEl = function(){
    return defaults._el;
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
        console.log(img.src)
    }
  }
}