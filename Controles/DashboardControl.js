
import User from "../Models/UserModel.js";
import Order from "../Models/OrderModel.js";
import Product from "../Models/ProductModel.js";


export async function getDashboardStats(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.usertype !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
   
    const totalUsersPromise = User.countDocuments();

   
    const totalProductsPromise = Product.countDocuments();

    
    const pendingOrdersPromise = Order.countDocuments({ status: "Pending" });
    const completedOrdersPromise = Order.countDocuments({ status: "Completed" });

   
    const ordersByDatePromise = Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

  
    const [totalUsers, totalProducts, pendingOrders, completedOrders, ordersByDateRaw] =
      await Promise.all([
        totalUsersPromise,
        totalProductsPromise,
        pendingOrdersPromise,
        completedOrdersPromise,
        ordersByDatePromise,
      ]);

   
    const chartData = ordersByDateRaw.map((doc) => ({
      date: doc._id, 
      orders: doc.count,
    }));

    res.json({
      totalUsers,
      totalProducts,
      pendingOrders,
      completedOrders,
      newOrders: pendingOrders,
      chartData,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
}
