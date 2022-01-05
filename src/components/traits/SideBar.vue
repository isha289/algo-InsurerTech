<template>
	<div class="nav-links">
		<div v-for="(item, index) in items" :key="index" class="nav-links">
			<div class="children-container" v-if="item.child">
				<div class="tab" @click="item.toggle = !item.toggle">
					<i :class="item.toggle ? 'fas fa-folder-open' : 'fas fa-folder'"></i>
					{{ item.text }}
					<i class="fas fa-chevron-up" :class="item.toggle ? 'up' : 'down'"></i>
				</div>
				<ul class="children" :class="item.toggle ? 'toggled' : ''" v-if="item.child">
					<router-link v-for="(child, index) in item.child" :to="child.to" :key="index" class="tab">
						<i :class="child.icon"></i>
						{{ child.text }}
					</router-link>
				</ul>
			</div>
			<router-link v-else :to="item.to" class="tab">
				<i :class="item.icon"></i>
				{{ item.text }}	
			</router-link>
		</div>
		<button class="btn tab" @click="signOut"><i class="fas fa-sign-out-alt"></i>Sign out</button>
	</div>
</template>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			items: [],
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
						text: 'FAC Offer',
						toggle: false,
						child: [
							{
								to: '/facoffercreation',
								icon: 'fas fa-plus-circle',
								text: 'Create',
							},
							{
								to: '/insureroffer',
								icon: 'fab fa-buffer',
								text: 'List',
							},
							{
								to: '/fac-accept',
								icon: 'fas fa-check',
								text: 'Accept',
							},
							{
								to: '/facaceptlist',
								icon: 'fas fa-check-double',
								text: 'Accepted',
							},
						]
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
	padding: 0;
	list-style: none;

	.fa-chevron-up {
		float: right;
		position: relative;
		top: 4px;
		transition: all 200ms ease-in-out;
	}
	.down {
		transform: rotate(180deg)
	}

	div {
		width: 100%;
	}

	.fas, .fab {
		margin-right: 5px;
	}

	.children {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-left: 2rem;
		margin: 0;
		opacity: 0;
		height: 0;
		transition: all 200ms ease-in-out;
	}
	.toggled {
		opacity: 1;
		height: 11rem;
	}

	.tab {
		color: white;
		padding: 10px 30px;
		width: 100%;
		text-align: left;
		transition: all 200ms ease-in-out;
		list-style: none;
		border-radius: 2rem 0 0 2rem;
		cursor: pointer;

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