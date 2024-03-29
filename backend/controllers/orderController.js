import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @desc    create new order
// @route   POST /api/order
// @access  protected
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @desc    GET order by ID
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user","name email")

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }

})

// @desc    Update order to paid
// @route   GET /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
          }

        const updateOrder = await order.save()

        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }

})

// @desc    Update order to delivered
// @route   GET /api/order/:id/deliver
// @access  Private Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updateOrder = await order.save()

        res.json(updateOrder)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }

})

// @desc    get logged in user orders
// @route   GET /api/order/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    console.log(req.user)
    const order = await Order.find({user:req.user._id})
    res.json(order)
})

// @desc    Get all order
// @route   GET /api/order
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    console.log(req.user)
    const order = await Order.find({}).populate("user","id name")
    res.json(order)
})


export { addOrderItems,getOrderById,updateOrderToDelivered,updateOrderToPaid,getMyOrders,getOrders }