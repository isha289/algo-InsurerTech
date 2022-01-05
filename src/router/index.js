import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import FundProject from '../components/FundProject.vue'
import FacOffer from '../components/FacOffer.vue'
import FacOfferList from '../components/FacOfferList.vue'
import TokenCreation from '../components/TokenCreation.vue'
import RedeemCredits from '../components/RedeemCredits.vue'
import FacAcceptList from '../components/FacAcceptList.vue'
import FacAccept from '../components/FacAccept.vue'
import ViewFACOffers from '../components/ViewFACOffers.vue'

const routes = [{
        path: '/',
        name: 'Main',
        redirect: '/login',
        component: Main,
        meta: { requiresAuth: true, loading: true },
        children: [{
                path: '/fund-project',
                name: 'FundProject',
                component: FundProject,
                // add component methodName here to call from the parent
                meta: {
                    confirm: { methodName: 'confirmOrders' },
                }
            },
            {
                path: '/insureroffer',
                name: 'FacOfferList',
                component: FacOfferList,
            },
            {
                path: '/facoffercreation',
                name: 'FacOffer',
                component: FacOffer,
            },
            {
                path: '/facaceptlist',
                name: 'FacAcceptList',
                component: FacAcceptList,
            },
            {
                path: '/fac-accept',
                name: 'FacAccept',
                component: FacAccept,
            },
            {
                path: '/get-credits',
                name: 'TokenCreation',
                component: TokenCreation,
            },
            {
                path: '/tokenredeem',
                name: '/RedeemCredits',
                component: RedeemCredits,
            },
            {
                path: '/view-fac-offers',
                name: '/ViewFACOffers',
                component: ViewFACOffers,
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const loading = to.matched.some(record => record.meta.loading);

    if (store.state.account.length === 0 && loading) { // No account signed in and page is loded
        next('/login')
    } else if (store.state.account.length !== 0 && requiresAuth) { // Account is logged in and it requires authorization
        if(from.path === '/') { // if user types a custom route in the URL or reloads the page
            if(store.state.pa === 'true') { // if the logged in account is of Platform Admin (PA)
                if(to.path === '/fund-project' || to.path === '/insureoffer' || to.path === '/facoffercreation' || to.path === '/facacceptlist' || to.path === '/fac-accept' || to.path === '/get-credits' || to.path === '/tokenredeem') { // Platform admin does not have access to these routes so go to login
                    next('/login')
                } else { // otherwise next page
                    next()
                }
            } else if(to.path === '/view-fac-offers') { // if Platform User (PU) logs in and navigates to unauthorized path then go to login
                next('/login')
            } else { // if PU logs in and goes to any other path then it is allowed
                next()
            }
        } else { // if all conditions fail then go to the next route
            next()
        }
    } else { // if all conditions fail then go to the next route
        next()
    }
})

export default router