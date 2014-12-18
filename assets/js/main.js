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
  var swapSelectedItem = function(oldProject, newProject){
    defaults._list[getListIndex(oldProject)].classList.remove('selected');    
    defaults._list[getListIndex(newProject)].classList.add('selected');    
  }
  var swapSelectedImg = function(newProject){
    defaults._img.src = defaults._json[newProject].img
    defaults._img.parentNode.href = defaults._json[newProject].url;
    defaults._caption.innerHTML = defaults._json[newProject].caption;
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
    for(var i=0, l=defaults._list.length; i < l; i++){      
      defaults._list[i].addEventListener('click', clickHandler, false)
    }    
  }
  var clickHandler = function(e){    
    var clickedProj = e.target.dataset.project.toString();         
    swapSelectedImg(clickedProj);        
    swapSelectedItem(defaults._selected, clickedProj)    // add selected class        
    setSelectedItem(clickedProj) // update defaults
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
}