<template>
  <div class="gallery-container">
    <h2>{{ galleryData.title }}</h2>
    <p class="description">{{ galleryData.description }}</p>
    <vs-row class="gallery-row" vs-justify="center" align="center">
      <vs-col
        class="column vs-xl-4 vs-lg-4 vs-md-12 m-t-20"
        v-for="photo in galleryData.photos"
        :key="photo.id"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
      >
        <vs-card type="5">
          <template #title>
            <h3 class="date-holder boxShadow">
              {{ photo.capture_date | moment('DD MMMM YYYY') }}
            </h3>
          </template>
          <template #img>
            <img :src="photo.image_url" alt="" />
          </template>
          <template #text>
            <p>
              {{ photo.description }}
            </p>
          </template>
          <template #interactions>
            <vs-button @click="loveIt" danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
          </template>
        </vs-card>

        <img
          v-if="2 == 1"
          class="image-element hoverZoom boxShadow"
          :src="photo.image_url"
        />
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
export default {
  name: 'Gallery',
  computed: {
    galleryData() {
      if (this.$store.state.galleries) {
        var selectedGallery = this.$store.state.galleries.filter(
          i => i.id === this.$route.params.uid
        );
        if (selectedGallery.length > 0) return selectedGallery[0];
      }

      return 0;
    }
  },
  mounted() {
    this.$store.dispatch('loadGalleries');
  },
  methods: {
    linkBackGalleries() {
      this.$router.push('/fotos');
    },
    loveIt() {
      this.$vs.notification({
        color: 'danger',
        title: 'Awh shucks. ❤️',
        text: 'Jy maak ons bloos 😊'
      });
    }
  }
};
</script>
<style lang="scss">
.gallery-container {
  width: 100%;
}
.gallery-container .description {
  max-width: 400px;
  margin: 0 auto;
}
.gallery-container .column {
  padding: 10px;
}

.gallery-container .vs-card-content.type-5 .vs-card {
  background: unset !important;
  max-width: 550px !important;
}
.gallery-container .vs-card-content.type-5 .vs-card__img {
  max-height: 500px !important;
}

.gallery-container .date-holder {
  font-size: 14px;
  color: #fff;
  width: fit-content;
  margin: 0 auto;
  padding: 5px;
  border-radius: 15px;
  background: rgb(255, 71, 87);
}
.gallery-container .image-element {
  width: auto;
  max-width: 100%;
  max-height: 500px;
  border-radius: 20px;
}

.gallery-container .gallery-row {
  max-width: 80%;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .gallery-container .gallery-row {
    max-width: 95%;
  }
}
</style>
