'use strict';
function Walker(walk){
  this.walk = walk;
}

Walker.prototype.walkSelect = function(node, r){
  var name = node.getAttribute("name");
  var cs = node.querySelectorAll("option");
  if(node.hasAttribute("multiple")){
    r[name] = [];
    for(var i=0,j=cs.length; i<j; i++){
      if(cs[i].hasAttribute("selected")){
        r[name] = cs[i].value;
      }
    }
  }else{
    for(var i=0,j=cs.length; i<j; i++){
      if(cs[i].hasAttribute("selected")){
        r[name] = cs[i].value;
        return;
      }
    }
  }
};
Walker.prototype.walkInput = function(node, r){
  var type = node.getAttribute("type");
  if(type === "submit"){
    return;
  } else if(type === "checkbox"){
    var name = node.getAttribute("name");
    if(!r[name]){
      r[name] = [];
    }
    if(node.hasAttribute("checked")){
      r[name].push(node.value);
    }
  }else if(type === "radio"){
    if(node.hasAttribute("checked")){
      r[node.getAttribute("name")] = node.value;
    }
  }else{
    r[node.getAttribute("name")] = node.value;
  }
};
Walker.prototype.walkScope = function(node){
  var r = {};
  var cs = node.children;
  for(var i=0,j=cs.length; i<j; i++){
    walk(this, cs[i], r);
  }
  return r;
};
Walker.prototype.walkCollection = function(node){
  var r = [];
  var cs = node.children;
  for(var i=0,j=cs.length; i<j; i++){
    var sub = {};
    walk(this, cs[i], sub);
    r.push(sub);
  }
  return r;
};
Walker.prototype.walkNode = function(node){
  var r = {};
  walk(this, node, r);
  return r;
};
Walker.prototype.extract = function(form){
  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("value", JSON.stringify(this.walkNode(form)));
  form.appendChild(input);
};

function walk(walker, node, r){
  if(node.hasAttribute("disabled")){
    return;
  }
  if(node.nodeName === "INPUT"){
    walker.walkInput(node, r);
  }else if(node.nodeName === "SELECT"){
    walker.walkSelect(node, r);
  }else if(node.hasAttribute("scope")){
    r[node.getAttribute("scope")] = walker.walkScope(node);
  }else if(node.hasAttribute("collection")){
    r[node.getAttribute("collection")] = walker.walkCollection(node);
  }else {
    var cs = node.children;
    for(var i=0,j=cs.length; i<j; i++){
      walk(walker, cs[i], r);
    }
  }
}

function ActionRegister(root){
  this.root = root;
  this.state = {};
}

ActionRegister.prototype.addItem = function(ev){
  var src = ev.target;
  if((src.nodeName === "BUTTON") && (src.getAttribute("data-role") === "add")){
    var target = src.getAttribute("data-target");
    var parent = document.querySelector("form [collection='{}']".replace("{}", target));
    var newitem;
    if(!!this.state[target]){
      newitem = this.state[target].cloneNode(true);
    }else{
      newitem = parent.querySelector(":first-Child").cloneNode(true);
    }
    var cs = newitem.querySelectorAll("input");
    for(var i=0,j=cs.length; i<j; i++){
      cs[i].value = "";
    }
    parent.appendChild(newitem);
  }
};
ActionRegister.prototype.removeItem = function(ev){
  var src = ev.target;
  if((src.nodeName === "BUTTON") && (src.getAttribute("data-role") === "remove")){
    var target = src.getAttribute("data-target");
    while(!(src.parentElement.hasAttribute("collection"))){
      src = src.parentElement;
    }
    this.state[target] = src.parentElement.removeChild(src);
  }
};
ActionRegister.prototype.bind = function(node){
  node = node || this.root;
  node.addEventListener("click", this.addItem.bind(this));
  node.addEventListener("click", this.removeItem.bind(this));
};
