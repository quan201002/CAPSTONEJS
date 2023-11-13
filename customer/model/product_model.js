export class ProductModel{
    constructor({name, price, id, img, desc, screen, type, frontCamera, backCamera}){
        this.id = id
        this.name = name
        this.price = price
        this.img = img
        this.desc = desc
        this.screen = screen
        this.type = type
        this.frontCamera = frontCamera
        this.backCamera = backCamera
    }
}