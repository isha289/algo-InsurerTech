<template>
	<div class="external" :class="{darken: this.pClass != ''}">
		<div ref="popup" class="popup" :class="pClass">
			<div class="header" v-show="message != ''">
				<i class="fas" :class="icon"></i>
				<span>{{ message }}</span>
			</div>
			<div class="description">{{ description }}</div>
			<div class="buttons">
				<button @click="pClass = ''" class="btn btn-primary okay">Okay</button>
			</div>
		</div>
		<transition
			name="home-router-view-transition"
			enter-active-class="animated fadeIn"
			leave-active-class="animated fadeOut"
			mode="out-in">
			<router-view @externalPopup="gotPopup" v-slot="{ Component }">
				<component ref="view" :is="Component" />
			</router-view>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			message: '',
			description: '',
			icon: '',
			pClass: ''
		}
	},
	methods: {
		gotPopup(message, description) {
			this.message = message
			this.description = description
			if(message != '') {
				this.icon = 'fa-check-circle'
			}
			this.pClass = 'pop'
		},
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

body {
	margin: 0;
	padding: 0;
}
table {
	width: 100%;
}
h2 {
	width: fit-content;
	font-weight: 600;
	margin: 0;
}
section {
	padding: 6.9rem 3rem 1.3rem 3rem;
	margin-left: 16rem;
}
form {
	margin: 2rem 0;
	box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.4);
	padding: 2rem;
	border-radius: 1rem;
}
input[type=text],
input[type=email],
input[type=number],
input[type=password],
input[type=date],
input[type=url],
input[type=datetime-local],
textarea {
	border-radius: 5px;
	width: 70%;
	padding: 10px;
	margin: 5px 0 22px 0;
	border: none;
	color: black;
	background: #f1f1f1;
	opacity: 0.9;
	text-align: left;
}
input[type=text]:focus,
input[type=email]:focus,
input[type=number]:focus,
input[type=password]:focus,
input[type=date]:focus,
input[type=url]:focus,
input[type=datetime-local]:focus,
textarea:focus {
	background-color: #ddd;
	outline: none;
}
.input-field {
	padding-top: 5px;
	position: relative;

	.error {
		border: 1px solid red;
	}
	
	.error-message {
		position: absolute;
		bottom: -0.2rem;
		font-size: 0.8rem;
		color: red;
	}
}

.with-label {
	display: grid;
    grid-template-columns: 40%;
    justify-content: center;
    text-align: left;
	label {
		margin: 0;
	}
	input {
		width: 100%;
		position: relative;
	} 
}

.data {
	word-break: break-word;
	text-align: left;
	vertical-align: inherit;
	padding: 0.5rem 0;
}
.heading {
	text-align: left;
	font-weight: 600;
}
.center {
	text-align: center;
}

.form-brand {
	margin: 0 !important;
	padding: 1rem 4rem;
	width: 70%;
	background-color: navy;
	color: white;
	border-radius: 1rem;
	z-index: 1;
}
.signup-form, .login-form {
	width: 70%;
	margin: 0;
	border: 5px solid navy;
	border-top-color: transparent;
	box-shadow: none;
	padding: 2rem 4rem;
	position: relative;
	top: -1rem;
	border-radius: 0 0 2rem 2rem;

	.split {
		justify-content: space-around;
		align-items: left;
	}

	input {
		width: 70%;
		margin-bottom: 15px;
	}
}

.popup {
	position: fixed;
	right: 50%;
	top: 50%;
	transform: translate(50%, -100%) scale(0.9);
	padding: 1rem;
	background-color: white;
	border-radius: 0.5rem;
	opacity: 0;
	z-index: -1;
	text-align: left;
	max-width: 28rem;
	min-width: 18rem;
	word-break: break-word;
	box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.2), 0 9px 46px 8px rgba(0, 0, 0, 0.2);
	transition: all 300ms ease-in-out;
	
	.header {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.description {
		margin-bottom: 1rem;
	}

	.address {
		width: 100%;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		grid-gap: 1rem;
	}

	i {
		margin-right: 0.5rem;
		color: black;
	}
}
.pop {
	transform: translate(50%, -100%) scale(1);
	opacity: 1;
	z-index: 10;
	pointer-events: all;
}

.main {
	display: grid;
	grid-auto-flow: column;
	height: 100vh;
}
.darken {
	background-color: rgba(0, 0, 0, 0.3);
	pointer-events: none;
	z-index: 9;
}

.btn {
	width: 7rem;
}

.split {
	display: grid;
	grid-auto-flow: column;
    grid-template-columns: 48.5% 48.5%;
	grid-gap: 1rem;
	margin-bottom: 2rem;

	input {
		width: 100%;
	}

	.with-label {
		grid-template-columns: 100%;
	}
}

.address {
	width: 8rem;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: initial;
	transition: all 750ms ease-in-out;

	&:hover {
		width: 20rem;
		word-wrap: break-word;
	}
}

.section-head {
	display: flex;
	justify-content: space-between;
}

/* Loading spinner */
.lds-ring {
	display: inline-flex;
	position: relative;
	width: 48px;
	transform: scale(0.4);
	bottom: 6px;
	align-items: center;
	justify-content: center;
}
.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 64px;
	height: 64px;
	margin: 8px;
	border: 8px solid #fff;
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}
@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

// Scroll bar styling
/* width */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
