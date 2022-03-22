<template>
  <div>
    <vs-row justify="center">
      <h2>Tunes</h2>
    </vs-row>
    <vs-row justify="center">
      <p class="section-description">
        Watter liedjie is jou jam? Kies jou gunstellinge op die lys of voeg nog
        by!
      </p>

      <vs-row justify="center">
        <vs-col w="12" sm="12" align="center">
          <vs-row class="songResults m-t-15" justify="center">
            <vs-row justify="center">
              <span style="width: 100%">
                <vs-button
                  class="m-b-15"
                  :active="false"
                  border
                  @click="addSongPopup = true"
                >
                  Sit 'n song by 🤘</vs-button
                ></span
              >
              <span style="width: 100%">
                <vs-pagination
                  class="vs-xl-12 vs-lg-12 vs-md-12 m-b-10"
                  v-model="songPage"
                  :length="songPageLength"
                />
              </span>
              <vs-input
                class="vs-xl-12 vs-lg-12 vs-md-12 m-t-20"
                v-model="existingSongSearch"
                placeholder="Ons liedjie lys"
              >
                <template #icon>
                  <i class="bx bx-search"></i>
                </template>
              </vs-input>
            </vs-row>
            <div v-if="songSuggestionsPaginated.length === 0" class="m-t-20">
              Geen Resultate
            </div>
            <vs-col
              v-for="song in songSuggestionsPaginated"
              :key="song.trackId"
              class="vs-xl-4 vs-lg-6 vs-md-12"
              align="center"
            >
              <vs-card class="song-card" type="3" style="margin:15px">
                <template #img>
                  <img :src="getLargeArtwork(song.artworkUrl100)" />
                </template>
                <template #title>
                  <h3 @click="addSongSuggestion(song)">
                    {{ song.trackName }}
                  </h3>
                </template>
                <template #text>
                  <p class="m-b-10" @click="addSongSuggestion(song)">
                    {{ song.artistName }}
                  </p>

                  <vs-button
                    border
                    danger
                    @click="voteSong(song.id)"
                    :active="votedFor.includes(song.id)"
                  >
                    <i class="bx bxs-heart m-r-5"></i
                    >{{ calculateVotes(song.trackId) }}</vs-button
                  >
                </template>
                <template #interactions>
                  <vs-button
                    class="m-b-10"
                    circle
                    floating
                    icon
                    @click="playTrack(song, $event)"
                  >
                    <i class="bx bx-play"></i
                  ></vs-button>
                </template>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-dialog v-model="addSongPopup">
            <template #header>
              <h4 class="not-margin">Sit hom op die lys! 🎵</h4>
            </template>

            <vs-input
              :loading="Boolean(addSongSearchLoading)"
              class="m-b-25"
              v-model="addSongSearch"
              placeholder="Jou liedjie naam"
              @change="searchItunes(addSongSearch)"
            >
              <template #icon>
                <i class="bx bx-search"></i>
              </template>
            </vs-input>
            <vs-button :active="false" class="m-t-15" style="margin: 0 auto">
              Search 🤘
            </vs-button>
            <p v-if="songSearchResults">
              Klik op die liedjie se naam om hom by te voeg.
            </p>

            <vs-row justify="center">
              <vs-col
                v-for="song in songSearchResults"
                :key="song.trackId"
                class="vs-xl-6 vs-lg-6 vs-md-12"
                align="center"
              >
                <vs-card class="song-card small" type="3" style="margin:15px">
                  <template #img>
                    <img :src="getLargeArtwork(song.artworkUrl100)" />
                  </template>
                  <template #title>
                    <h3 @click="addSongSuggestion(song)">
                      {{ song.trackName }}
                    </h3>
                  </template>
                  <template #text>
                    <p @click="addSongSuggestion(song)">
                      {{ song.artistName }}
                    </p></template
                  >
                  <template #interactions>
                    <vs-row justify="center">
                      <vs-col w="12">
                        <vs-button
                          circle
                          floating
                          icon
                          @click="playTrack(song, $event)"
                        >
                          <i class="bx bx-play"></i
                        ></vs-button> </vs-col
                    ></vs-row>
                  </template>
                </vs-card>
              </vs-col>
            </vs-row>

            <template #footer>
              <div class="footer-dialog"></div>
            </template>
          </vs-dialog>
        </vs-col>
        <vs-col v-for="song in 0" :key="song.id" w="6" sm="12" align="center">
          <vs-card class="song-card" type="3" style="margin:15px">
            <template #img>
              <img :src="getLargeArtwork(song.artworkUrl100)" />
            </template>
            <template #title>
              <h3>{{ song.trackName }}</h3>
            </template>
            <template #text>{{ song.artistName }} </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </vs-row>
  </div>
</template>
<script>
import axios from 'axios';
//import jsonp from 'jsonp';
export default {
  props: [
    'songSuggestions',
    'songSuggestionVotes',
    'inviteSongSuggestionVotes'
  ],
  data() {
    return {
      songPage: 1,
      votedFor: [],
      addSongPopup: false,
      addSongSearchLoading: false,
      addSongSearch: '',
      songSearchResults: null,
      audioPlayer: null,
      existingSongSearch: ''
    };
  },
  computed: {
    invite() {
      if (this.$store.state.invite) return this.$store.state.invite;
      return this.getInvite();
    },
    songSuggestionsFiltered() {
      if (this.existingSongSearch)
        return this.songSuggestions.filter(
          i =>
            i.trackName
              .toLowerCase()
              .includes(this.existingSongSearch.toLowerCase()) ||
            i.artistName
              .toLowerCase()
              .includes(this.existingSongSearch.toLowerCase())
        );
      return this.songSuggestions;
    },
    songPageLength() {
      if (this.songSuggestionsFiltered)
        return Math.ceil(this.songSuggestionsFiltered.length / 9);
      return 0;
    },
    songSuggestionsPaginated() {
      if (this.songSuggestionsFiltered)
        return this.songSuggestionsFiltered.slice(
          (this.songPage - 1) * 9,
          this.songPage * 9
        );
      return [];
    }
  },
  mounted() {
    if (this.inviteSongSuggestionVotes) this.loadVotedFor();
  },
  methods: {
    loadVotedFor() {
      if (this.songSuggestions)
        this.songSuggestions.forEach(song => {
          if (
            this.inviteSongSuggestionVotes.filter(
              i => i.song_suggestion == song.id
            ).length > 0
          )
            this.votedFor.push(song.id);
        });
    },
    voteSong(Id) {
      this.votedFor.push(Id);
      this.$store
        .dispatch('addSongSuggestionVote', {
          trackStrapiId: Id,
          inviteId: this.getInvite().id
        })
        .then(res => {
          if (res.data.message === 'Duplicate') {
            this.votedFor = this.votedFor.filter(v => v != Id);
            this.$store.dispatch('removeSongSuggestionVote', {
              id: res.data.object.id
            });
          } else if (res.status === 200) {
            this.$vs.notification({
              color: 'success',
              title: 'Lekker! 🤘',
              text: 'Ons like jou smaak'
            });
          }
        });
    },
    calculateVotes(trackId) {
      if (!this.songSuggestionVotes) return 0;
      var voteCount = this.songSuggestionVotes.filter(
        i => i.song_suggestion.trackId === trackId
      ).length;
      if (voteCount === 1) return voteCount + ' Vote';
      return voteCount + ' Votes';
    },
    stopAudio() {
      if (this.audioPlayer) this.audioPlayer.pause();
    },
    playTrack(song) {
      if (song.previewUrl) {
        if (!this.audioPlayer) this.audioPlayer = new Audio(song.previewUrl);
        else this.audioPlayer.pause();
        this.audioPlayer = new Audio(song.previewUrl);
        this.audioPlayer.play();
      }
    },
    getLargeArtwork(artwork) {
      return artwork.replace('100x100', '200x200');
    },
    addSongSuggestion(song) {
      this.$store
        .dispatch('addSongSuggestion', { songObject: song })
        .then(res => {
          if (res.status === 200) {
            var newSuggestions = [];
            var currentSongSuggestions = this.invite.song_suggestions;
            for (
              let index = 0;
              index < currentSongSuggestions.length;
              index++
            ) {
              newSuggestions.push(currentSongSuggestions[index].id);
            }
            newSuggestions.push(res.data.id);
            this.$store.dispatch('addInviteSongSuggestion', {
              invite: this.getInvite(),
              song_suggestions: newSuggestions
            });
            this.$vs.notification({
              color: 'success',
              title: 'Greatstuff 🎧',
              text: 'Jou tune is gelaai!'
            });
          }
        });
      this.addSongPopup = false;
    },
    searchItunes(query) {
      this.addSongSearchLoading = true;
      if (query) {
        axios
          .get(
            process.env.VUE_APP_API_URL +
              '/song-suggestions/search?qry=' +
              encodeURIComponent(query)
          )
          .then(res => {
            this.addSongSearchLoading = false;
            this.songSearchResults = res.data.results;
            console.log('iTunes Data', res.data);
          })
          .catch(error => {
            console.log(error);
          });

        /*jsonp(
          'https://itunes.apple.com/search?media=music&limit=6&term=' +
            encodeURIComponent(query) +
            '&callback=',
          null,
          (error, data) => {
            if (error) {
              console.log('ERROR: iTunes API', data);
            } else {
              this.addSongSearchLoading = false;
              this.songSearchResults = data.results;
              console.log('iTunes Data', data);
            }
          }
        ); */
      }
    }
  },
  watch: {
    inviteSongSuggestionVotes: function() {
      if (this.inviteSongSuggestionVotes.length > 0) this.loadVotedFor();
    },
    addSongPopup: function(val) {
      if (!val) this.stopAudio();
    }
  },
  name: 'rsvpTunes'
};
</script>
<style>
.song-card.vs-card-content.type-3 .vs-card {
  max-width: 600px !important;
}

.song-card .vs-card__img {
  max-width: 130px;
  max-height: 130px;
}

.small.vs-card-content.type-3 .vs-card__img img {
  min-width: unset !important;
}

.small.song-card .vs-card__title h3 {
  font-size: 14px !important;
}

.small.song-card .vs-card__img {
  max-width: 100px;
  max-height: 100px;
}

.song-card .vs-card__text {
  margin: 0 auto;
}

.songResults {
  background: white;
  padding: 30px;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .songResults {
    padding-left: 3px;
    padding-right: 3px;
  }
}
</style>
