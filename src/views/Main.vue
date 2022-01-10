<template>
	<div class="main">
		<div class="navigation-bar">
			<Brand></Brand>
			<SideBar />
		</div>
		
		<div ref="popup" class="popup" :class="pClass">
			<div class="header" v-show="message != ''">
				<i class="fas" :class="icon"></i>
				<span>{{ message }}</span>
			</div>
			<div class="description">{{ description }}</div>
			<input
				v-if="button == 'Confirm'"
				ref="address"
				type="text"
				placeholder="Account Address *"
				class="address"
				name="address"
				id="address"
				v-model="address"
				required />
			<div class="buttons">
				<button @click="pClass = ''" class="btn btn-primary okay">Okay</button>
			</div>
		</div>

		<!-- Top Bar -->
		<div class="top-bar">
			<div class="name">
				Welcome, {{ name }}
			</div>
			<div class="balance">
				<i class="fas fa-rupee-sign"></i>
				<div v-if="!isLoading">
					{{ balance }}
				</div>
				<div v-else class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="balance">
				<i class="fas fa-coins"></i>
				<div v-if="!isLoading">
					{{ Token_Balance }}
				</div>
				<div v-else class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="account">
				<i class="fas fa-wallet"></i>
				<span>{{ account }}</span>
			</div>
		</div>
			
		<transition
			name="home-router-view-transition"
			enter-active-class="animated fadeIn"
			leave-active-class="animated fadeOut"
			mode="out-in">
			<router-view @popup="gotPopup" v-slot="{ Component }">
				<component :class="{darken: this.pClass != ''}" ref="view" :is="Component" />
			</router-view>
		</transition>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Brand from '@/components/traits/Brand.vue'
import SideBar from '@/components/traits/SideBar.vue'

export default {
	name: 'Main',
	components: {
		Brand,
		SideBar
	},
	data() {
		return {
			isLoading: false,
			message: '',
			description: '',
			icon: '',
			pClass: '',
			address: '',
			Token_Balance: null,
			account: this.$store.state.account,
			balance: null,
			name: this.$store.state.firstName + ' ' + this.$store.state.lastName 
		}
	},
	methods: {
		...mapActions([
			'updateAccount'
		]),
		gotPopup(message, description, data = {timeout: 6000}) {
			console.log(data.timeout)
			this.address = ''
			this.message = message
			this.description = description
			if(message != '') {
				this.icon = 'fa-check-circle'
			}
			this.pClass = 'pop'
			this.isLoading = true
			setTimeout(()=>{
				this.getAccountBalance()
				this.getBankBalance()
			}, data.timeout)
		},
		async getAccountBalance() {
			try {
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'account_address' : this.account,
					})
				}
				await fetch(this.$url+'/tokenbalance', post)
					.then(response => response.json())
					.then(data => {
						if(data['Token Balance'] === null)
						this.Token_Balance = 0
						else
						this.Token_Balance = data['Token Balance']
					})
			} catch(err) {
				console.log(err)
			}
			this.isLoading = false
		},
		async getBankBalance() {
			try {
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'account_address' : this.account,
					})
				}
				await fetch(this.$url+'/accountbalance', post)
					.then(response => response.json())
					.then(data => {
						if(data['balance'] === null)
						this.balance = 0
						else
						this.balance = data['balance']
					})
			} catch(err) {
				console.log(err)
			}
			this.isLoading = false
		},
	},
	mounted() {
		this.getAccountBalance()
		this.getBankBalance()
	}
}
</script>

<style lang="scss" scoped>
.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	position: absolute;
	top: 0;
	right: 0;
	height: fit-content;
	width: 100%;
	padding: 0.6rem 2rem 0.6rem 18rem;
	background-color: #40515E;
	color: white;
	box-shadow: 0 3px 7px -7px black;
	text-align: left;
	font-size: 1.3rem;

	.lds-ring {
		bottom: 3px;
	}

	.balance {
		display: flex;
		align-items: center;
		margin: 0 2rem;
	}

	.account {
		display: flex;
		align-items: center;
		font-size: 1.1rem;
		width: 10rem;
		transition: all 400ms ease-in-out;
		
		span {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&:hover {
			width: 20rem;
			span {
				word-break: break-all;
			}
		}

		@media screen and (min-width: 1570px) {
			& {
				width: auto;
			}

			&:hover {
				width: max-content;
			}
		}
	}

	i {
		margin-right: 10px;
	}
}

.navigation-bar {
	height: 100%;
	width: 16rem;
	display: grid;
	grid-gap: 2.5rem;
	grid-template-rows: 4rem auto;
	background-color: navy;
	color: white;
	position: fixed;
	overflow: overlay;
	z-index: 1;
}
</style>