<template>
	<section id="fac-offer"> 
		<div class="section-head">
			<h2>FAC Offer</h2>
		</div>
		<form @submit.prevent="facOffer">
            <div class = "split">               
                <div class="input-field with-label">
                    <label>Policy Number</label>
                    <input type="number" v-model="PolicyNo" required />
                </div>
                <div class="input-field with-label">
                    <label>Product ID</label>
                    <input type="number" v-model="ProductID" required />
                </div>
                <div class="input-field with-label">
                    <label>Product Name</label>
                    <input type="text" v-model="Product_Name" required />
                </div>
            </div>  
            <div class = "split">
                <div class="input-field with-label">
                    <label>Total SI</label>
                    <input type="number" :class="{error: checkTotalValues !== ''}" v-model="Total_SI" required />
                </div>
				<div class="input-field with-label">
                    <label>Total Premium</label>
                    <input type="number" :class="{error: checkTotalValues !== ''}" v-model="Total_Premium" required />
					<span class="error-message">{{checkTotalValues}}</span>
                </div>
                <div class="input-field with-label">
                    <label>FAC SI</label>
                    <input type="number" :class="{error: checkFAC_Values !== ''}" v-model="FAC_SI" required />
                </div>
				<div class="input-field with-label">
                    <label>FAC Premium</label>
                    <input type="number" :class="{error: checkFAC_Values !== ''}" v-model="FAC_Premium" required />
					<span class="error-message">{{checkFAC_Values}}</span>
                </div>
            </div>
            <div class = "split">
                <div class="input-field with-label">
                    <label>ReInsurer1</label>
                    <input type="email" v-model="Reinsurer1_Email" required />
                </div>
                <div class="input-field with-label">
                    <label>ReInsurer1 Percent(%)</label>
                    <input type="number" step="0.01" v-model="ReInsurer1_Percent" required />
                </div>
                <div class="input-field with-label">
                    <label>ReInsurer2</label>
                    <input type="email" v-model="Reinsurer2_Email" />
                </div>
                <div class="input-field with-label">
                    <label>ReInsurer2 Percent(%)</label>
                    <input type="number" step="0.01" v-model="ReInsurer2_Percent"  />
                </div>
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
	name: 'facOffer',
	data() {
		return {
			isLoading: false,
			PolicyNo: null,
			ProductID: null,
			Product_Name: '',
			Total_SI: null,
			Total_Premium: null,
			FAC_SI: null,
			FAC_Premium: null,
			Reinsurer1_Email: '',
			ReInsurer1_Percent: null,
			Reinsurer2_Email: '',
			ReInsurer2_Percent: null,
		}
	},
	methods: {
		async facOffer() {
			try {
				if(this.checkTotalValues === '' && this.checkFAC_Values === '') {
					this.isLoading = true
					let post = {
						mode: 'cors',
						method: 'POST',
						headers: { 'Content-Type': 'application/json; charset=UTF-8' },
						body: JSON.stringify({
							'Insurer_Address' : this.$store.state.account,
							'Reinsurer1_Email' : this.Reinsurer1_Email,
							'Reinsurer2_Email' : this.Reinsurer2_Email,
							'PolicyNo' : this.PolicyNo, 
							'ProductID' : this.ProductID,
							'Product_Name' : this.Product_Name,
							'Total_SI' : this.Total_SI,
							'Total_Premium' : this.Total_Premium,
							'FAC_SI' : this.FAC_SI,
							'FAC_Premium' : this.FAC_Premium,
							'ReInsurer1_Percent' : this.ReInsurer1_Percent,
							'ReInsurer2_Percent' : this.ReInsurer2_Percent,
							
						})
					}
					await fetch(this.$url+'/facoffercreation', post)
						.then(response => response.json())
						.then(data => {
							this.$emit('popup', 'FAC Offer created successfully!', 'Your FAC Offer ID is '+data.appID)
							this.PolicyNo = ''
							this.ProductID = ''
							this.Product_Name = ''
							this.Total_SI = ''
							this.Total_Premium = ''
							this.FAC_SI = ''
							this.FAC_Premium = ''
							this.ReInsurer1_Percent = ''
							this.ReInsurer2_Percent = ''
						})
				}
			} catch(err) {
				this.$emit('popup', '', 'An error occurred while creating your order.')
				console.log(err)
			} 
			this.isLoading = false
		}
	},
	computed:{
		checkTotalValues(){
			if(this.Total_SI < this.Total_Premium){
				return 'Total SI should be greater than Total Premium'
			}
			return ''
		},
		checkFAC_Values(){
			if(this.FAC_SI < this.FAC_Premium){
				return 'FAC SI should be greater than FAC Premium'
			}
			return ''
		}
	},
}
</script>

<style scoped>
.split {
	align-items: center;
	grid-template-columns: auto;
}
</style>