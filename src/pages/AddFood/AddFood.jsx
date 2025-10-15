import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import './AddFood.css';

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani'
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error('Please select an image.');
      return;
    }
    try {
      await addFood(data, image);
      toast.success('Food added successfully!');
      setData({ name: '', description: '', category: 'Biryani', price: '' });
      setImage(null);
    } catch (error) {
      toast.error('Error adding food.');
    }
  };

  return (
    <div className="add-food-container container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">Add New Food Item</h2>
          <form onSubmit={onSubmitHandler}>
            <div className="text-center mb-4">
              <label htmlFor="image" className="upload-box">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  alt="Upload"
                  className="upload-preview"
                />
                <span className="upload-text">Click to upload image</span>
              </label>
              <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Food Name</label>
              <input type="text" className="form-control" placeholder="e.g. Chicken Biryani" name="name" required onChange={onChangeHandler} value={data.name} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea className="form-control" placeholder="Write details here..." rows="4" name="description" required onChange={onChangeHandler} value={data.description}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Category</label>
              <select className="form-select" name="category" onChange={onChangeHandler} value={data.category}>
                <option>Biryani</option>
                <option>Cake</option>
                <option>Burger</option>
                <option>Pizza</option>
                <option>Rolls</option>
                <option>Salad</option>
                <option>Ice Cream</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Price (₹)</label>
              <input type="number" className="form-control" placeholder="e.g. 199" name="price" required onChange={onChangeHandler} value={data.price} />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">Add Food</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
