import { VueConstructor, PluginObject, VNodeDirective } from 'vue';
import './lazy.css';
import { Log } from '@/utils';
interface LazyBoxOptions {
  aspectRatio: number;
}
class LazyBox implements PluginObject<LazyBoxOptions> {
  private options: IntersectionObserverInit = {
    threshold: [1],
  };
  private readonly observer = new IntersectionObserver(
    (entries, observer) => this.IntersectionObserverCallback(entries, observer),
    this.options,
  );
  private readonly DATA_SRC = 'data-src';
  private readonly lazyCSS = 'lazy';
  private readonly animationCSS = 'animation';

  public install(Vue: VueConstructor, GlobalOptions: LazyBoxOptions = {aspectRatio: 1.777}) {
    Vue.directive('lazyBox', {
      bind: (el: HTMLElement, binding: VNodeDirective) => {
        Log.log('lazyBox bind');
        this.bind(el, binding, GlobalOptions);
      },
      inserted: (el: HTMLElement, binding: VNodeDirective) => {
        Log.log('lazyBox inserted');
        this.initLazy(el, binding.value, GlobalOptions);
      },
      update: (el: HTMLElement, binding: VNodeDirective) => {
        Log.log('lazyBox update');
        this.initLazy(el, binding.value, GlobalOptions);
      },
      unbind: (el: HTMLElement) => {
        this.unbind(el);
        Log.log('lazyBox unbind');
      },
    });
  }
  private bind(el: HTMLElement, binding: VNodeDirective, GlobalOptions: LazyBoxOptions) {
    this.initLazy(el, binding.value, GlobalOptions);
  }
  private initLazy(el: HTMLElement, aspectRatio: number, GlobalOptions: LazyBoxOptions) {
    [...el.querySelectorAll('img')].map((img) => {
      if (img.src && img.getAttribute(this.DATA_SRC) === null) {
        img.setAttribute(this.DATA_SRC, img.src);
        img.src = '';
        img.classList.add(this.lazyCSS);
        this.observer.observe(img);
        if (typeof aspectRatio !== 'number') {
          aspectRatio = GlobalOptions.aspectRatio;
        }
        img.style.minHeight = `${window.screen.width / aspectRatio}px`;
        img.addEventListener('load', (e) => this.loadEvent(e));
      }
    });
  }
  private IntersectionObserverCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((e) => {
      if (e.intersectionRatio >= 0.5) {
        const target = e.target;
        if (target instanceof HTMLImageElement) {
          target.src = target.getAttribute(this.DATA_SRC)!;
          observer.unobserve(target);
        }
      }
    });
  }
  private loadEvent(e: Event) {
    const target = e.target;
    if (target instanceof HTMLImageElement) {
      target.classList.remove(this.lazyCSS);
      target.classList.add(this.animationCSS);
      target.style.minHeight = 'auto';
      this.observer.unobserve(target);
    }
  }
  private unbind(el: HTMLElement) {
    [...el.querySelectorAll('img')].map((img) => {
      this.observer.unobserve(img);
    });
  }
}
export default new LazyBox();
