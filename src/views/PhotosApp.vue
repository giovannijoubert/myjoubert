<template>
  <div id="photos-app-container">
    <h2>
      Albums
      <span class="emoji-reaction">
        📷
      </span>
    </h2>

    <p class="section-description m-b-25">
      Jy ken waarskynlik ons storie, of ten minste ’n gedeelte daarvan, maar wat
      is ’n trou-website sonder ’n bietjie geskiedenis oor die paartjie? Hier
      volg 8 jaar se stories in foto's… <br />
    </p>
    <vs-row class="gallery-row" vs-justify="center" align="center">
      <vs-col
        class="column vs-xl-4 vs-lg-4 vs-md-6 vs-sm-6 vs-xsm-4 m-t-20"
        v-for="gallery in galleries"
        :key="gallery.id"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
      >
        <div @click="goToGallery(gallery.id)" class="gallery-album-icon">
          <vs-card>
            <template #img>
              <img :src="gallery.photos[0].image_url" alt="" />
            </template>
            <template #text>
              <h2>{{ gallery.title }}</h2>
            </template>
            <template #interactions>
              <vs-button @click="loveIt" danger icon>
                <i class="bx bx-heart"></i>
              </vs-button>
            </template>
          </vs-card>
        </div> </vs-col
    ></vs-row>
    <appLink
      :whiteIcon="true"
      iconType="home"
      clickAction="venue"
      title="Die Venue"
      description="Langs die Wilgerivier!"
    />
  </div>
</template>
<script>
import appLink from '@/components/appLink.vue';
export default {
  components: { appLink },
  name: 'Photos',
  mounted() {
    this.$store.dispatch('loadGalleries').catch(() => {
      this.$router.push('/lockscreen');
      this.$vs.notification({
        color: 'danger',
        title: 'Aggenee',
        duration: 10000,
        text:
          'Iets het fout gegaan - miskien loadshedding by die Jouberts. Probeer asseblief weer oor so uur. 💩'
      });
    });
    this.updatePageView('fotos_viewed');
  },
  computed: {
    galleries() {
      if (this.$store.state.galleries) {
        return this.$store.state.galleries.filter(i => i.photos.length > 0);
      }
      return 0;
    }
  },
  methods: {
    goToGallery(galleryId) {
      this.$router.push('/fotos/' + galleryId);
    },
    loveIt() {
      this.$vs.notification({
        color: 'danger',
        title: 'Awh shucks! ❤️',
        text: 'Jy maak ons bloos. 😊'
      });
    }
  }
};
</script>
<style lang="scss">
#photos-app-container {
  margin: 0 auto;
  max-width: 1200px;
}

.gallery-album-icon {
  padding: 10px !important;
}

#photos-app-container .vs-card {
  margin: 0 auto;
}
</style>
