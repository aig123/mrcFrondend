import HelloWorld from './src/main';
HelloWorld.install = function(Vue) {
  Vue.component(HelloWorld.name, HelloWorld);
};
export default HelloWorld;
