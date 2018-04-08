import LRScreen from './src/main';
LRScreen.install = function(Vue) {
  Vue.component(LRScreen.name, LRScreen);
};
export default LRScreen;