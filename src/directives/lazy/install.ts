import { VueConstructor, PluginObject, VNodeDirective } from 'vue';
import { Log } from '@/utils/log';
import './lazy.css';

interface LazyOptions {
  aspectRatio: number;
}
const DATA_SRC = 'data-src';
const lazyCSS = 'lazy';
const animationCSS = 'animation';
class Lazy implements PluginObject<LazyOptions> {
  private options: IntersectionObserverInit = {};
  private readonly observer = new IntersectionObserver(
    this.IntersectionObserverCallback,
    this.options,
  );
  public install(Vue: VueConstructor, GlobalOptions: LazyOptions = {aspectRatio: 1}) {
    Vue.directive('lazy', {
      bind: (el: HTMLElement, binding: VNodeDirective) => {
        this.checkEl(el);
        Log.log(binding.value);
        if (el instanceof HTMLImageElement) {
          this.initLazy(el, binding.value, GlobalOptions);
        }
      },
      inserted: (el) => {
        if (el instanceof HTMLImageElement) {
          this.observer.observe(el);
        }
      },
      update: (el) => {
        if (el instanceof HTMLImageElement) {
          this.observer.observe(el);
        }
      },
      unbind: (el) => {
        if (el instanceof HTMLImageElement) {
          this.observer.unobserve(el);
        }
      },
    });
  }
  private checkEl(el: Element) {
    if (el instanceof HTMLImageElement) {
      // TODO
    } else {
      Log.err('v-lazy directive can only use on HTMLImageElement.');
    }
  }
  private IntersectionObserverCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    Log.log(entries);
    entries.forEach((e) => {

      if (e.isIntersecting) {
        const target = e.target;
        if (target instanceof HTMLImageElement) {
          target.src = target.getAttribute(DATA_SRC)!;
          observer.unobserve(target);
        }
      }
    });
  }
  private initLazy(el: HTMLImageElement, aspectRatio: number, GlobalOptions: LazyOptions) {
    el.setAttribute(DATA_SRC, el.src);
    el.src = '';
    el.classList.add(lazyCSS);
    this.observer.observe(el);
    if (typeof aspectRatio === 'number') {
      // nothing
    } else {
      aspectRatio = GlobalOptions.aspectRatio;
    }
    el.style.minHeight = `${window.screen.width * aspectRatio}px`;
    el.addEventListener('load', (e) => {
      const target = e.target;
      if (target instanceof HTMLImageElement) {
        target.classList.remove(lazyCSS);
        target.classList.add(animationCSS);
        target.style.minHeight = `auto`;
        this.observer.unobserve(target);
      }
    });
  }
}
export default new Lazy();
