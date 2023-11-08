class CartItemModel{
    constructor({name, price, id, img, quantity}){
        this.id = id
        this.name = name
        this.price = price
        this.img = img
        this.quantity = quantity
    }

    totalPrice(){
        return parseFloat(this.price) * parseInt(this.quantity)
    }
    
}