import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Vuesax from 'vuesax';

import VueGtag from 'vue-gtag';
Vue.use(
  VueGtag,
  {
    config: { id: 'G-21X6D3JBNJ' }
  },
  router
);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import VueCountdownTimer from 'vuejs-countdown-timer';
Vue.use(VueCountdownTimer);

import Chat from 'vue-beautiful-chat';
Vue.use(Chat);

import VueMoment from 'vue-moment';
Vue.use(VueMoment);

import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

import 'boxicons';

Vue.use(Vuesax, {
  colors: {
    primary: 'rgb( 46, 91, 246)'
  }
});

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    linkBack() {
      this.$router.back();
    },
    getInvite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      if (localStorage.getItem('invite'))
        return JSON.parse(
          decodeURIComponent(escape(atob(localStorage.getItem('invite'))))
        );

      return [];
    },
    updatePageView(page_check) {
      if (!this.getInvite()[page_check]) {
        this.$store.dispatch('updatePageStatus', {
          invite: this.getInvite(),
          page_check: page_check
        });
      }
    }
  }
});

import 'vuesax/dist/vuesax.css';
import '@/assets/style.scss';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
