<template>
  <div class="lockscreen-container">
    <div class="lock-icon">
      <box-icon type="solid" size="md" color="white" name="lock-alt"></box-icon>
    </div>
    <div class="time">
      {{ currentTime }}
    </div>
    <div class="date">
      {{ currentDate | moment('dddd, Do MMMM') }}
    </div>
    <transition
      name="scale"
      mode="out-in"
      appear
      @after-leave="faceIdActive = false"
    >
      <div v-if="!recognized" class="face-id-container m-t-50">
        <div ref="faceid" class="face-id-block processing">
          <div class="face-id-message">Face ID</div>
        </div>
      </div>
    </transition>
    <transition name="scale" mode="out-in" appear>
      <div
        v-if="recognized && !faceIdActive"
        class="face-id-recognized m-t-100"
      >
        {{ faceIdMessage }}
      </div>
    </transition>
    <transition name="scale" mode="out-in" appear>
      <div
        v-if="!recognized && faceIdDone"
        class="face-id-recognized failed m-t-0"
      >
        {{ faceIdMessage }}
      </div>
    </transition>
    <div v-if="!(!recognized && faceIdDone)" class="bottom">
      Using <b>Face ID</b> to unlock
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTime: '',
      recognized: false,
      faceIdDone: false,
      faceIdActive: true,
      faceIdMessage: ''
    };
  },
  mounted() {
    if (this.inviteID) {
      this.$store
        .dispatch('getInvite', { inviteID: this.inviteID })
        .then(res => {
          if (res.status != 200) {
            this.faceIdDone = true;
            this.$refs.faceid.classList.remove('processing');
            this.$refs.faceid.classList.add('failed');
            this.faceIdMessage =
              'Click op die link wat ons gestuur het om in te log';
          } else {
            this.faceIdMessage = 'Welkom ' + res.data.group_name;
            localStorage.setItem(
              'invite',
              btoa(unescape(encodeURIComponent(JSON.stringify(res.data))))
            );
            setTimeout(() => {
              this.recognized = true;
            }, 3000);

            setTimeout(() => {
              this.$router.push('/apps');
            }, 4500);
          }
        })
        .catch(() => {
          this.$vs.notification({
            color: 'danger',
            title: 'Aggenee',
            duration: 10000,
            text:
              'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
          });
        });
    } else {
      this.faceIdDone = true;
      this.$refs.faceid.classList.remove('processing');
      this.$refs.faceid.classList.add('failed');
      this.faceIdMessage = 'Click op die link wat ons gestuur het om in te log';
    }

    var now = new Date();

    this.currentTime = now
      .toTimeString()
      .split(' ')[0]
      .substring(0, 5);

    setInterval(this.updateTime, 1000);
  },
  computed: {
    inviteID() {
      return this.$route.params.id;
    },
    currentDate() {
      return new Date();
    }
  },
  methods: {
    updateTime() {
      var now = new Date();

      this.currentTime = now
        .toTimeString()
        .split(' ')[0]
        .substring(0, 5);
    }
  }
};
</script>
<style lang="scss">
.lockscreen-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  padding-top: 40px;
}

.lockscreen-container .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 40px;
}

.lockscreen-container .time {
  font-size: 100px;
  font-weight: 500;
}

.lockscreen-container .date {
  font-size: 25px;
}

.face-id-container {
  margin: 0 auto;
  text-align: center;
}

.face-id-container .face-id-block {
  height: 180px;
  width: 180px;
  background: #fff;
  color: #222;
  opacity: 0.8;
  border-radius: 10px;
  margin: 20px auto;
  position: relative;
}

.face-id-container .face-id-block.success {
  background: url('https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/ui/faceid-success.gif');
  background-size: 300%;
  background-position-x: center;
  background-position-y: 60%;
  background-repeat: no-repeat;
}

.face-id-recognized.failed {
  font-size: 16px;
}

.face-id-container .face-id-block.failed {
  background-image: url('https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/ui/faceid-failed.gif');
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
}

.face-id-container .face-id-block.processing {
  background: url('https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/ui/faceid-processing.gif');
  background-size: 300%;
  background-position-x: center;
  background-position-y: 60%;
  background-repeat: no-repeat;
}

.face-id-container .faceid-success {
  height: 100px;
  mix-blend-mode: darken;
}

.face-id-recognized {
  font-size: 40px;
}

.face-id-container .face-id-block .face-id-message {
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
}

.lockscreen-container {
  background-image: url('https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/ui/lockscreen-bg.jpg') !important;
  background-size: cover !important;
  background-position-y: center !important;
  background-repeat: no-repeat !important;
}
</style>
