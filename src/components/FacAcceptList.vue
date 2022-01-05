<template>
  <section id="approve-reject-funds">
    <div class="section-head">
      <h2>Accepted FAC</h2>
    </div>
    <div class="InsurerOfferList">
      <table class="table table-striped" style="overflow: scroll">
        <thead>
          <tr>
            <td class="heading center">FAC Offer Code</td>
            <td class="heading center">Policy No</td>
            <td class="heading center">Product Name</td>
            <td class="heading center">Total SI</td>
            <td class="heading center">Total Premium</td>
            <td class="heading center">FAC SI</td>
            <td class="heading center">FAC Premium</td>
            <td class="heading center">Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="offers == ''">
            <td class="empty" colspan="12">You have not accepted any FAC Offers.</td>
          </tr>
          <tr v-else v-for="(offer, index) in offers" :key="index">
            <td class="data center">{{ offer.fac_offer_code }}</td>
            <td class="data center">{{ offer.policyNo }}</td>
            <td class="data center">{{ offer.productName }}</td>
            <td class="data center">{{ offer.total_SI }}</td>
            <td class="data center">{{ offer.total_premium }}</td>
            <td class="data center">{{ offer.fac_SI }}</td>
            <td class="data center">{{ offer.fac_premium }}</td>
            <td class="data center">{{ offer.reinsurer_amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApproveRejectFunds",
  data() {
    return {
      offers: [],
      selectedOffer: {}
    };
  },
  methods: {
    
    async loadData() {
      try {
        this.isLoading = true;
        let post = {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            Reinsurer_Address: this.$store.state.account
          })
        };
        await fetch(this.$url + "/facofferlist", post)
          .then(response => response.json())
         .then((data) => {
            this.offers = [];

            data.offer.map((o) => {
              if (o.accept == 1) {
                this.offers.push(o);
              }
            });
          });
      } catch (err) {
        this.$emit("popup", "", "There was an error.");
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
table {
  margin: 2rem 0;
}

input[type="radio"] {
  width: 1rem;

  height: 1rem;

  vertical-align: -webkit-baseline-middle;
}

.empty {
  font-size: 1.4rem;
}
</style>
