<template>
	<section id="offer-details">
		<h2>Offer Details</h2>
		<div class="details">
			<div class="attribute">
				<div class="label">Policy Number:</div>
				<div class="value">{{ offer.policyNo }}</div>
			</div>
			<div class="split custom-margin">
				<div class="attribute">
					<div class="label">Product ID:</div>
					<div class="value">{{ offer.productID }}</div>
				</div>
				<div class="attribute">
					<div class="label">Product Name: </div>
					<div class="value">{{ offer.productName }}</div>
				</div>
			</div>
			<div class="split custom-margin">
				<div class="attribute">
					<div class="label">FAC SI:</div>
					<div class="value">{{ offer.fac_SI }}</div>
				</div>
				<div class="attribute">
					<div class="label">FAC Premium: </div>
					<div class="value">{{ offer.fac_premium }}</div>
				</div>
			</div>
			<div class="split custom-margin">
				<div class="attribute">
					<div class="label">Total SI:</div>
					<div class="value">{{ offer.total_SI }}</div>
				</div>
				<div class="attribute">
					<div class="label">Total Premium: </div>
					<div class="value">{{ offer.total_premium }}</div>
				</div>
			</div>
			<div class="split custom-margin">
				<div class="one attribute" :style="{backgroundColor: offer.reinsurer1_accept === 1 ? '#a1f2a1' : '#f2a1a1'}">
					<div class="value">{{ offer.reinsurer1_name }}</div>
					<div class="attribute">
						<div class="label">Amount:</div>
						<div class="value">{{ offer.reinsurer1_amount }}</div>
					</div>
				</div>
				<div class="two attribute" :style="{backgroundColor: offer.reinsurer2_accept === 1 ? '#a1f2a1' : '#f2a1a1'}">
					<div class="value">{{ offer.reinsurer2_name }}</div>
					<div class="attribute">
						<div class="label">Amount:</div>
						<div class="value">{{ offer.reinsurer2_amount }}</div>
					</div>
				</div>
			</div>
		</div>
		<i class="fas fa-times" @click="this.$emit('close')"></i>
	</section>
</template>

<script>
export default {
	name: 'OfferDetails',
	props: ['offer']
}
</script>

<style lang="scss" scoped>
$margin: 0.5rem 0;

#offer-details {
	position: absolute;
	width: 40%;
	margin: 0;
	top: -90px;
	left: 50%;
	transform: translate(-50%, 50%);
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.2), 0 9px 46px 8px rgba(0, 0, 0, 0.2);
	border-radius: 1rem;
	z-index: 2;
	background-color: white;
	padding-top: 1.3rem;
	max-height: 30rem;
    overflow: hidden auto;

	.fa-times {
		position: absolute;
		top: 20px;
		right: 20px;
		transition: all 200ms ease-in-out;
		transform: scale(2.5);
		cursor: pointer;

		&:hover {
			transform: scale(3)
		}
	}

	.details {
		margin-top: 1.4rem;

		.one, .two {
			padding: 10px;
			border-radius: 0.5rem;
			flex-direction: column;

			.pending {
				margin: auto;
			}
		}

		.custom-margin {
			margin: $margin;
		}

		.attribute {
			display: flex;
			grid-gap: 5px;
			flex-wrap: wrap;
			margin: $margin;

			.label {
				text-align: left;
				font-weight: 600;
			}

			.value {
				word-break: break-word;
				text-align: left;
			}
		}
	}
}
</style>