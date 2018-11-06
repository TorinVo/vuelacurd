<template>
    <div class="list-rendering">
        <ul>
            <li v-for="food in foods">{{ food.name }}</li>
        </ul>
        <hr>
        <ul>
            <li v-for="item of myInfo">
                {{ item }}
            </li>
        </ul>
        <hr>
        <ul>
            <li v-for="(value, key) of myInfo">
                {{ key }} : {{ value }}
            </li>
        </ul>
        <hr>
        <ul>
            <li v-for="todo in listCompleteTodo">
              {{ todo.name }} - {{ todo.isComplete }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myInfo: {
                    name: 'Mai Trung Duc',
                    age: '2x',
                    country: 'vietnam'
                },
                foods: [
                    { name: 'Hamburger' },
                    { name: 'Sandwich' },
                    { name: 'Chicken chop' },
                ],
                todos: [
                    {
                        name: 'to do 1',
                        isComplete: true
                    },
                    {
                        name: 'to do 2',
                        isComplete: false
                    },
                    {
                        name: 'to do 3',
                        isComplete: true
                    },
                ]
            }
        },
        computed: {
            listCompleteTodo() {
                return this.todos.filter(item => item.isComplete)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>