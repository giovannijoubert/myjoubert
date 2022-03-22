import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const config = { headers: { 'Content-Type': 'application/json' } };

export default new Vuex.Store({
  state: {
    firstLoad: true,
    invite: null,
    songSuggestions: null,
    songSuggestionVotes: null,
    price: null,
    galleries: null,
    memojis: null
  },
  mutations: {
    setInvite(state, invite) {
      state.invite = invite;
    },
    setMemojis(state, memojis) {
      state.memojis = memojis;
    },
    setSongSuggestions(state, songSuggestions) {
      state.songSuggestions = songSuggestions;
    },
    setSongSuggestionVotes(state, songSuggestionVotes) {
      state.songSuggestionVotes = songSuggestionVotes;
    },
    setPrice(state, price) {
      state.price = price;
    },
    firstLoadComplete(state) {
      state.firstLoad = false;
    },
    setGalleries(state, galleries) {
      galleries.forEach(gallery => {
        gallery.photos.sort(function(a, b) {
          return a.order - b.order;
        });
      });

      state.galleries = galleries.sort(function(a, b) {
        return a.order - b.order;
      });
    }
  },
  actions: {
    loadGalleries({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + '/photo-galleries/')
          .then(response => {
            commit('setGalleries', response.data);
            resolve(response);
            console.log('loadGalleries: ', response.data);
          })
          .catch(({ error }) => {
            reject(error);
            console.log('ERROR: loadGalleries', error);
          });
      });
    },
    getInvite({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + '/invites/' + payload.inviteID)
          .then(response => {
            commit('setInvite', response.data);
            resolve(response);
            console.log('getInvite: ', response.data);
          })
          .catch(({ error }) => {
            reject(error);
            console.log('ERROR: getInvite', error);
          });
      });
    },
    getSongSuggestions({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            process.env.VUE_APP_API_URL +
              '/song-suggestions?_sort=trackName:ASC'
          )
          .then(response => {
            commit('setSongSuggestions', response.data);
            resolve(response);
            console.log('getSongSuggestions: ', response.data);
          })
          .catch(({ error }) => {
            reject(error);
            console.log('ERROR: getSongSuggestions', error);
          });
      });
    },
    getMemojis({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_URL + '/people/memoji-list')
          .then(response => {
            commit('setMemojis', response.data);
            resolve(response);
            console.log('getMemojis: ', response.data);
          })
          .catch(({ error }) => {
            reject(error);
            console.log('ERROR: getMemojis', error);
          });
      });
    },
    getSongSuggestionVotes({ commit }) {
      return new Promise(resolve => {
        axios
          .get(process.env.VUE_APP_API_URL + '/song-suggestion-votes')
          .then(response => {
            commit('setSongSuggestionVotes', response.data);
            resolve(response);
            console.log('getSongSuggestionVotes: ', response.data);
          })
          .catch(({ response }) => {
            resolve(response);
            console.log('ERROR: getSongSuggestionVotes', response.data);
          });
      });
    },
    getPrice({ commit }) {
      return new Promise(resolve => {
        axios
          .get(process.env.VUE_APP_API_URL + '/price')
          .then(response => {
            commit('setPrice', response.data);
            resolve(response);
            console.log('getPrice: ', response.data);
          })
          .catch(({ response }) => {
            resolve(response);
            console.log('ERROR: getPrice', response.data);
          });
      });
    },
    updatePerson({ state }, payload) {
      return new Promise((resolve, reject) => {
        let updatedPerson = state.invite.people.filter(i =>
          i.id.includes(payload.personID)
        )[0];
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL + '/people/' + payload.personID,
              updatedPerson,
              config
            )
            .then(response => {
              resolve(response);
            })
            .catch(({ error }) => {
              reject(error);
            });
        }, 100);
      });
    },
    addSongSuggestion({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .post(
              process.env.VUE_APP_API_URL + '/song-suggestions/',
              payload.songObject,
              config
            )
            .then(response => {
              dispatch('getSongSuggestions');
              resolve(response);
            })
            .catch(({ response }) => {
              resolve(response);
            });
        }, 100);
      });
    },
    addSongSuggestionVote({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .post(
              process.env.VUE_APP_API_URL + '/song-suggestion-votes/',
              {
                song_suggestion: payload.trackStrapiId,
                invite: payload.inviteId
              },
              config
            )
            .then(response => {
              dispatch('getSongSuggestionVotes');
              console.log(response);
              resolve(response);
            })
            .catch(({ response }) => {
              console.log(response);
              resolve(response);
            });
        }, 100);
      });
    },
    removeSongSuggestionVote({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .delete(
              process.env.VUE_APP_API_URL +
                '/song-suggestion-votes/' +
                payload.id,

              config
            )
            .then(response => {
              dispatch('getSongSuggestionVotes');
              console.log(response);
              resolve(response);
            })
            .catch(({ response }) => {
              console.log(response);
              resolve(response);
            });
        }, 100);
      });
    },
    inviteGuest({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .post(process.env.VUE_APP_API_URL + '/people', payload)
            .then(response => {
              console.log('inviteGuest', response);
              dispatch('getInvite', { inviteID: payload.invite.id });
              resolve(response);
            })
            .catch(({ response }) => {
              console.log('inviteGuest', response);
              resolve(response);
            });
        }, 100);
      });
    },
    updateReminders({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL + '/invites/' + payload.invite.id,
              { reminder: payload.reminder }
            )
            .then(response => {
              console.log('updateReminders', response);
              dispatch('getInvite', { inviteID: payload.invite.id });
              resolve(response);
            })
            .catch(({ response }) => {
              console.log('updateReminders', response);
              resolve(response);
            });
        }, 100);
      });
    },
    updatePageStatus({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL + '/invites/' + payload.invite.id,
              { [payload.page_check]: true }
            )
            .then(response => {
              console.log('updatePageStatus', response);
              dispatch('getInvite', { inviteID: payload.invite.id });
              resolve(response);
            })
            .catch(({ response }) => {
              console.log('updatePageStatus', response);
              resolve(response);
            });
        }, 100);
      });
    },
    updateInviteStatus({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL + '/invites/' + payload.invite.id,
              { status: payload.invite_status }
            )
            .then(response => {
              console.log('updateInviteStatus', response);
              dispatch('getInvite', { inviteID: payload.invite.id });
              resolve(response);
            })
            .catch(({ response }) => {
              console.log('updateInviteStatus', response);
              resolve(response);
            });
        }, 100);
      });
    },
    addInviteSongSuggestion({ state, dispatch }, payload) {
      return new Promise(resolve => {
        //timeout ensures state changes before object is sent
        setTimeout(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL + '/invites/' + payload.invite.id,
              { song_suggestions: payload.song_suggestions }
            )
            .then(response => {
              console.log('addInviteSongSuggestion', response);
              dispatch('getInvite', { inviteID: payload.invite.id });
              resolve(response);
            })
            .catch(({ response }) => {
              console.log('addInviteSongSuggestion', response);
              resolve(response);
            });
        }, 100);
      });
    }
  },
  modules: {}
});
