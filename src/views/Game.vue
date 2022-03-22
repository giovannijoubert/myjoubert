<template>
  <div class="mj-game-container">
    <div v-if="!initPopup && nickname == ''" class="start-game-overlay">
      <vs-button
        floating
        size="xl"
        v-if="!initPopup && nickname == ''"
        class="start-game"
        @click="initPopup = true"
        >Start Game</vs-button
      >
    </div>
    <div class="leaderboard">
      <h3>Top Scores:</h3>
      <div class="marquee" v-if="scores">
        <p>{{ scoreString }}</p>
        <p>{{ scoreString }}</p>
      </div>
    </div>

    <iframe
      v-if="nickname != '' && !initPopup"
      class="game-frame"
      :src="
        'https://pulsedroid.com/games/2048?nickname=' +
          nickname +
          '&groupname=' +
          group_name +
          '&theme=' +
          game_theme
      "
      frameborder="0"
      scrolling="no"
    ></iframe>

    <vs-dialog class="start-popup" width="300px" not-center v-model="initPopup">
      <template #header>
        <h4 class="not-margin">
          Wie speel?
        </h4>
      </template>

      <div class="con-content">
        <vs-input
          v-model="nickname"
          placeholder="Super-cool nickname"
        ></vs-input>
      </div>

      <template #footer>
        <div class="con-footer m-t-15">
          <vs-button @click="startGame" transparent>
            Speel
          </vs-button>
          <vs-button
            class="extended-leaderboard"
            floating
            success
            @click="goTo('/game/extended-leaderboard/select')"
          >
            Extended Leaderboard
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      scores: null,
      nickname: '',
      initPopup: true,
      latestScore: null
    };
  },
  computed: {
    scoreString() {
      var output = '';
      for (let index = 0; index < this.scores.leaderboard.length; index++) {
        const score = this.scores.leaderboard[index];
        output +=
          index +
          1 +
          '. ' +
          score.name +
          ' (' +
          score.group_name +
          ') - ' +
          score.score +
          '\t\t';
      }
      return output;
    },
    game_theme() {
      if (document.querySelector('body').classList.contains('dark-mode'))
        return 'dark';
      return 'light';
    },
    group_name() {
      return this.getInvite().group_name;
    }
  },
  mounted() {
    this.getLatestScores();

    setInterval(() => {
      this.getLatestScores();
    }, 5000);

    this.updatePageView('game_viewed');
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    },
    scoreNotification(latestScore) {
      if (document.getElementsByClassName('vs-notification').length <= 0)
        this.$vs.notification({
          progress: 'auto',
          color: 'primary',
          title: 'New Score',
          duration: 5000,
          text:
            latestScore.scorePos +
            '. ' +
            latestScore.name +
            ' (' +
            latestScore.group_name +
            ') - ' +
            latestScore.score
        });
    },
    getLatestScores() {
      axios
        .get('https://pulsedroid.com/games/2048/leaderboard.php')
        .then(response => {
          this.scores = response.data;

          //   console.log(response.data);
          if (this.latestScore != response.data.latestScore.score) {
            if (this.latestScore != null) {
              this.scoreNotification(response.data.latestScore);
            }
          }
          this.latestScore = response.data.latestScore.score;
        });
    },
    startGame() {
      this.initPopup = false;
      const loading = this.$vs.loading();
      setTimeout(() => {
        loading.close();
      }, 1000);
    }
  }
};
</script>
<style>
.start-game-overlay {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.start-game {
  height: 50px;
  align-self: center;
  justify-self: center;
}

.not-margin {
  margin: 5px !important;
}

.mj-game-container .leaderboard {
  border-radius: 20px;
  width: 100%;
  height: 150px;
  color: #ffffff;
  padding: 5px;
  background: #8f7a66;
  overflow: hidden;
  box-shadow: 0px 8px 20px -6px #8f7a66;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-bottom: auto;
  margin-left: auto;
  left: 0;
  right: 0;
  margin-right: auto;
  margin-top: 10px;
  height: 80px;
  max-width: 80%;
}

.game-frame {
  margin-right: 16%;
  width: 80%;
  height: 100%;
  z-index: 500;
}

.mj-game-container {
  overflow: hidden;
  background: #fff;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
}

.leaderboard h3 {
  margin: 2px;
}

.leaderboard .scores {
  padding-top: 10px;
  flex-direction: column;
}

.game-frame {
  margin-right: 0px;
  margin-top: 90px;
  height: 90%;
}
.marquee {
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  animation: marquee 25s linear infinite;
}

.marquee p {
  margin-top: 5px;
  font-size: 25px;
  white-space: pre;
  display: inline-block;
}

@media (max-width: 600px) {
  .game-frame {
    width: 85%;
  }
}

@keyframes marquee {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

.con-footer {
  display: flex;
  justify-content: space-between;
}

.extended-leaderboard .badge {
}
</style>
