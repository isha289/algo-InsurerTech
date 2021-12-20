<template>
  <section id="approve-reject-funds">
    <h2>FAC Offer List</h2>

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

            <td class="heading center">Escrow Address</td>

            <td class="heading center">Escrow Balance</td>

            <td class="heading center">Reinsurer 1</td>

            <td class="heading center">Reinsurer 2</td>

        </tr>
        </thead>

        <tbody>
          <tr v-if="offers == ''">
            <td class="empty" colspan="12">
              You do not have any open FAC Orders.
            </td>
          </tr>
          <!-- <tr> -->
          <tr v-else v-for="(offer, index) in offers" :key="index">
			
            <td class="data center">{{ offer.fac_offer_code }}</td>

            <td class="data center">{{ offer.policyNo }}</td>

            <td class="data center">{{ offer.productName }}</td>

            <td class="data center">{{ offer.total_SI }}</td>

            <td class="data center">{{ offer.total_premium }}</td>

            <td class="data center">{{ offer.fac_SI }}</td>

            <td class="data center">{{ offer.fac_premium }}</td>

            <td class="data center">{{offer.reinsurer_amount}}</td>

            <td class="data center">{{ offer.appaddr}}</td>

            <td class="data center">{{ offer.reinsurer1_accept}}</td>

            <td class="data center">{{ offer.reinsurer2_accept}}</td>

           
          </tr>
        </tbody>
      </table>

      <!-- <button
        v-show="offers != ''"
        @click="approveOrRejectFunds"
        class="btn btn-primary"
      >
        <div v-if="!isLoading">Confirm</div>

        <div v-else class="lds-ring">
          <div></div>

          <div></div>

          <div></div>

          <div></div>
        </div>
      </button> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "ApproveRejectFunds",

  data() {
    return {
      isLoading: false,

      offers: [],

      selectedOffer: {},
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
            Insurer_Address: this.$store.state.account,
          }),
        }
        await fetch(this.$url + "/insurerofferlist", post)
        .then((response) => response.json())

          .then((data) => {
            this.offers = data.offer;
            console.log(data)
           
          });
      } catch (err) {
        this.$emit("popup", "", "There was an error.");
        
      }

     
    },



 },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
table {
  margin: 2rem 0;
}

td {
  padding: 0 20px;
}

.data {
  word-break: break-word;

  text-align: left;

  vertical-align: inherit;

  padding: 0.5rem 0;
}

.heading {
  text-align: left;

  font-weight: 500;

  font-size: 1.1rem;
}

.center {
  text-align: center;
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
