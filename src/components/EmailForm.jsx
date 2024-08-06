import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import QR from "../assets/images/webp/qr1.png";
const phoneModelColors = {
  'iphone x': ['Space Gray', 'Silver'],
  'iphone xr': ['Black', 'White', 'Blue', 'Yellow', 'Red'],
  'iphone xs': ['black', 'Silver', 'Gold'],
  'iphone xs max': ['Space Gray', 'Silver', 'Gold', 'Black'],
  'iphone 11': ['Black', 'Green', 'Gold', 'Purple', 'Red', 'White'],
  'iphone 11 pro': ['Space Gray', 'Silver', 'Gold', 'Midnight Green'],
  'iphone 11 pro max': ['Space Gray', 'Silver', 'Gold', 'Midnight Green'],
  'iphone 12': ['Black', 'White', 'Red', 'Green', 'Blue'],
  'iphone 12 mini': ['Black', 'White', 'Red', 'Green', 'Blue'],
  'iphone 12 pro': ['Graphite', 'Silver', 'Gold', 'Pacific Blue'],
  'iphone 12 pro max': ['Graphite', 'Silver', 'Gold', 'Pacific Blue'],
  'iphone 13': ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red', 'Green'],
  'iphone 13 mini': ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red', 'Green'],
  'iphone 13 pro': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
  'iphone 13 pro max': ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'],
  'iphone 14': ['Midnight', 'Purple', 'Starlight', 'Blue', 'Red'],
  'iphone 14 plus': ['Midnight', 'Purple', 'Starlight', 'Blue', 'Red'],
  'iphone 14 pro': ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
  'iphone 14 pro max': ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
  'iphone 15': ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
  'iphone 15 plus': ['Black', 'Blue', 'Green', 'Yellow', 'Pink'],
  'iphone 15 pro': ['Titanium Black', 'Titanium White', 'Titanium Blue', 'Titanium Natural'],
  'iphone 15 pro max': ['Titanium Black', 'Titanium White', 'Titanium Blue', 'Titanium Natural'],
};

const phoneModelStorage = {
  'iphone x': ['64GB', '256GB'],
  'iphone xr': ['64GB', '128GB', '256GB'],
  'iphone xs': ['64GB', '256GB', '512GB'],
  'iphone xs max': ['64GB', '256GB', '512GB'],
  'iphone 11': ['64GB', '128GB', '256GB'],
  'iphone 11 pro': ['64GB', '256GB', '512GB'],
  'iphone 11 pro max': ['64GB', '256GB', '512GB'],
  'iphone 12': ['64GB', '128GB', '256GB'],
  'iphone 12 mini': ['64GB', '128GB', '256GB'],
  'iphone 12 pro': ['128GB', '256GB', '512GB'],
  'iphone 12 pro max': ['128GB', '256GB', '512GB'],
  'iphone 13': ['128GB', '256GB', '512GB'],
  'iphone 13 mini': ['128GB', '256GB', '512GB'],
  'iphone 13 pro': ['128GB', '256GB', '512GB', '1TB'],
  'iphone 13 pro max': ['128GB', '256GB', '512GB', '1TB'],
  'iphone 14': ['128GB', '256GB', '512GB'],
  'iphone 14 plus': ['128GB', '256GB', '512GB'],
  'iphone 14 pro': ['128GB', '256GB', '512GB', '1TB'],
  'iphone 14 pro max': ['128GB', '256GB', '512GB', '1TB'],
  'iphone 15': ['128GB', '256GB', '512GB'],
  'iphone 15 plus': ['128GB', '256GB', '512GB'],
  'iphone 15 pro': ['128GB', '256GB', '512GB', '1TB'],
  'iphone 15 pro max': ['128GB', '256GB', '512GB', '1TB'],
};

const EmailForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    pincode: '',
    city: '',
    state: '',
    phoneModel: '',
    phoneColor: '',
    phoneStorage: '',
    fullAddress: '',
    mobileNo: '',
    alternateNo: '',
  });

  const [availableColors, setAvailableColors] = useState([]);
  const [availableStorage, setAvailableStorage] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (formData.phoneModel) {
      setAvailableColors(phoneModelColors[formData.phoneModel] || []);
      setAvailableStorage(phoneModelStorage[formData.phoneModel] || []);
    } else {
      setAvailableColors([]);
      setAvailableStorage([]);
    }
    setFormData((prevData) => ({ ...prevData, phoneColor: '', phoneStorage: '' }));
  }, [formData.phoneModel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobileNo === formData.alternateNo) {
      setError("Mobile number and alternate mobile number cannot be the same.");
      return;
    }

    emailjs
      .sendForm(
        'service_3zvr5de',
        'template_7k57vgi',
        e.target,
        'yLN-a56ymnkyX18fC'
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowModal(true); // Show the modal on success
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send message, please try again later.');
        }
      );

    // Reset form data
    e.target.reset();
    setFormData({
      firstName: '',
      lastName: '',
      pincode: '',
      city: '',
      state: '',
      phoneModel: '',
      phoneColor: '',
      phoneStorage: '',
      fullAddress: '',
      mobileNo: '',
      alternateNo: '',
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Model</label>
          <select
            name="phoneModel"
            value={formData.phoneModel}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Model</option>
            {Object.keys(phoneModelColors).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
        {formData.phoneModel && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Color</label>
            <select
              name="phoneColor"
              value={formData.phoneColor}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Color</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.phoneModel && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Storage</label>
            <select
              name="phoneStorage"
              value={formData.phoneStorage}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Storage</option>
              {availableStorage.map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Address</label>
          <textarea
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alternate Mobile No</label>
          <input
            type="text"
            name="alternateNo"
            value={formData.alternateNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={QR} alt="qr" className='w-full h-full' />
            <p>Your message has been sent successfully!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
