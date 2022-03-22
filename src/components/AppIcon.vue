<template>
  <div @click="iconClicked()" class="app-icon-container">
    <div class="app-icon">
      <transition name="fade">
        <div v-if="hasNotification" class="notification-dot">1</div>
      </transition>
      <img class="app-icon-svg" :src="iconPath" />
      <p class="icon-label">{{ iconLabel }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'iconType',
    'iconLabel',
    'hasNotification',
    'iconClick',
    'externalLink'
  ],
  name: 'AppIcon',
  computed: {
    iconPath() {
      return (
        'https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/icons/' +
        this.iconType +
        '.svg'
      );
    }
  },
  methods: {
    iconClicked() {
      this.$emit('iconClicked');
      if (this.externalLink) {
        window.open(this.iconClick);
      } else {
        if (this.iconClick) this.$router.push('/' + this.iconClick);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-icon-svg {
  max-height: 100px;
  width: 100px;
  border-radius: 23%;
  -webkit-box-shadow: 0 5px 28px 0 rgb(0 0 0 / 25%);
  box-shadow: 0 5px 28px 0 rgb(0 0 0 / 25%);
  transition: transform 0.5s;
}

.app-icon-svg:hover {
  transform: scale(1.1);
  transition: transform 0.5s;
  cursor: pointer;
}

.icon-label {
  margin-top: 3px;
  font-weight: 500;
}

.notification-dot {
  background-color: rgb(255, 62, 62);
  width: 25px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 100;
}

.app-icon {
  margin: 0 auto;
  width: fit-content;
  position: relative;
}

.app-icon-container {
  width: 16.66%;
  text-align: center;
}

@media (max-width: 800px) {
  .app-icon-container {
    width: 25%;
  }
}

@media (max-width: 1000px) {
  .notification-dot {
    width: 22px;
    height: 22px;
    line-height: 22px;
  }
  .app-icon-svg {
    max-height: 65px;
    width: 65px;
  }
}

@media (max-width: 360px) {
  .icon-label {
    font-size: 16px;
  }
  .app-icon-svg {
    max-height: 55px;
    width: 55px;
  }
}
</style>
