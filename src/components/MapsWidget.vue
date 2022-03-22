<template>
  <div>
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="15"
      ref="mapRef"
      :style="'height: ' + mapsHeight"
      map-type-id="roadmap"
      class="location-map m-t-50"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }"
    >
    </GmapMap>
  </div>
</template>
<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'MapsWidget',
  props: ['mapsHeight'],
  computed: {
    google: gmapApi
  },
  methods: {
    openMaps() {
      window.open('https://goo.gl/maps/mnYZceKBcNuTQka79');
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      map.panTo({ lat: -25.610545715825893, lng: 29.00554614602849 });
    });
  }
};
</script>
<style lang="scss">
.location-map {
  max-width: 1000px;
  margin: 0 auto;
}

.location-map .vue-map {
  box-shadow: 0 3px 15px 0 rgb(0 0 0 / 15%);
  border-radius: 15px;
}
</style>
