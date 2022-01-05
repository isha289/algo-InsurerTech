import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)

// global properties
app.config.globalProperties.$url = 'http://3.111.36.254:5000'
app.config.globalProperties.$platformAdmin = 'insurertech@gmail.com'

// mount the final app
app.mount('#app')

/*
CREDENTIALS

TOKENS DISPENSER ACCOUNT
insurertechone@gmail.com - VTTHAYLWHJP2ONBXE4FW2B4VGWL73G64YZMUQM6KLXU2CACRL6RUY646NU
qwerty

PLATFORM LOGIN
insurertech@gmail.com - IXCMWZVKABBNHJPBVVKSXYIRG3RWGMMAONGGI35K4OWU36FV2KDLHSMTJ4
qwerty

USERS
ONE
insurerone@gmail.com - VCQAFXKZRK2JFJIT5SEO36442U6VVKOIBT73NJ6IUUEDV42ACXKKTS5AJU
qwerty

TWO
insurertwo@gmail.com - LMKTBN2BAW32YNVHFDZZ4XFNGBZCLDBVIR6L5UGAJ6HFN7WYXOB7LV2UMY
qwerty

THREE
insurerthree@gmail.com - B3LKFOQC6V3EWXSQTSZEWK6YO4II74XBSSQ742HHLK64OIT4SPSVXESZSU
qwerty
*/