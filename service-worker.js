if(!self.define){let e,i={};const d=(d,s)=>(d=new URL(d+".js",s).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(s,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const r=e=>d(e,c),l={module:{uri:c},exports:t,require:r};i[c]=Promise.all(s.map((e=>l[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3598fb27"],(function(e){"use strict";e.setCacheNameDetails({prefix:"tybalt-website"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"built-with-tybalt/index.html",revision:"bb27e99ef733622359b86c1473afccc2"},{url:"css/base.css",revision:"26ee631d0513b1db455e779f1ca05c39"},{url:"css/index.css",revision:"51b36193246f99ba57c08743952d87d7"},{url:"css/page.css",revision:"3208e65ad1d8a3e288ddd297d068e9e4"},{url:"guides/building/index.html",revision:"db146339cb6905298555b4505207e12c"},{url:"guides/contexts/index.html",revision:"f5101f930860192afb92e677bfb34ec4"},{url:"guides/custom-validator/index.html",revision:"a013522180b69b374e44226a6b11363d"},{url:"guides/data-fetching/index.html",revision:"ea93b21ac9ac605c6ab099c0c34c98b9"},{url:"guides/events/index.html",revision:"7c35074c77048aa81de0987705c3c416"},{url:"guides/linting/index.html",revision:"daddcf0bc89d2faec146363e7beea92e"},{url:"guides/new-website/index.html",revision:"ab166527207ae0c5471661a8027ce90d"},{url:"guides/props/index.html",revision:"4dbe2a4357f7b9e601abe85cb06a7bf0"},{url:"guides/slots/index.html",revision:"ca28324cd15fd2d55229e6a3977e63a0"},{url:"guides/styling-your-component/index.html",revision:"cfcbe565a0037469006ad117e0ced970"},{url:"guides/writing-tests/index.html",revision:"aa7eae10b4db5934d504fce5c953b77c"},{url:"img/favico.png",revision:"c470398c2a6b403059bff6a83bf01bd6"},{url:"index.html",revision:"5e6ee2fcdef74173ed647dc9a05fd9b3"},{url:"manifest.json",revision:"38c770c4262265dd11c5260add7da74a"},{url:"pages/cli/index.html",revision:"d868e93a8eb2806de859768ddd71a8c7"},{url:"pages/context/index.html",revision:"1b0b83b25265c4269f79e20892ba63a3"},{url:"pages/core/index.html",revision:"45bbd0b3644984c6568f311b2014652d"},{url:"pages/eleventy-plugin/index.html",revision:"6ea1ff00d333d9c222993d3bbcf4a6b7"},{url:"pages/esbuild-plugin/index.html",revision:"8c6b31f6c349c45a0239fad49ac69b2f"},{url:"pages/eslint-plugin/index.html",revision:"f5ef3f57b65985d5a38142684723c2d1"},{url:"pages/parser/index.html",revision:"711eccab658815c8d6bdfff95c98f505"},{url:"pages/reactive/index.html",revision:"b49b3ed33bf82e9d2939fc187e904dee"},{url:"pages/test-utils/index.html",revision:"2937fdc06d8771d6ad9c823c43ca41f2"},{url:"pages/validator/index.html",revision:"250dbc2682af2008ed2d4908b3f7b405"},{url:"tybalt-out.js",revision:"00c2f2930331acf3fcabe6be9083194e"}],{}),e.registerRoute(/\/$/,new e.NetworkFirst,"GET"),e.registerRoute(/\.html$/,new e.NetworkFirst,"GET"),e.registerRoute(/^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,new e.StaleWhileRevalidate,"GET")}));
//# sourceMappingURL=service-worker.js.map
