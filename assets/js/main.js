var Portfolio = function(jsonIn, elIn){
  // private vars
  var defaults = {
    _el : '',
    _json : {},
    _list : [],
    _selected : ''
  }

  // private methods
  var setClassName = function(el){
    defaults._el = el;
  }
  var fetchProjectList = function(){
    defaults._list = document.getElementsByClassName(defaults._el);
  }
  var setProjects = function(jsonIn){
    defaults._json = jsonIn || {};
  }  
  var setSelected = function(index){
    defaults._selected = index;
  }
  var swapSelected = function(oldIndex, newIndex){
    defaults._list[oldIndex].classList.remove('selected');
    setSelected(newIndex)
    defaults._list[newIndex].classList.add('selected');
  }
  var attachEvents = function(){    
    for(var i=0, l=defaults._list.length; i < l; i++){      
      defaults._list[i].addEventListener('click', eventHandler, false)
    }    
  }
  var eventHandler = function(e){
    console.log(e)    
    // change the image path    

    // change caption

    // add selected class
    swapSelected(defaults._selected, parseInt(e.target.dataset.index))
  }  
  


  // privileged methods
  this.getProjects = function(){
    return defaults._json;
  }
  this.getList = function(){
    return defaults._list;
  }
  this.getEl = function(){
    return defaults._el;
  }  

  // constructor   
  setProjects(json);
  setClassName(elIn)  
  fetchProjectList(); 

  // setup
  attachEvents();    
  setSelected(0)
};

Portfolio.prototype = {
}