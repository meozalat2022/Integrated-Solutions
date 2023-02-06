class Product {
    constructor(id, categoryId, brandId, title, description, price, imageUrl, promotionRate, hasPromotion){
        this.id = id;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.promotionRate = promotionRate;
        this.hasPromotion = hasPromotion;
    }
}

export default Product;