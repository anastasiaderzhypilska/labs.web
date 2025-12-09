import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './checkout.css';

function Checkout() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/, 'First name can only contain letters, spaces, hyphens and apostrophes')
      .required('First name is required'),
    
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/, 'Last name can only contain letters, spaces, hyphens and apostrophes')
      .required('Last name is required'),
    
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must be valid (e.g., user@example.com)')
      .required('Email is required'),
    
    phone: Yup.string()
      .matches(/^\+?\d{10,15}$/, 'Phone number must be 10-15 digits, can start with +')
      .required('Phone number is required'),
    
    address: Yup.string()
      .min(5, 'Address must be at least 5 characters')
      .max(200, 'Address must be less than 200 characters')
      .matches(/^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9\s,.-]+$/, 'Address can only contain letters, numbers, spaces, commas, dots and hyphens')
      .required('Address is required'),
    
    city: Yup.string()
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City must be less than 50 characters')
      .required('City is required'),
    
    zipCode: Yup.string()
      .matches(/^\d{5}(?:[-\s]\d{4})?$/, 'ZIP code must be 5 digits, optionally followed by -1234')
      .required('ZIP code is required')
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form submitted:', values);
    localStorage.setItem('checkoutData', JSON.stringify(values));
    
    setTimeout(() => {
      setSubmitting(false);
      navigate('/success');
    }, 1000);
  };

  return (
    <div className="checkout-wrapper">
      {/**/}
      <div className="checkout-header-top">
        <div className="header-content">
          <div className="logo">
            <Link to="/" style={{ marginLeft: '0', paddingLeft: '0' }}>Zoo Portal</Link>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/about">About</Link>
            <Link to="/cart">Cart (1)</Link>
          </nav>
        </div>
      </div>
      
      {/* Форма */}
      <div className="checkout-container">
        <div className="checkout-form-header">
          <h1>Checkout</h1>
          <p>Please fill in your details to complete the order</p>
        </div>

        <div className="checkout-content">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="checkout-form">
                <div className="form-section">
                  <h2>Personal Information</h2>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <Field 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        className={errors.firstName && touched.firstName ? 'error' : ''}
                      />
                      <ErrorMessage name="firstName" component={ErrorDisplay} />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <Field 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        className={errors.lastName && touched.lastName ? 'error' : ''}
                      />
                      <ErrorMessage name="lastName" component={ErrorDisplay} />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <Field 
                        type="email" 
                        id="email" 
                        name="email" 
                        className={errors.email && touched.email ? 'error' : ''}
                      />
                      <ErrorMessage name="email" component={ErrorDisplay} />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <Field 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="+1234567890"
                        className={errors.phone && touched.phone ? 'error' : ''}
                      />
                      <ErrorMessage name="phone" component={ErrorDisplay} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Shipping Address</h2>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <Field 
                      type="text" 
                      id="address" 
                      name="address" 
                      placeholder="Street address, PO Box, Company name"
                      className={errors.address && touched.address ? 'error' : ''}
                    />
                    <ErrorMessage name="address" component={ErrorDisplay} />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <Field 
                        type="text" 
                        id="city" 
                        name="city" 
                        className={errors.city && touched.city ? 'error' : ''}
                      />
                      <ErrorMessage name="city" component={ErrorDisplay} />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code *</label>
                      <Field 
                        type="text" 
                        id="zipCode" 
                        name="zipCode" 
                        placeholder="12345"
                        className={errors.zipCode && touched.zipCode ? 'error' : ''}
                      />
                      <ErrorMessage name="zipCode" component={ErrorDisplay} />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => navigate('/cart')}
                  >
                    ← Back to Cart
                  </button>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Order'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

function ErrorDisplay({ children }) {
  return <div className="error-message">{children}</div>;
}

export default Checkout;