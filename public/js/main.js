var app = new Vue({
    el: '#main-content',
    data: {
      allUsers: true,
      allCars: true 
    },
    methods:{
        userHandler(){
            this.allUsers = !this.allUsers
        },
        carHandler(){
            this.allCars = !this.allCars
        }
    }
  })