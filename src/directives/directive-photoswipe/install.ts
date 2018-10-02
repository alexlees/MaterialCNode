import { VueConstructor, PluginObject } from 'vue';
import photoswipe, { Options } from 'photoswipe';
import { createPSWP } from '@/directives/directive-photoswipe/createPSWP';
import store from './store';
import 'photoswipe/dist/photoswipe.css';
import ui from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/default-skin/default-skin.css';
import { Log } from '@/utils/log';

const pswpElement = createPSWP();
class DirectivePhotoswipe implements PluginObject<Options> {
  public install(Vue: VueConstructor, globalOptions: Options = {loop: true, maxSpreadZoom: 3, modal: true}) {
    Vue.directive('photoswipe', {
      bind(
        el: HTMLElement,
      ) {
        store.add(el);
        const options: Options = {};
        // TODO 合并指令配置
        Object.assign(options, globalOptions);
        el.addEventListener('click', (e: MouseEvent) => {
          const target = e.target!;
          store.set(el);
          if (target instanceof HTMLImageElement) {
            options.index = store.findIndex(el, target);
            const gallery = new photoswipe(pswpElement, ui, store.get(el), options);
            gallery.init();
          }
        });
      },
      update(el: HTMLElement) {
        Log.log('photoswipe update');
        store.set(el);
      },
    });
  }
}
export default new DirectivePhotoswipe();
