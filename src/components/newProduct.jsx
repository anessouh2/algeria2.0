import '../styles/newProduct.css'
import { useState } from 'react'
import { farmerAPI } from '../api'

export default function Newproduct({ onBack }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        quantity: '0',
        unit_price: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        // Prepare data for backend - only include fields that match the model
        const productData = {
            name: formData.name,
            description: formData.description,
            unit_price: parseFloat(formData.unit_price),
            quantity: parseFloat(formData.quantity) || 0,
            unit: 'kg',
            is_active: true
        }
        
        // Only add category if it's a valid number
        if (formData.category && !isNaN(formData.category)) {
            productData.category = parseInt(formData.category)
        }
        
        try {
            console.log('Submitting product data:', productData)
            const response = await farmerAPI.addProduct(productData)
            console.log('Product added successfully:', response.data)
            setSuccess('✓ Product added successfully!')
            setFormData({
                name: '',
                category: '',
                description: '',
                quantity: '0',
                unit_price: ''
            })
            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(''), 5000)
        } catch (err) {
            let errorMsg = 'Failed to add product. Please try again.'
            
            if (err.response?.data) {
                const errorData = err.response.data
                if (typeof errorData === 'object') {
                    // Extract field-specific errors
                    const errors = Object.entries(errorData)
                        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                        .join('; ')
                    errorMsg = errors || errorMsg
                } else if (typeof errorData === 'string') {
                    errorMsg = errorData
                } else if (errorData.detail) {
                    errorMsg = errorData.detail
                }
            }
            
            setError(errorMsg)
            console.error('Add product error:', err.response?.data)
            // Clear error message after 8 seconds
            setTimeout(() => setError(''), 8000)
        }
    }

    const handleBack = () => {
        if (onBack) {
            onBack()
        } else {
            window.history.back()
        }
    }

    return(
        <section className='new-product'>
            <div className='new-product-container'>
                <div className='new-product-left'>
                    <div className='left-content'>
                        <h1>List Your Harvest</h1>
                        <p>Fill in the details below to get your products in front of ready to buy businesses. The more accurate your listing, the faster it will sell.</p>
                    </div>
                </div>
                <div className='new-product-right'>
                    <button className='plus-icon' onClick={handleBack}>
                        ⇽
                    </button>
                    <form className='product-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Product Name:</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='Enter the name of the product'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='category'>Category (optional):</label>
                            <input
                                type='text'
                                id='category'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description:</label>
                            <textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Enter product description'
                                rows='4'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='quantity'>Quantity:</label>
                            <input
                                type='number'
                                id='quantity'
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder='Enter the available quantity'
                                min='0'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='unit_price'>Unit price:</label>
                            <input
                                type='number'
                                id='unit_price'
                                name='unit_price'
                                value={formData.unit_price}
                                onChange={handleChange}
                                placeholder='Enter the price per unit'
                                min='0'
                                step='0.01'
                                required
                            />
                        </div>
                        {error && (
                            <div className="error-message">
                                <p className="error">{error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="success-message">
                                <p className="success">{success}</p>
                            </div>
                        )}
                        <button type='submit' className='publish-button'>
                            Publish product
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}