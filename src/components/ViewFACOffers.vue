<template>
	<section id="view-fac-offers">
		<h2>FAC Offers</h2>
		
		<OfferDetails
			@close="this.closeModal"
			v-show="this.showDetails"
			:offer="this.selectedOffer"
		/>

		<div class="search-offers">
			<input type="text" name="offer" id="offer" placeholder="Search by Product Name" v-model="term" />
		</div>

		<table class="table table-striped" style="margin-top: 1.5rem">
			<thead>
				<tr>
					<td class="heading">FAC Offer Code</td>
					<td class="heading">Product Name</td>
					<td class="heading">Insurer</td>
					<td class="heading center">Amount</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(offer, index) in filteredOffers" :key="index" @click="this.selectOffer(offer)" class="offer-row">
					<td class="data link">{{ offer.fac_offer_code }}</td>
					<td class="data">{{ offer.productName }}</td>
					<td class="data">{{ offer.insurer_name }}</td>
					<td class="data center">{{ offer.fac_premium }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
import OfferDetails from './traits/OfferDetails'

export default {
	name: 'ViewFACOffers',
	components: {
		OfferDetails
	},
	data() {
		return {
			offers: [],
			selectedOffer: {},
			showDetails: false,
			term: '',
		}
	},
	methods: {
		selectOffer(offer) {
			this.selectedOffer = offer
			this.showDetails = true
		},
		closeModal() {
			this.showDetails = false
			this.selectedOffer = {}
		},
		async loadData() {
			try {
				await fetch(this.$url + "/offerlist")
				.then(response => response.json())
				.then(data => {
					this.offers = data.OfferList;
				});
			} catch (err) {
				this.$emit("popup", "", "There was an error.");
			}
		}
	},
	computed: {
		filteredOffers() {
			return this.offers.filter(offer => {
				let re = new RegExp(this.term, 'ig')
				return offer.productName.match(re)
			})
		}
	},
	mounted() {
		this.loadData();
	}
}
</script>

<style lang="scss" scoped>
.search-offers {
	margin-top: 1rem;
	display: flex;

	input {
		margin: 0;
		width: 50%;
	}
}

.offer-row {
	cursor: pointer;
	transition: all 200ms ease-in-out;

	.link {
		color: blue;
	}

	&:hover {
		background-color: rgba($color: #777, $alpha: 0.5);

		.link {
			text-decoration: underline;
		}
	}
}
</style>