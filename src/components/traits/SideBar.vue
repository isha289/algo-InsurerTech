<template>
	<div class="nav-links">
		<router-link v-for="(item, index) in items" :to="item.to" :key="index" class="tab">
			<i :class="item.icon"></i>
			{{ item.text }}
		</router-link>
		<button class="btn tab" @click="signOut"><i class="fas fa-sign-out-alt"></i>Sign out</button>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			items: []
		}
	},
	methods: {
		signOut() {
			localStorage.removeItem('account')
			localStorage.removeItem('firstName')
			localStorage.removeItem('lastName')
			localStorage.removeItem('pa')
			this.$store.dispatch('updateAccount', {
				account: '',
				firstName: '',
				lastName: '',
				pa: 'true',
			})
			this.$router.push('/login')
		},
		loadData() {
			if(this.$store.state.pa === 'true') {
				this.items = [
					{
						to: '/view-fac-offers',
						icon: 'fas fa-binoculars',
						text: 'FAC Offers',
					}
				]
			} else {
				this.items = [
					{
						to: '/get-credits',
						icon: 'fas fa-coins',
						text: 'Buy Tokens',
					},
					{
						to: '/tokenredeem',
						icon: 'fas fa-credit-card',
						text: 'Redeem Tokens',
					},
					{
						to: '/facoffercreation',
						icon: 'fas fa-plus-circle',
						text: 'Create FAC Offer',
					},
					{
						to: '/insureroffer',
						icon: 'fab fa-buffer',
						text: 'FAC Offers',
					},
					{
						to: '/fac-accept',
						icon: 'fas fa-check',
						text: 'Accept FAC Offer',
					},
					{
						to: '/facaceptlist',
						icon: 'fas fa-check-double',
						text: 'Accepted FAC Offers',
					},
				]
			}
		},
	},
	mounted() {
		this.loadData()			
	},
	unmounted() {
		this.items = []
	}
}
</script>

<style lang='scss' scoped>
.nav-links {
	display: flex;
	flex-direction: column;
	align-items: baseline;

	.fas, .fab {
		margin-right: 5px;
	}

	.tab {
		color: white;
		padding: 10px 30px;
		width: 100%;
		text-align: left;
		transition: all 200ms ease-in-out;

		&:hover {
			text-decoration: none;
			background-color: #2c7e59
		}
	}

	.router-link-active {
		color: navy !important;
		background-color: white;
		pointer-events: none;
	}
}
</style>