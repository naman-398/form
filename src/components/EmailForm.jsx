import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import QR from "../assets/images/webp/qr1.png";
import InputField from './common/InputField';

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
          setShowModal(true); 
        },
        (error) => {
          console.log(error.text);
          alert('Failed to send message, please try again later.');
        }
      );

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
    <div className='max-w-[1440px] mx-auto px-4'>
    <h1 className='lg:text-6xl md:text-5xl sm:text-4xl text-3xl bg-font-gradient bg-clip-text py-10 text-transparent text-center'>
      Fill Your Detail For Book The Phone
    </h1>
    <div className="max-w-[600px] mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        <div className='flex items-center flex-col sm:flex-row gap-3'>
        <InputField
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        </div>
        <div className='flex items-center flex-col sm:flex-row gap-3'>
        <InputField
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        </div>
        <div className='flex items-center flex-col sm:flex-row gap-3'>
        <InputField
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <InputField
          type="select"
          name="phoneModel"
          label="Select Model"
          value={formData.phoneModel}
          onChange={handleChange}
          options={Object.keys(phoneModelColors)}
          required
        />
        </div>
        <div className='flex items-center flex-col sm:flex-row gap-3'>
        {formData.phoneModel && (
          <InputField
            type="select"
            name="phoneColor"
            label="Select Color"
            value={formData.phoneColor}
            onChange={handleChange}
            options={availableColors}
            required
          />
        )}
        {formData.phoneModel && (
          <InputField
            type="select"
            name="phoneStorage"
            value={formData.phoneStorage}
            label="Select Storage"
            onChange={handleChange}
            options={availableStorage}
            required
          />
        )}
        </div>
        <textarea
          type="textarea"
          name="fullAddress"
          placeholder="Full Address"
          value={formData.fullAddress}
          onChange={handleChange}
          required
          className='placeholder:font-normal pr-4 border-none outline-none placeholder:text-xs lg:placeholder:text-sm placeholder:tracking-tighter placeholder:text-white text-white font-normal text-xs lg:text-sm w-full p-3 sm:p-[15.5px_16px_19px_16px] rounded-lg resize-none h-20 bg-black-olive'
        ></textarea>
        <InputField
          type="number"
          name="mobileNo"
          placeholder="Mobile Number"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          name="alternateNo"
          placeholder="Alternate Number"
          value={formData.alternateNo}
          onChange={handleChange}
          required
        />
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        <div>
          <button
            type="submit"
            className="duration-500 bg-malachite py-2 sm:py-3 md:py-4 px-6 w-full flex justify-center text-light-white rounded-xl font-inter border-[2px] border-malachite font-bold text-sm overflow-hidden ease-in-out text-center after:absolute relative after:left-50%  after:bg-vampire-black after:w-full after:h-full  after:left-0 after:top-0 after:scale-x-0 hover:after:scale-x-100 after:origin-center after:rounded-xl after:duration-500 after:ease-in-out hover:text-malachite"
          >
        <span className="relative z-10 my-auto">Submit</span>
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-30 " onClick={() => setShowModal(false)}>
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <img src={QR} alt="qr" className='w-full h-full' />
            <button
            type="submit"
            className="duration-500 bg-malachite p-2 mt-3 flex justify-center text-light-white rounded-md font-inter border-[2px] border-malachite font-bold text-sm overflow-hidden ease-in-out text-center after:absolute relative after:left-50%  after:bg-vampire-black after:w-full after:h-full  after:left-0 after:top-0 after:scale-x-0 hover:after:scale-x-100 after:origin-center after:rounded-[36px] after:duration-500 after:ease-in-out hover:text-malachite"
          >
        <span className="relative z-10 my-auto">Submit</span>
          </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default EmailForm;
