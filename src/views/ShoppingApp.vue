<template>
  <div id="shopping">
    <h2>Geskenke</h2>
    <p class="section-description m-b-50">
      Al wat ons nodig het is dat almal hulself gate-uit geniet by ons troue.
      Daar is egter dié wat steeds sal aandring op 'n geskenk en daarom het ons
      dit maklik gemaak om een te kies. 🎁
    </p>
    <vs-card class="xl-card" type="3">
      <template #title>
        <h3>Kitchenique</h3>
      </template>
      <template #img>
        <span class="emoji-reaction large">
          👩‍🍳
        </span>
      </template>
      <template #text>
        <p class="m-t-5">
          Picnic kombers, hout snyplanke, lekker-ruik kerse
        </p>
        <vs-button
          @click="
            openLink(
              'https://kitchenique.co.za/my-lists/view-a-list/?wlid=114946&wlkey=7fcaf8e7fe07b2c385f0fb229cac082d608153c01c15a'
            )
          "
          floating
          class="mj-center m-t-25"
          ><i class="bx bx-globe m-r-5"></i>Besoek Winkel Aanlyn</vs-button
        >
      </template>
    </vs-card>
    <vs-card class="xl-card m-t-20" type="3">
      <template #title>
        <h3>Builders</h3>
      </template>
      <template #img>
        <span class="emoji-reaction large">
          👷
        </span>
      </template>
      <template #text>
        <p class="m-t-5">
          Regte-egte flitslig, kampstoelle ensomeer
        </p>
        <vs-button
          @click="
            openLink(
              'https://giftregistry.builders.co.za/Event/Giovanni-Christi?utm_source=share'
            )
          "
          floating
          class="mj-center m-t-25"
          ><i class="bx bx-globe m-r-5"></i>Besoek Winkel Aanlyn</vs-button
        >
      </template>
    </vs-card>
  </div>
</template>
<script>
//https://kitchenique.co.za/my-lists/view-a-list/?wlid=114946&wlkey=7fcaf8e7fe07b2c385f0fb229cac082d608153c01c15a

export default {
  mounted() {
    this.updatePageView('geskenklys_viewed');
  },
  methods: {
    openLink(site_url) {
      window.open(site_url);
    }
  }
};
</script>
<style>
.xl-card .vs-card {
  max-width: 600px;
  margin: 0 auto;
}

.xl-card .vs-card__text {
  margin: 0 auto;
}
</style>
