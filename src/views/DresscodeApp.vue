<template>
  <div class="dresscode-container">
    <div class="card-container">
      <div class="mj-card m-l-25 m-r-25">
        <h2>Dress Code</h2>
        <p class="section-description m-b-25 m-r-20 m-l-20">
          Watookal jou hart begeer. P.S. Ons sal dit ❤️ indien jy in jou
          <b>SNEAKERS</b> opdaag. <br /><br />
          <i>Converse, Levi's, Soviets, Pep-stores, ons judge nie.</i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.updatePageView('dresscode_viewed');
  },
  name: 'Dresscode'
};
</script>
<style lang="scss">
.dresscode-container {
  left: 0px;
  position: absolute;
  height: 100%;
  width: 100%;
}

.dresscode-container::after {
  content: '';
  background: url('https://s3.af-south-1.amazonaws.com/myjoubert.co.za/static-content/images/sneaker-bg.png');
  background-size: contain;
  opacity: 0.2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.dresscode-container .card-container {
  display: flex; // make us of Flexbox
  align-items: center; // does vertically center the desired content
  justify-content: center; // horizontally centers single line items
  text-align: center;
  height: 100%;
}
</style>
