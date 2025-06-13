import Order from "../Models/OrderModel.js";
import Product from "../Models/ProductModel.js";

export async function CreateOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const body = req.body;


  if (!body.phone || !body.address) {
    return res.status(400).json({ message: "Phone and address are required." });
  }

  const orderData = {
    orderId: "",
    email: req.user.email,
    name: body.name,
    phone: body.phone,
    address: body.address,
    billItems: [],
    total: 0,
    status: "Pending", 
  };

  try {
   
    const lastBills = await Order.find().sort({ date: -1 }).limit(1);
    if (lastBills.length === 0) {
      orderData.orderId = "ORDER0001";
    } else {
      const lastOrderId = lastBills[0].orderId;
      const lastOrderNumber = parseInt(lastOrderId.replace("ORDER", ""), 10);
      const newOrderNumberStr = (lastOrderNumber + 1).toString().padStart(4, "0");
      orderData.orderId = "ORDER" + newOrderNumberStr;
    }

   
    for (let i = 0; i < body.billItems.length; i++) {
      const { productId, quantity } = body.billItems[i];
      const product = await Product.findOne({ productId });
      if (!product) {
        return res.status(404).json({ message: `Product with product id ${productId} not found` });
      }
      orderData.billItems.push({
        productId: product.productId,
        productName: product.name,
        image: product.images[0],
        quantity,
        price: product.price,
      });
      orderData.total += product.price * quantity;
    }

    const order = new Order(orderData);
    await order.save();

    res.json({ message: "Order saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order not saved" });
  }
}

export async function GetOrders(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let orders;
    if (req.user.usertype === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ email: req.user.email });
    }
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Orders not found" });
  }
}

export async function UpdateOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.usertype !== "admin") {
    return res.status(403).json({ message: "You are not authorized to update an order" });
  }

  try {
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findOneAndUpdate({ orderId }, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order not updated" });
  }
}


export async function CompleteOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.usertype !== "admin") {
    return res.status(403).json({ message: "You are not authorized to complete orders" });
  }

  try {
    const orderId = req.params.orderId;
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status: "Completed" },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order marked as completed", order: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to complete order" });
  }
}


export async function DeleteOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.usertype  !== "admin") {
    return res.status(403).json({ message: "You are not authorized to delete orders" });
  }

  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findOneAndDelete({ orderId });
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
}