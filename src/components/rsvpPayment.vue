<template>
  <div>
    <vs-row justify="center">
      <h2>Betaling</h2>
    </vs-row>
    <vs-row v-if="!allDayOnly" justify="center">
      <p class="section-description m-b-20">
        Die koste vir die naweek se akkommodasie (2 aande) en etes word
        hieronder uiteengesit sodra jy RSVP. Betaling word direk aan ons
        uitgemaak, en ons tref verdere reëlings met Meulstroom.

        <br />
        <br />
        Julle kan gerus die bedrag in paaiemente betaal, met die totale bedrag
        betaalbaar teen: <br />
        {{ paymentDueDate }}
      </p>
    </vs-row>
    <vs-row v-else justify="center">
      <p class="section-description m-b-20">
        Geen betaling vir persone wat slegs die trou dag bywoon nie.
      </p>
    </vs-row>
    <vs-card
      class="payment"
      style="margin:0 auto"
      v-if="total > 0 || walletApp || invitePaymentMade > 0"
    >
      <template #text>
        <vs-table striped v-if="!(total == 0 && walletApp)">
          <template #thead>
            <vs-tr>
              <vs-th>
                Beskrywing
              </vs-th>
              <vs-th>
                Per Persoon
              </vs-th>
              <vs-th>
                Totaal
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-if="adultCount > 0">
              <vs-td data-label="Beskrywing">
                {{ adultCount }} x Volwassenes (Naweek)
              </vs-td>

              <vs-td> R{{ adultRate }} </vs-td>
              <vs-td data-label="Totaal"> R{{ adultCount * adultRate }} </vs-td>
            </vs-tr>
            <vs-tr v-if="kidCount > 0">
              <vs-td data-label="Beskrywing">
                {{ kidCount }} x Kinders (Naweek)
              </vs-td>

              <vs-td> R{{ kidRate }} </vs-td>
              <vs-td data-label="Totaal"> R{{ kidCount * kidRate }} </vs-td>
            </vs-tr>
            <vs-tr v-if="dayOnly > 0">
              <vs-td> {{ dayOnly }} x Slegs Trou Dag (Saterdag) </vs-td>

              <vs-td> R{{ dayRate }} </vs-td>
              <vs-td> R{{ dayOnly * dayRate }} </vs-td>
            </vs-tr>
            <vs-tr v-if="invitePaymentMade > 0">
              <vs-td> <b>Sub-Totaal</b></vs-td>
              <vs-td> </vs-td>

              <vs-td> R{{ subTotal }} </vs-td>
            </vs-tr>
            <vs-tr v-if="invitePaymentMade > 0">
              <vs-td> <b>Reeds Betaal</b></vs-td>
              <vs-td> </vs-td>
              <vs-td> R{{ invitePaymentMade }} </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> <b>Totaal</b></vs-td>

              <vs-td> </vs-td>
              <vs-td> R{{ total }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <h3>Bank Rekening</h3>
        <p>Capitec</p>
        <p>Account Holder: Ms Christi Kruger</p>
        <p>Account Number: 1592550493</p>
        <p>Branch Code: 470010</p>
        <p>Reference: GCT{{ paymentRef }}</p>
      </template>
    </vs-card>
  </div>
</template>
<script>
export default {
  name: 'rsvpPayment',
  props: [
    'invitePaymentMade',
    'adultCount',
    'kidCount',
    'dayOnly',
    'groupName',
    'walletApp'
  ],
  methods: {},
  computed: {
    total() {
      if (this.subTotal - this.invitePaymentMade < 0) return 0;
      else return this.subTotal - this.invitePaymentMade;
    },
    subTotal() {
      return (
        this.adultCount * this.adultRate +
        this.kidCount * this.kidRate +
        this.dayOnly * this.dayRate
      );
    },
    allDayOnly() {
      if (this.dayOnly > 0 && this.adultCount == 0 && this.kidCount == 0)
        return true;
      return false;
    },
    adultRate() {
      return this.$store.state.price ? this.$store.state.price.adult : null;
    },
    kidRate() {
      return this.$store.state.price ? this.$store.state.price.kid : null;
    },
    dayRate() {
      return this.$store.state.price ? this.$store.state.price.day : null;
    },
    paymentDueDate() {
      return this.$store.state.price
        ? this.$store.state.price.payment_due
        : null;
    },
    paymentRef() {
      return this.groupName
        .replace(/[aeiou]/gi, '')
        .replaceAll(' ', '')
        .replaceAll(/[^a-zA-Z ]/g, '')
        .toUpperCase();
    }
  },
  mounted() {
    this.$store.dispatch('getPrice');
  }
};
</script>
<style lang="scss">
.payment .vs-card {
  max-width: 800px !important;
  margin: 0 auto !important;
}

.vs-card__text {
  padding: 15px !important;
}

.vs-table__tr .vs-table__td {
  font-size: 17px !important;
}

.vs-table__th {
  font-size: 17px !important;
  text-align: center !important;
}

@media (max-width: 900px) {
  .payment .vs-card {
    max-width: 90% !important;
  }
}
</style>
