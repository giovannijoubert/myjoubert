<template>
  <div id="maps">
    <MapsWidget mapsHeight="600px" />
  </div>
</template>
<script>
import MapsWidget from '@/components/MapsWidget';
export default {
  components: { MapsWidget },
  methods: {}
};
</script>
<style lang="scss">
#maps {
  width: 100%;
}
</style>
