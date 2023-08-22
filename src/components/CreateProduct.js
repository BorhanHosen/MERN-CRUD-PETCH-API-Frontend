import { useEffect, useState } from "react";
const CreateProduct = ({ fetchData, clickEdit, setClickEdit }) => {
  const [ProductName, setProductName] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [submitButton, setSubmitButton] = useState("Add");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Update = async (clickEdit) => {
      try {
        const { _id } = clickEdit;
        if (
          ProductName &&
          ProductCategory &&
          ProductPrice &&
          ProductDescription
        ) {
          const data = {
            ProductName,
            ProductCategory,
            ProductPrice,
            ProductDescription,
          };
          // console.log({ _id });
          // console.log(data);

          const response = await fetch(
            `http://127.0.0.1:8000/api/UpdateProduct/${_id}`,
            {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          // console.log(response);
          await fetchData();
        } else {
          console.log("All fields are required!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const Add = async () => {
      try {
        if (
          ProductName &&
          ProductCategory &&
          ProductPrice &&
          ProductDescription
        ) {
          const data = {
            ProductName,
            ProductCategory,
            ProductPrice,
            ProductDescription,
          };
          console.log(data);
          const response = await fetch(
            "http://localhost:8000/api/CreateProduct",
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
              },
            }
          );
          // console.log(response);
          await fetchData();
        } else {
          console.log("All fields are required!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (submitButton === "Add") {
      Add();
    } else {
      Update(clickEdit);
    }
  };
  useEffect(() => {
    if (clickEdit) {
      setProductName(clickEdit.ProductName);
      setProductCategory(clickEdit.ProductCategory);
      setProductPrice(clickEdit.ProductPrice);
      setProductDescription(clickEdit.ProductDescription);
      if (submitButton === "") {
        setSubmitButton("Add");
        // console.log(submitButton);
      } else {
        setSubmitButton("Update");
        // console.log(submitButton);
      }
    }
    // console.log(clickEdit);
  }, [clickEdit, submitButton]);

  return (
    <div className="w-full sm:w-full md:w-1/3 bg-blue-300">
      <form
        className="flex justify-center flex-col lg:items-center gap-2 p-5"
        onSubmit={handleSubmit}
      >
        <input
          className="shadow-md w-full  font-bold rounded-md p-2 outline-none"
          type="text"
          placeholder="Product Name"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="shadow-md w-full  font-bold rounded-md p-2 outline-none"
          type="text"
          placeholder="Category"
          value={ProductCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <input
          className="shadow-md w-full  font-bold rounded-md p-2 outline-none"
          type="text"
          placeholder="Price"
          value={ProductPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <textarea
          className="shadow-md w-full  font-bold rounded-md p-2 outline-none"
          placeholder="Description"
          value={ProductDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          cols="10"
          rows="4"
        ></textarea>

        <button className=" w-full shadow-lg shadow-indigo-500/50 py-2 font-bold text-white rounded-md bg-cyan-500 uppercase">
          {submitButton}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
