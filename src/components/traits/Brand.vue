<template>
	<div class="brand" :class="brandClass">
		<img src="../../../public/sft.png" alt="logo">
		<div v-if="type === undefined">
			<!-- <p class="marketplace">Marketplace</p> -->
			<p>Reinsurance</p>
			<p>Platform</p>
		</div>
		<h2 v-show="type !== undefined">{{ type }}</h2>
	</div>
</template>

<script>
export default {
	name: 'Brand',
	props: ['brandClass', 'type']
}
</script>

<style lang="scss" scoped>
.brand {
	font-size: 1.6rem;
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		margin: 0;
		line-height: 2rem;
	}

	img {
		height: 3.3rem;
		margin-right: 1rem;
	}

	.marketplace {
		margin: 0;
		font-size: 1rem;
		position: relative;
		top: 8px;
	}
}
</style>