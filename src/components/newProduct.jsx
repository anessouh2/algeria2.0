import '../styles/newProduct.css'
import { useState } from 'react'

export default function Newproduct({ onBack }) {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        farmerName: '',
        quantity: '',
        unitPrice: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form Data:', formData)
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
                            <label htmlFor='productName'>Product Name:</label>
                            <input
                                type='text'
                                id='productName'
                                name='productName'
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder='Enter the name of the product'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='category'>category:</label>
                            <input
                                type='text'
                                id='category'
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                placeholder='Enter category'
                                required
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
                            <label htmlFor='farmerName'>Farmer Name:</label>
                            <input
                                type='text'
                                id='farmerName'
                                name='farmerName'
                                value={formData.farmerName}
                                onChange={handleChange}
                                placeholder='Enter Your full name'
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
                            <label htmlFor='unitPrice'>Unit price:</label>
                            <input
                                type='number'
                                id='unitPrice'
                                name='unitPrice'
                                value={formData.unitPrice}
                                onChange={handleChange}
                                placeholder='Enter the price per 1kg'
                                min='0'
                                step='0.01'
                                required
                            />
                        </div>
                        <button type='submit' className='publish-button'>
                            Publish product
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}