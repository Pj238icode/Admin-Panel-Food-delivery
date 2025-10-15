import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteFood, getFoodList } from "../../services/foodService";
import "./ListFood.css";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error while loading foods.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food removed successfully.");
        fetchList();
      } else {
        toast.error("Failed to remove food.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-food-container py-5 row justify-content-center">
      <div className="col-11 card shadow-lg border-0 p-3">
        <h3 className="text-center mb-4 text-primary fw-bold">Food List</h3>
        {list.length === 0 ? (
          <p className="text-center text-muted">No food items available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price (₹)</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="table-row">
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="food-img"
                      />
                    </td>
                    <td className="fw-semibold">{item.name}</td>
                    <td>{item.category}</td>
                    <td className="fw-semibold text-success">
                      ₹{item.price}.00
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-danger delete-btn"
                        onClick={() => removeFood(item.id)}
                      >
                        <i className="bi bi-trash3-fill"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFood;
