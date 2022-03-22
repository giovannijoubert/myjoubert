<template>
  <div class="m-t-50">
    <transition name="scale" mode="out-in" appear key="start">
      <div
        v-if="!responded || !songVotes"
        class="leaderboard-locked"
        key="leaderboard-locked"
      >
        <vs-card align="center" class="medium-card" type="3">
          <template #title>
            <h2 class="m-b-10">Top Secret</h2>
          </template>
          <template #img>
            <span class="emoji-reaction">
              🔒
            </span>
          </template>
          <template #text
            ><p>
              Voltooi die volgende om die <br />
              <b>"Extended Leaderboard"</b> te sien
            </p></template
          >
        </vs-card>
        <appLink
          v-if="!responded"
          class="m-b-50"
          :whiteIcon="true"
          iconType="calendar"
          clickAction="rsvp"
          title="RSVP"
          description="Voltooi die RSVP"
        />
        <appLink
          v-if="!songVotes"
          class="m-b-50"
          iconType="apple-music"
          clickAction="tunes"
          title="Laai 'n Tune"
          description="Laai ten minste 2 liedjies"
        />
      </div>
      <div v-else class="leaderboard-stats" key="leaderboard-stats">
        <h2>Extended Leaderboard</h2>
        <transition name="scale" mode="out-in" appear key="start">
          <div
            v-if="scoreview == 'select'"
            class="option-buttons-container"
            key="leaderboard-selector"
          >
            <div class="player">
              <h2>🧑 Player</h2>
              <vs-button
                @click="goTo('/game/extended-leaderboard/all-scores')"
                class="option-button"
                size="xl"
                floating
                >Full Leaderboard
              </vs-button>
              <vs-button
                @click="goTo('/game/extended-leaderboard/user-accumulative')"
                class="option-button"
                size="xl"
                floating
                >Accumulative Scores
              </vs-button>
              <vs-button
                @click="goTo('/game/extended-leaderboard/user-average')"
                class="option-button"
                size="xl"
                floating
                >Average Scores</vs-button
              >
              <vs-button
                @click="goTo('/game/extended-leaderboard/user-plays')"
                class="option-button"
                size="xl"
                floating
                >Most Plays
              </vs-button>
            </div>
            <div class="group">
              <h2>👪 Group</h2>
              <vs-button
                @click="goTo('/game/extended-leaderboard/group-accumulative')"
                class="option-button"
                size="xl"
                floating
                >Accumulative Scores
              </vs-button>
              <vs-button
                @click="goTo('/game/extended-leaderboard/group-average')"
                class="option-button"
                size="xl"
                floating
                >Average Scores</vs-button
              >
              <vs-button
                @click="goTo('/game/extended-leaderboard/group-plays')"
                class="option-button"
                size="xl"
                floating
                >Most Plays
              </vs-button>
            </div>
          </div>
          <div v-else-if="scoreview == 'all-scores'" key="leaderboard-view">
            <h2>All Scores</h2>
            <vs-card
              v-for="(score, index) in allScores"
              :key="index"
              align="center"
              class="medium-card score-card"
              type="3"
            >
              <template #title>
                <h2 class="m-b-10">
                  {{ index + 1 }}. {{ score.name.toUpperCase() }}
                </h2>
              </template>
              <template #img> </template>
              <template #text
                ><p>
                  ({{ score.group_name }}) <br />
                  {{ Number(score.score).toLocaleString() }}
                </p></template
              >
            </vs-card>
          </div>
          <div
            v-else-if="scoreview == 'user-accumulative'"
            key="leaderboard-view"
          >
            <h2>Total Scores</h2>
            <p>Al jou tellings bymekaar getel</p>
            <p>
              <vs-card
                v-for="(score, index) in user_accumulative"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.name.toUpperCase() }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.score).toLocaleString() }}</b> <br />
                    ({{ score.count }}
                    games gespeel)
                  </p></template
                >
              </vs-card>
            </p>
          </div>
          <div
            v-else-if="scoreview == 'group-accumulative'"
            key="leaderboard-view"
          >
            <h2>Total Scores</h2>
            <p>Al die groep se tellings bymekaar getel</p>
            <p>
              <vs-card
                v-for="(score, index) in group_accumulative"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.group_name }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.score).toLocaleString() }}</b> <br />
                    ({{ score.count }}
                    games gespeel)
                  </p></template
                >
              </vs-card>
            </p>
          </div>
          <div v-else-if="scoreview == 'user-average'" key="leaderboard-view">
            <h2>Average Scores</h2>
            <p>Wie doen oor die algemeen die beste?</p>
            <p>
              <vs-card
                v-for="(score, index) in user_average"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.name.toUpperCase() }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.score).toLocaleString() }}</b>
                  </p></template
                >
              </vs-card>
            </p>
          </div>
          <div v-else-if="scoreview == 'group-average'" key="leaderboard-view">
            <h2>Average Scores</h2>
            <p>Watter groep doen oor die algemeen die beste?</p>
            <p>
              <vs-card
                v-for="(score, index) in group_average"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.group_name }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.score).toLocaleString() }}</b>
                  </p></template
                >
              </vs-card>
            </p>
          </div>
          <div v-else-if="scoreview == 'user-plays'" key="leaderboard-view">
            <h2>Most Plays</h2>
            <p>Wie het al die meeste games gespeel?</p>
            <p>
              <vs-card
                v-for="(score, index) in user_most_plays"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.name.toUpperCase() }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.count) }}</b>
                  </p></template
                >
              </vs-card>
            </p>
          </div>
          <div v-else-if="scoreview == 'group-plays'" key="leaderboard-view">
            <h2>Most Plays</h2>
            <p>Watter groep het al die meeste games gespeel?</p>
            <p>
              <vs-card
                v-for="(score, index) in group_most_plays"
                :key="index"
                align="center"
                class="medium-card score-card"
                type="3"
              >
                <template #title>
                  <h2 class="m-b-10">
                    {{ index + 1 }}. {{ score.group_name }}
                  </h2>
                </template>
                <template #img> </template>
                <template #text
                  ><p>
                    <b>{{ Number(score.count) }}</b>
                  </p></template
                >
              </vs-card>
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import appLink from '@/components/appLink';
import axios from 'axios';
import _ from 'lodash';

export default {
  data() {
    return {
      allScores: [],
      rawScores: []
    };
  },
  components: {
    appLink
  },
  computed: {
    group_accumulative() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('group_name')
        .map((score, id) => ({
          group_name: id,
          score: _.sumBy(score, 'score'),
          count: score.length
        }))
        .orderBy('score', 'desc')
        .value();
    },
    user_accumulative() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('name')
        .map((score, id) => ({
          name: id,
          score: _.sumBy(score, 'score'),
          count: score.length
        }))
        .orderBy('score', 'desc')
        .value();
    },
    user_most_plays() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('name')
        .map((score, id) => ({
          name: id,
          count: score.length
        }))
        .orderBy('count', 'desc')
        .value();
    },
    group_most_plays() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('group_name')
        .map((score, id) => ({
          group_name: id,
          count: score.length
        }))
        .orderBy('count', 'desc')
        .value();
    },
    user_average() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('name')
        .map((score, id) => ({
          name: id,
          score: Math.round(_.meanBy(score, 'score'))
        }))
        .orderBy('score', 'desc')
        .value();
    },
    group_average() {
      if (!this.rawScores) return [];

      return _(this.rawScores)
        .groupBy('group_name')
        .map((score, id) => ({
          group_name: id,
          score: Math.round(_.meanBy(score, 'score'))
        }))
        .orderBy('score', 'desc')
        .value();
    },
    responded() {
      return this.getInvite().status === 'responded';
    },
    songVotes() {
      return (
        this.getInvite().song_suggestions &&
        this.getInvite().song_suggestions.length >= 2
      );
    },
    scoreview() {
      return this.$route.params.scoreview;
    }
  },
  mounted() {
    axios
      .get('https://pulsedroid.com/games/2048/leaderboard.php?rawdata=1')
      .then(res => {
        this.rawScores = res.data;
      });
    axios
      .get('https://pulsedroid.com/games/2048/leaderboard.php?allscores=1')
      .then(res => {
        this.allScores = res.data;
      });
  },
  methods: {
    goTo(page) {
      this.$router.push(page);
    }
  }
};
</script>
<style>
.option-button {
  margin: 15px auto !important;
}

.medium-card {
  margin: 0 auto;
  padding: 10px;
  width: fit-content;
}

.leaderboard-locked .medium-card .vs-card {
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100px;
  width: fit-content;
  padding: 15px;
}

.medium-card .vs-card__text p {
  font-size: 16px;
}

.medium-card .vs-card__title {
  padding: 0px !important;
}

.medium-card h2 {
  font-size: 18px !important;
  font-weight: 600 !important;
}

.option-buttons-container {
  justify-content: center;
  margin: 0 auto;
  display: flex;
}

.option-buttons-container .player,
.option-buttons-container .group {
  width: fit-content;
  padding: 10px;
}

@media (max-width: 600px) {
  .option-buttons-container {
    flex-direction: column;
  }
  .option-buttons-container .player,
  .option-buttons-container .group {
    width: 100%;
  }
}

.score-card {
  width: 300px;
}
.score-card .vs-card {
  justify-content: center !important;
}
</style>
