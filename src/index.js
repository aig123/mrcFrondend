import mrcDialog from '../src/components/mrcDialog/index.js';
import mrcForm from '../src/components/mrcForm/index.js';
import mrcSearchForm from '../src/components/mrcSearchForm/index.js';
import mrcTable from '../src/components/mrcTable/index.js';
import mrcTableSimple from '../src/components/mrcTableSimple/index.js';
// import hhImportant from '../src/components/HhImportant/index.js';
// import hhInputNumber from '../src/components/HhInputNumber/index.js';
// import hhUpload from '../src/components/HhUpload/index.js';
import indexApp from '../src/components/indexApp/index.js';
import indexApp2 from '../src/components/indexApp2/index.js';
import indexApp3 from '../src/components/indexApp3/index.js';
import indexApp4 from '../src/components/indexApp4/index.js';
import indexTab from '../src/components/indexTab/index.js';
import indexTab2 from '../src/components/indexTab2/index.js';
import indexTab3 from '../src/components/indexTab3/index.js';
import indexTab4 from '../src/components/indexTab4/index.js';
import mrcFullScreen from '../src/components/mrcFullScreen/index.js';
import mrcIframeTab from '../src/components/mrcIframeTab/index.js';

const components = [
  mrcDialog,
  mrcForm,
  mrcSearchForm,
  mrcTable,
  indexApp,
  indexApp2,
  indexApp3,
  indexApp4,
  indexTab,
  indexTab2,
  indexTab3,
  indexTab4,
  mrcFullScreen,
  mrcIframeTab,
  mrcTableSimple
];
const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
});
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default install
