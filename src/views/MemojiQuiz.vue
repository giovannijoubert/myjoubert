<template>
  <div id="friends-app">
    <transition name="scale" mode="out-in" appear key="start">
      <div
        v-if="friendsGroup == 'menu' || friendsGroup == 'start'"
        id="friends-bg"
      >
        <div class="memoji-float">
          <transition-group name="flip-list">
            <memoji
              v-for="memoji in bgMemojis"
              :key="'bg' + memoji.id"
              :personId="memoji.id"
            />
          </transition-group>
        </div>
      </div>
    </transition>
    <div id="memoji-quiz">
      <transition name="scale" mode="out-in" appear key="start">
        <div v-if="friendsGroup == 'start'" key="game-start" class="start">
          <vs-button
            @click="startGame()"
            class="option-button"
            size="xl"
            floating
          >
            Speel Nou 🎮
          </vs-button>
        </div>
        <div v-else-if="friendsGroup == 'menu'" key="game-menu" class="menu">
          <vs-button
            @click="selectGroup(option.slug)"
            class="option-button"
            size="xl"
            floating
            v-for="option in groupOptions"
            :key="option.slug"
            >{{ option.name }}</vs-button
          >
        </div>
        <div class="quiz-container" v-else key="game-quiz-container">
          <transition name="scale" mode="out-in" appear key="current_ans">
            <memoji
              class="current-answer-memoji"
              v-if="currentAnswer"
              :key="'selection' + currentAnswer.id"
              :personId="currentAnswer.id"
            />
          </transition>
          <div class="quiz-answer-options" v-if="currentOptions">
            <vs-button
              @click="selectQuizOption(quizOption, index)"
              class="option-button"
              :ref="'option-button-' + quizOption.id"
              size="xl"
              floating
              :success="quizResult[index].success"
              :danger="quizResult[index].error"
              v-for="(quizOption, index) in currentOptions"
              :key="quizOption.id"
              >{{ quizOption.name }}</vs-button
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import memoji from '@/components/memoji';
import Vue from 'vue';

import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    Vue.set(array, i, array[j]);
    Vue.set(array, j, temp);
  }
}

export default {
  data() {
    return {
      quizResult: [
        { success: false, error: false },
        { success: false, error: false },
        { success: false, error: false },
        { success: false, error: false },
        { success: false, error: false },
        { success: false, error: false }
      ],
      ansMemojis: null,
      bgMemojis: [],
      groupOptions: [
        { name: '🎊 Almal', slug: 'almal' },
        { name: '⛵ Ons Ark', slug: 'ons_ark' },
        { name: '🍷 Wynklub', slug: 'wynklub' },
        { name: '🎪 Die Hele Sirkus', slug: 'hele_sirkus' },
        { name: '🎸 Kerk Bandies (Church Fam)', slug: 'kerk_bandies' },
        { name: '☕ Lekker Koffie (Koffie Sel)', slug: 'koffie_sel' }
      ],
      currentAnswer: null,
      currentOptions: []
    };
  },
  components: {
    memoji
  },
  computed: {
    friendsGroup() {
      if (this.$route.params.friends_group)
        return this.$route.params.friends_group;
      return '';
    },
    memojis() {
      if (this.$store.state.memojis) return this.$store.state.memojis;
      return [];
    }
  },
  mounted() {
    this.updatePageView('friends_viewed');
    this.$store.dispatch('getMemojis').catch(() => {
      this.$router.push('/lockscreen');
      this.$vs.notification({
        color: 'danger',
        title: 'Aggenee',
        duration: 10000,
        text:
          'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
      });
    });

    this.bgMemojis = this.memojis;

    setInterval(() => {
      if (this.friendsGroup == 'menu' || this.friendsGroup == 'start')
        this.bgMemojis = shuffle(this.bgMemojis);
    }, 2000);

    // page refreshed without proper order
    if (
      this.friendsGroup != 'menu' &&
      this.friendsGroup != 'start' &&
      !this.currentAnswer
    )
      this.$router.push('/friends/quiz/start');
  },

  methods: {
    selectQuizOption(quizOption, index) {
      if (quizOption.id == this.currentAnswer.id) {
        this.$confetti.start();
        //right
        this.quizResult[index].success = true;
        setTimeout(() => {
          this.$confetti.stop();
          this.quizResult[index].success = false;
          this.changeCurrentAnswer(this.friendsGroup);
        }, 1000);
      } else {
        //wrong
        this.quizResult[index].error = true;
        setTimeout(() => {
          this.quizResult[index].error = false;
        }, 1000);
      }
    },
    shuffleAnswers(array) {
      var currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ];
      }

      return array;
    },
    startGame() {
      this.$router.push('/friends/quiz/menu');
    },
    selectGroup(selectedGroup) {
      this.$router.push('/friends/quiz/' + selectedGroup);
      this.changeCurrentAnswer(this.friendsGroup);
    },
    changeCurrentAnswer(selectedGroup) {
      if (selectedGroup == 'almal')
        this.currentAnswer = this.memojis[
          Math.floor(Math.random() * this.memojis.length)
        ];
      else {
        var filteredMemojis = this.memojis.filter(i =>
          i.friends_group.includes(selectedGroup)
        );
        this.currentAnswer =
          filteredMemojis[Math.floor(Math.random() * filteredMemojis.length)];
      }

      this.changeCurrentOptions(selectedGroup);
    },
    changeCurrentOptions(selectedGroup) {
      var randomOptions = [];
      var filteredMemojis = null;
      if (selectedGroup != 'almal') {
        filteredMemojis = this.ansMemojis.filter(i =>
          i.friends_group.includes(selectedGroup)
        );
      } else filteredMemojis = this.ansMemojis;

      for (var i = 0; i < 3; i++) {
        var selection = null;
        var placed = false;
        while (!placed) {
          selection =
            filteredMemojis[Math.floor(Math.random() * filteredMemojis.length)];
          if (
            !randomOptions.includes(selection) &&
            selection.id != this.currentAnswer.id
          ) {
            placed = true;
            randomOptions.push(selection);
          }
        }
      }
      if (!randomOptions.includes(this.currentAnswer))
        randomOptions.push(this.currentAnswer);

      this.shuffleAnswers(randomOptions);
      this.currentOptions = randomOptions;
      console.log(selectedGroup, this.currentOptions);
    }
  },

  watch: {
    memojis: function() {
      this.bgMemojis = this.memojis;
      if (!this.ansMemojis) {
        this.ansMemojis = JSON.parse(JSON.stringify(this.memojis));
      }
    }
  }
};
</script>
<style lang="scss">
.current-answer-memoji .memoji-wrapper {
  width: 200px;
  height: 200px;
}
#friends-app {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0px;
}
#memoji-quiz {
  max-width: 90%;
  justify-self: center;
  align-self: center;
}

#memoji-quiz .option-button {
  font-weight: 600;
  width: 340px;
  margin: 15px auto;
  max-width: 90%;
}

#friends-bg {
  opacity: 0.8;
  top: 0px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
}

#friends-bg .memoji-wrapper {
  width: 150px;
  height: 150px;
}

@media (max-width: 600px) {
  #memoji-quiz .menu .option-button .vs-button__content {
    font-size: 14px !important;
  }
  #friends-bg .memoji-wrapper {
    width: 70px;
    height: 70px;
  }
  .current-answer-memoji .memoji-wrapper {
    width: 120px;
    height: 120px;
  }
}

.memoji-float {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateX(-40%) translateY(-50%);
  transform: translateX(-40%) translateY(-50%);
  max-height: 820px;
  width: 300%;
  overflow: hidden;
}

.flip-list-move {
  transition: transform 1s;
}
</style>
