<template>
	<section id="token-creation">
		<h2>InsurerTech Token</h2>
		<form @submit.prevent="tokenCreation">
			<!-- <div class="input-field with-label">
                <label>InsurerTech Address</label>
				<input ref="name" type="text" v-model="name" required />
			</div>
			<div class="input-field with-label">
                <label>Total</label>
				<input type="url" v-model="url" required />
			</div>
			<div class="input-field with-label">
                <label>Symbol</label>
				<input type="number" v-model="funds" required />
			</div>
            <div class="input-field with-label">
                <label>Token Name</label>
				<input type="text" v-model="name" required />
			</div>
            <div class="input-field with-label">
                <label>URL</label>
				<input type="text" v-model="name" required />
			</div> -->
            <div class="input-field with-label">
                <label>Number of Tokens</label>
				<input type="number" v-model="No_Of_Tokens" required />
			</div>
			<button type="submit" class="btn btn-primary" value="Submit">
				<div v-if="!isLoading">Submit</div>
				<div v-else class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</button>
		</form>
	</section>	
</template>

<script>
export default {
	name: 'tokenCreation',
	data() {
		return {
			isLoading: false,
			No_Of_Tokens: null,
		}
	},
	methods: {
		async tokenCreation() {
			try {
				this.isLoading = true
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'Purchaser_Address' : this.$store.state.account,
						'No_Of_Tokens' : this.No_Of_Tokens,
					})
				}
				await fetch(this.$url+'/tokentransfer', post)
					.then(response => response.json())
					.then(
						this.$emit('popup', 'Tokens Deposited Successfully!', '', {timeout: 10000}),
						this.No_Of_Tokens = null
					)
			} catch(err) {
				this.$emit('popup', '', 'An error occurred while transferring tokens.')
				console.log(err)
			} 
			this.isLoading = false
		},
	},
}
</script>

<style scoped>
.split {
	align-items: center;
	grid-template-columns: 18.8% 1% 18.8%;
}
</style>