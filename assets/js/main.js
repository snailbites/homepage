var Portfolio = function(jsonIn, selectedIn, elIn, idIn){
  // private vars
  var defaults = {
    _el : '',
    _imgId : '',
    _json : {},
    _list : [],
    _selected : ''
  }

  // PRIVATE METHODS

  // returns index of project in _list
  var getListIndex = function(projectName){
    // TODO: create hash map for constant lookup time
    for(var i=0, l=defaults._list.length; i < l; i++){
      if(defaults._list[i].dataset['project'] === projectName){
        return i;
      }
    }
  }
  var setClassName = function(el){
    defaults._el = el;
  }
  var setImgId = function(id){
    defaults._imgId = document.getElementById(id);
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
    // remove 
    // set model data to new item

    // 
    defaults._list[getListIndex(oldProject)].classList.remove('selected');    
    defaults._list[getListIndex(newProject)].classList.add('selected');
    setSelectedItem(newProject) 
  }
  var attachEvents = function(){    
    for(var i=0, l=defaults._list.length; i < l; i++){      
      defaults._list[i].addEventListener('click', eventHandler, false)
    }    
  }
  var eventHandler = function(e){    
    // change the image path 
    console.log(defaults._json)
    console.log(e.target.dataset)
    // console.log(defaults._json[parseInt(e.target.dataset.index)].img)   
    // defaults._imgId.src = defaults._list[parseInt(e.target.dataset.index)].img;

    

    // change caption    

    // add selected class    
    swapSelectedItem(defaults._selected, e.target.dataset.project)    
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
  setClassName(elIn);
  setSelectedItem(selectedIn)  
  setImgId(idIn);
  fetchProjectList(); 

  // setup
  attachEvents();    
  
};

Portfolio.prototype = {
}