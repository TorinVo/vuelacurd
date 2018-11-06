<template>
    <div class="api-calling">
        <div class="error" v-if="errors.length">
            <span v-for="err in errors">
                {{ err }}
            </span>
            <hr>
        </div>
        <div class="create-form">
            <div class="product-name-input form-group">
                <input class="form-control" type="text" v-model="product.name">
            </div>
            <div class="product-name-input form-group">
                <input class="form-control" type="text" v-model.number="product.price">
            </div>
            <div class="button-create form-group">
                <button class="btn btn-primary" @click="createProduct">Create</button>
            </div>
        </div>
        <hr>
        <div class="list-products">
            <h2>LIST PRODUCT</h2>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#create-item">
                Tạo sản phẩm mới
            </button>
            <div class="product-table">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prod, index) in list_products">
                            <td>{{ prod.id }}</td>
                            <td v-if="!prod.isEdit">
                                {{ prod.name }}
                            </td>
                            <td v-else>
                                <input type="text" class="form-control" v-model="prod.name">
                            </td>
                            <td v-if="!prod.isEdit">
                                {{ prod.price }}
                            </td>
                            <td v-else>
                                <input type="text" class="form-control" v-model.number="prod.price">
                            </td>
                            <td>{{ prod.created_at }}</td>
                            <td v-if="!prod.isEdit">
                                <button class="btn btn-success" @click="prod.isEdit = true">Edit</button>
                                <button class="btn btn-danger" @click="deleteProduct(prod, index)">Delete</button>
                            </td>
                            <td v-else>
                                <button class="btn btn-primary" @click="updateProduct(prod)">Save</button>
                                <button class="btn btn-danger" @click="prod.isEdit = false">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Pagination -->
                <nav>
                    <ul class="pagination">
                        <li v-if="pagination.current_page > 1">
                            <a href="#" aria-label="Previous"
                               @click.prevent="changePage(pagination.current_page - 1)">
                                <span aria-hidden="true">«</span>
                            </a>
                        </li>
                        <li v-for="page in pagesNumber"
                            v-bind:class="[ page == isActived ? 'active' : '']">
                            <a href="#"
                               @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li v-if="pagination.current_page < pagination.last_page">
                            <a href="#" aria-label="Next"
                               @click.prevent="changePage(pagination.current_page + 1)">
                                <span aria-hidden="true">»</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

		<!-- Create Item Modal -->
        <div class="modal fade" id="create-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">Tạo sản phẩm mới</h4>
                    </div>
                    <div class="modal-body">
                        <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="createProduct">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" name="name" class="form-control" v-model="product.name" />
                                <span v-if="formErrors['name']" class="error text-danger">{{ formErrors['name'] }}</span>
                            </div>

                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="text" name="price" class="form-control" v-model="product.price" />
                                <span v-if="formErrors['price']" class="error text-danger">{{ formErrors['price'] }}</span>
                            </div>

                            <div class="form-group">
                                <label for="content">Content:</label>
                                <textarea name="content" class="form-control" v-model="product.content"></textarea>
                                <span v-if="formErrors['content']" class="error text-danger">{{ formErrors['content'] }}</span>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-success" >Tạo sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Item Modal -->
        <div class="modal fade" id="edit-item" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title" id="myModalLabel">Chỉnh sửa sản phẩm</h4>
                    </div>
                    <div class="modal-body">
                        <form method="POST" enctype="multipart/form-data" v-on:submit.prevent="updateItem(fillItem.id)">
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" name="name" class="form-control" v-model="fillItem.name" />
                                <span v-if="formErrorsUpdate['name']" class="error text-danger">@{{ formErrorsUpdate['name'][0] }}</span>
                            </div>

                            <div class="form-group">
                                <label for="price">Price:</label>
                                <input type="text" name="price" class="form-control" v-model="fillItem.price" />
                                <span v-if="formErrorsUpdate['price']" class="error text-danger">{{ formErrorsUpdate['price'] }}</span>
                            </div>

                            <div class="form-group">
                                <label for="content">Content:</label>
                                <textarea name="content" class="form-control" v-model="fillItem.content"></textarea>
                                <span v-if="formErrorsUpdate['content']" class="error text-danger">{{ formErrorsUpdate['content'] }}</span>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-success">Cập nhật sản phẩm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        data() {
            return {
            	items: [],
                product: {
                    name: '',
                    price: 0
                },
                pagination: {
		            total: 0, 
		            per_page: 2,
		            from: 1, 
		            to: 0,
		            current_page: 1
		        },
		        offset: 4,
		        formErrors:{},
        		formErrorsUpdate:{},
                errors: [],
                list_products: [],
                fillItem : {'name':'','price':'','content':'','id':''}
            }
        },
        created() {
            this.getListProducts(this.pagination.current_page)
        },
        methods: {
            formatDate(d) {
                var dformat = [ d.getFullYear(), (d.getMonth()+1),
                    d.getDate()
                    ].join('/')+
                    ' ' +
                  [ d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
                    return dformat
            },
            createProduct() {
                this.errors = []
                axios.post('/products', {name: this.product.name, price: this.product.price})
                .then(response => {
                	this.changePage(this.pagination.current_page);
                	this.newItem = {'name':'','price':'','content':''};
                	$("#create-item").modal('hide');
                    // console.log(response.data.result)
                    // this.list_products.push({
                    //     id: this.list_products.length + 1,
                    //     name: this.product.name,
                    //     price: this.product.price,
                    //     created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    //     isEdit: false
                    // })
                })
                .catch(error => {
                	console.log(error.response.data.errors);
                    this.errors = []
					if(error.response.data.errors.name) {
						this.errors.push(error.response.data.errors.name)
					}
					if(error.response.data.errors.price) {
						this.errors.push(error.response.data.errors.price)
					}
					this.formErrors = error.response.data.errors;
                })
            },
            getListProducts(page) {
                axios.get('/products?page='+page)
                .then(response => {
                	console.log(response.data.data);
                    this.list_products = response.data.data.data
                    this.pagination = response.data.pagination
                    // this.list_products.forEach(item => {
                    //     Vue.set(item, 'isEdit', false)
                    // })
                })
                .catch(error => {
                    this.errors = error.response.data.errors.name
                })
            },
            updateProduct(product) {
                axios.put('/products/' + product.id, {name: product.name, price: product.price})
                .then(response => {
                    console.log(response.data.result)
                    product.isEdit = false
                })
                .catch(error => {
                    this.errors = error.response.data.errors.name
                })
            },
            deleteProduct(product, index) {
                axios.delete('/products/' + product.id)
                .then(response => {
                    console.log(response.data.result)
                    this.list_products.splice(index, 1)
                })
                .catch(error => {
                    this.errors = error.response.data.errors.name
                })
            },
            changePage: function (page) {
	            this.pagination.current_page = page;
	            this.getListProducts(page);
	        }
        },
        computed: {
	        isActived: function () {
	            return this.pagination.current_page;
	        },
	        pagesNumber: function () {
	            if (!this.pagination.to) {
	                return [];
	            }
	            var from = this.pagination.current_page - this.offset;
	            if (from < 1) {
	                from = 1;
	            }
	            var to = from + (this.offset * 2);
	            if (to >= this.pagination.last_page) {
	                to = this.pagination.last_page;
	            }
	            var pagesArray = [];
	            while (from <= to) {
	                pagesArray.push(from);
	                from++;
	            }
	            return pagesArray;
	        }
	    }
    }
</script>

<style lang="scss" scoped>
.error {
    span {
        color: red;
    }
}
</style>