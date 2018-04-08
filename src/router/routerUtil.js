/**
 * Author H.W 876399223@qq.com
 **/
import routerMap from "./routerMap"
let routerData = [];
let layerNum = 2;
//返回路径
let getPath = function(element){
  let url = "/";
  let urlHandle = function(){
    if(element.hasOwnProperty("parent")){
      url += element.parent.name + "/"
      getPath(element.parent);
    };
  }
  urlHandle(element);
  return url;
}

export default{
  initFormat(_routesList, bool){
    if (_routesList.hasOwnProperty("childrens")) {
      let that = this;
      _routesList.childrens.forEach(function (element) {
        //层次，父子指向
        if (!bool) {
          element.lev = 1;
        } else {
          element.type = "children";
          element.parent = _routesList;
          element.lev = _routesList.lev + 1;
        };
        //路径没有子路由，或者层次等于限定层的都应该有路径
        if(element.lev == layerNum || !element.hasOwnProperty("childrens")){
          element.path = getPath(element) + element.name;
          element.component = routerMap[element.name];
        }else{
          element.path = "";
        };
        //如需要吧限定层意外的子节点注册到路由，去掉if
        if(element.lev <= layerNum){
          routerData.push(element);
          that.initFormat(element, true);
        }
      });
    };
  },
  getDataMap(){
    return routerData;
  }
}
