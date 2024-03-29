import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormComponent"
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    if (!shippingAddress) {
        navigate("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal" name="paymentMethod"
                            value="PayPal" checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>

                        {/* adding another payment method for future */}
                        {/* <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe" name="paymentMethod"
                            value="Stripe" checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen