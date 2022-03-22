import Vue from 'vue';
import VueRouter from 'vue-router';
import RSVP from '../views/rsvpPage.vue';
import AppSwitcher from '../views/AppSwitcher.vue';
import Venue from '../views/Venue.vue';
import ChatApp from '../views/ChatApp.vue';
import PhotosApp from '../views/PhotosApp.vue';
import PhotosAppSingle from '../views/PhotosAppSingle.vue';
import Lockscreen from '../views/Lockscreen.vue';
import WalletApp from '../views/WalletApp.vue';
import MusicApp from '../views/MusicApp.vue';
import ClockApp from '../views/ClockApp.vue';
import MapsApp from '../views/MapsApp.vue';
import MailApp from '../views/MailApp.vue';
import DresscodeApp from '../views/DresscodeApp.vue';
import RemindersApp from '../views/RemindersApp.vue';
import Game from '../views/Game.vue';
import ShoppingApp from '../views/ShoppingApp.vue';
import MemojiQuiz from '../views/MemojiQuiz.vue';
import ExtendedLeaderboard from '../views/ExtendedLeaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/apps',
    name: 'App Switcher',
    component: AppSwitcher
  },
  {
    path: '/friends/quiz/:friends_group',
    name: 'MemojiQuiz',
    component: MemojiQuiz
  },
  {
    path: '/vrae',
    name: 'Vrae',
    component: MailApp
  },
  {
    path: '/aanwysings',
    name: 'Maps',
    component: MapsApp
  },

  {
    path: '*',
    name: 'Lockscreen Not Found',
    component: Lockscreen
  },
  {
    path: '/locked',
    name: 'Lockscreen Locked',
    component: Lockscreen
  },
  {
    path: '/jysuitgenooi/:id',
    name: 'Lockscreen',
    component: Lockscreen
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue
  },
  {
    path: '/kitstik',
    name: 'Kitstik',
    component: ChatApp
  },
  {
    path: '/countdown',
    name: 'Countdown',
    component: ClockApp
  },
  {
    path: '/fotos',
    name: "Foto's",
    component: PhotosApp
  },
  {
    path: '/fotos/:uid',
    name: "Foto's Single",
    component: PhotosAppSingle
  },
  {
    path: '/onthou',
    name: 'Reminders',
    component: RemindersApp
  },
  {
    path: '/betaling',
    name: 'Betaling',
    component: WalletApp
  },
  {
    path: '/Tunes',
    name: 'Tunes',
    component: MusicApp
  },
  {
    path: '/rsvp',
    name: 'RSVP',
    component: RSVP
  },
  {
    path: '/dresscode',
    name: 'Dresscode',
    component: DresscodeApp
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/game/extended-leaderboard/:scoreview',
    name: 'Leaderboard',
    component: ExtendedLeaderboard
  },
  {
    path: '/geskene',
    name: 'Geskenke',
    component: ShoppingApp
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.afterEach(() => {
  //alert('run');
  setTimeout(() => {
    document.getElementsByClassName('content-container')[0].scrollTop = 0;
  }, 300);

  // ...
});

export default router;
