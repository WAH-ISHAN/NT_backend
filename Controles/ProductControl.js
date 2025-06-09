import Product from "../Models/ProductModel.js"

export async function CreateProduct(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.usertype != "admin"){
        res.status(403).json({
            message : "You are not authorized to create a product"
        })
        return;
    }

    const product = new Product(req.body);
    try{
        await product.save()
        res.json({
            message : "Product saved successfully"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message : "Product not saved"
        })
    }
    
}

export function getProducts(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Products not found"
            })
        }
    )
}
export async function getProductId(req, res) {
    const productId = req.params.id;
    console.log("Searching for productId:", productId);

    try {
        const product = await Product.findOne({ productId: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export function DeleteProduct(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to delete a product"
        })
        return;
    }

    Product.findOneAndDelete({
        productId : req.params.productId
    }).then(
        ()=>{
            res.json({
                message : "Product deleted successfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not deleted"
            })
        }
    )
}

export function UpdateProduct(req,res){
    if(req.user == null){
        res.status(403).json({
            message : "You need to login first"
        })
        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to update a product"
        })
        return;
    }

    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then(
        ()=>{
            res.json({
                message : "Product updated successfully"
            })
        }
    ).catch(
        (err)=>{
            res.status(500).json({
                message : "Product not updated"
            })
        }
    )
}
export async function searchProduct(req, res) {
	const search = req.params.id;
	try {
		const products = await Product.find({
			$or: [
				{ name: { $regex: search, $options: "i" } },
				{ altNames: { $elemMatch: { $regex: search, $options: "i" } } },
			],
		});
		res.json({
			products: products,
		});
	} catch (err) {
		res.status(500).json({
			message: "Error in searching product",
		});
		return;
	}
}