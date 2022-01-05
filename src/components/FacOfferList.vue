<template>
  <section id="approve-reject-funds">
    <div class="section-head">
      <h2>FAC Offer List</h2>
    </div>
    <div class="InsurerOfferList">
      <table class="table table-striped table-bordered" style="overflow: scroll">
        <thead>
          <tr>
            <td class="heading">FAC Offer Code</td>
            <td class="heading">Policy No</td>
            <td class="heading">Product Name</td>
            <td class="heading center" colspan="2">Total</td>
            <td class="heading center" colspan="2">FAC</td>
            <td class="heading">Escrow Address</td>
            <td class="heading center">Escrow Balance</td>
            <td class="heading center">Reinsurer 1</td>
            <td class="heading center">Reinsurer 2</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="heading center">SI</td>
            <td class="heading center">Premium</td>
            <td class="heading center">SI</td>
            <td class="heading center">Premium</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="offers == ''">
            <td class="empty" colspan="12">You do not have any open FAC Offers.</td>
          </tr>
          <tr v-else v-for="(offer, index) in offers" :key="index">
            <td class="data">{{ offer.fac_offer_code }}</td>
            <td class="data">{{ offer.policyNo }}</td>
            <td class="data">{{ offer.productName }}</td>
            <td class="data center">{{ offer.total_SI }}</td>
            <td class="data center">{{ offer.total_premium }}</td>
            <td class="data center">{{ offer.fac_SI }}</td>
            <td class="data center">{{ offer.fac_premium }}</td>
            <td class="data"><div class="data address">{{ offer.appaddr }}</div></td>
            <td class="data center">{{ offer.escrowBalance }}</td>
            <td class="data center" :style="{
              color: offer.reinsurer1_accept === 1 ? 'green' : 'red'
            }">{{ offer.reinsurer1_accept === 1 ? 'Accepted' : 'Pending' }}</td>
            <td class="data center" :style="{
              color: offer.reinsurer2_accept === 1 ? 'green' : 'red'
            }">{{ offer.reinsurer2_accept === 1 ? 'Accepted' : 'Pending' }}</td>
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
    async getEscrowBalance(escrowAddr, index) {
      try {
        let post = {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            account_address: escrowAddr
          })
        };
        await fetch(this.$url + "/tokenbalance", post)
          .then(response => response.json())
          .then(data => {
            this.offers[index].escrowBalance = data['Token Balance']
          });
      } catch (err) {
        this.$emit("popup", "", "There was an error.");
      }
    },
    async loadData() {
      try {
        this.isLoading = true;
        let post = {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            Insurer_Address: this.$store.state.account
          })
        };
        await fetch(this.$url + "/insurerofferlist", post)
          .then(response => response.json())
          .then(data => {
            this.offers = data.offer;
            this.offers.map((offer, index) => {
              this.getEscrowBalance(offer.appaddr, index)
            })
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
