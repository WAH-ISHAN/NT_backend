import Order from "../Models/OrderModel.js";
import Product from "../Models/ProductModel.js"

export async function CreateOrder(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	const body = req.body;
	const orderData = {
		orderId: "",
		email: req.user.email,
		name: body.name,
		phoneNumber: body.phoneNumber,
		billItems: [],
		total: 0,
	};
	Order.find()
		.sort({
			date: -1,
		})
		.limit(1)
		.then(async (lastBills) => {
			if (lastBills.length == 0) {
				orderData.orderId = "ORDER0001";
			} else {
				const lastBill = lastBills[0];
				const lastOrderId = lastBill.orderId; 
				const lastOrderNumber = lastOrderId.replace("ORDER", ""); 
				const lastOrderNumberInt = parseInt(lastOrderNumber);
				const newOrderNumberInt = lastOrderNumberInt + 1;
				const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0"); 
				orderData.orderId = "ORDER" + newOrderNumberStr;
			}

			for (let i = 0; i < body.billItems.length; i++) {
				const product = await Product.findOne({
					productId: body.billItems[i].productId,
				});
				if (product == null) {
					res.status(404).json({
						message:
							"Product with product id " +
							body.billItems[i].productId +
							" not found",
					});
					return;
				}
				

				orderData.billItems[i] = {
                    productId : product.productId,
                    productName : product.name,
                    image : product.images[0],
                    quantity : body.billItems[i].quantity,
                    price : product.price
                };
                orderData.total = orderData.total + product.price * body.billItems[i].quantity
			}

			const order = new Order(orderData);

			order
				.save()
				.then(() => {
					res.json({
						message: "Order saved successfully",
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(500).json({
						message: "Order not saved",
					});
				});
		});
}

export function GetOrders(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	if (req.user.role == "admin") {
		Order.find()
			.then((orders) => {
				res.json(orders);
			})
			.catch((err) => {
				res.status(500).json({
					message: "Orders not found",
				});
			});
	} else {
		Order.find({
			email: req.user.email,
		})
			.then((orders) => {
				res.json(orders);
			})
			.catch((err) => {
				res.status(500).json({
					message: "Orders not found",
				});
			});
	}
}

export async function UpdateOrder(req,res){
	try{
		if(req.user == null){
			res.status(401).json({
				message : "Unauthorized"
			})
			return
		}

		if(req.user.role != "admin"){
			res.status(403).json({
				message : "You are not authorized to update an order"
			})
			return
		}

		const orderId = req.params.orderId
		const order = await Order.findOneAndUpdate({orderId : orderId},req.body)

		res.json({
			message : "Order updated successfully"
		})
	}catch(err){
		res.status(500).json({
			message : "Order not updated"
		})
	}
}
