<template>
    <div class="user-dashboard">
        <div class="list-user-comp">
            <h4>List User <p ref="dom-element">{{counter}}</p></h4>
            <!-- Listen event 'userSelected' emitted from child and process it using 'childrenSelectUser' -->
            <ListUser @userSelected="childrenSelectUser('test', ...arguments)"></ListUser>
        </div>
        <hr>
        <div class="user-detail-comp">
            <h4>User Detail</h4>
            <!-- pass 'userSelectedFromChild', child will use props 'userDetailInfo' -->
            <UserDetail :userDetailInfo="userSelectedFromChild"></UserDetail>
        </div>
        <hr>
        <div>
        <div>
            Name: {{ conguoi.name }}
        </div>
        <div>
            Nick name: {{ conguoi.nickname }}
        </div>
        <div>
            <button @click="changeName">Change Name</button>
        </div>
        <div>
            <button @click="changeNickname">Change Nick Name</button>
        </div>
        <div>
            <button @click="changeNicknameProperly">Change NIck name properly</button>
        </div>
    </div>
    </div>
</template>

<script>
    import ListUser from './ListUser.vue'
    import UserDetail from './UserDetail.vue'
    export default {
        components: {
            ListUser,
            UserDetail
        },
        data() {
            return {
                userSelectedFromChild: {},
                counter: 0,
                auto: '',
                conguoi: {
                    name: 'Edson'
                }
            }
        },
        methods: {
            // Process event emitted from child
            childrenSelectUser(text, user, number, string) {
            	console.log(text)
                console.log(user)
                console.log(number)
        		console.log(string)
                this.userSelectedFromChild = user
            },
            changeName() {
                this.conguoi.name = 'Arantes';
            },
            changeNickname() {
                this.conguoi.nickname = Math.random().toString(36).substring(7);
                this.$forceUpdate()
            },
            changeNicknameProperly() {
                Vue.set(this.conguoi, 'nickname', 'Louis');
            }
        },
        beforeCreate() {
            
        },
        created() {
            // this.auto = setInterval(() => {
            //   this.counter++
            // }, 1000)
        },
        beforeMount() {
            console.log(this)
        },
        mounted() {
            console.log(this.$el)
            console.log(document.getElementsByClassName('panel-heading').innerHTML);
        },
        beforeUpdate() {
            console.log(this.counter) // Logs the counter value every second, before the DOM updates.
        },
        updated() {
            // Fired every second, should always be true
           // console.log(+this.$refs['dom-element'].textContent === this.counter)
            //if(this.counter == 10) clearInterval(this.auto);
        },
        beforeDestroy() {
            console.log('beforeDestroy');
        },
        destroyed() {
            console.log('destroyed');
        }
    }
</script>

<style lang="scss" scoped>
</style>