import { useEffect, useState } from "react";

// const data = [
//   {
//     id: 1,
//     ProductName: "IPhone",
//     ProductCategory: "IPhone",
//     ProductPrice: "IPhone",
//     ProductDescription: "IPhone",
//   },
//   {
//     id: 2,
//     ProductName: "IPhone",
//     ProductCategory: "IPhone",
//     ProductPrice: "IPhone",
//     ProductDescription: "IPhone",
//   },
//   {
//     id: 3,
//     ProductName: "IPhone",
//     ProductCategory: "IPhone",
//     ProductPrice: "IPhone",
//     ProductDescription: "IPhone",
//   },
//   {
//     id: 4,
//     ProductName: "IPhone",
//     ProductCategory: "IPhone",
//     ProductPrice: "IPhone",
//     ProductDescription: "IPhone",
//   },
// ];

const Table = ({ fetchData, data, clickEdit, setClickEdit }) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(true);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/DeleteProduct/${id}`,
        {
          method: "DELETE",
        }
      );
      // console.log(response);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (items) => {
    try {
      setClickEdit(items);
      // console.log(clickEdit);
    } catch (error) {
      console.log(error);
    }
  };
  const handleView = async (items) => {
    try {
      setOpen(true);
      setView(items);
      console.log(view);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="box bg-white w-[400px] p-5 rounded-md z-50">
            <button
              className="text-xl font-bold w-full flex justify-end"
              onClick={(prev) => setOpen(!prev)}
            >
              X
            </button>
            <h2>
              Product Name: <b>{view.ProductName}</b>
            </h2>
            <h2>
              Product Category: <b> {view.ProductCategory}</b>
            </h2>
            <h2>
              Product Price: <b> {view.ProductPrice}</b>
            </h2>
            <h2>
              Product Description: <b> {view.ProductDescription}</b>
            </h2>
          </div>
        </div>
      )}
      <div className="w-full sm:w-full md:w-2/3 bg-cyan-700 p-5 overflow-auto">
        <table className="border border-slate-600 w-full ">
          <caption className="caption-top text-lg font-bold text-white tracking-wide">
            Product Prize Table
          </caption>
          <thead>
            <tr className="bg-[#475569] text-white">
              <th className="border border-slate-500 text-left px-2">Name</th>
              <th className="border border-slate-500 text-left px-2">
                Category
              </th>
              <th className="border border-slate-500 text-left px-2">Price</th>
              <th className="border border-slate-500 text-left px-2">
                Description
              </th>
              <th className="border border-slate-500 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((items) => (
              <tr
                key={items._id}
                className=" bg-[#334155] hover:bg-[#364c69] cursor-pointer text-white "
              >
                <td className="border border-slate-600 pl-2">
                  {items.ProductName}
                </td>
                <td className="border border-slate-600 pl-2">
                  {items.ProductCategory}
                </td>
                <td className="border border-slate-600 pl-2">
                  {items.ProductPrice}
                </td>
                <td className="border border-slate-600 pl-2">
                  {items.ProductDescription}
                </td>
                <td className="border border-slate-600">
                  <div className="flex gap-1 px-2 py-1 justify-center items-center">
                    <button
                      onClick={() => handleView(items)}
                      className="bg-sky-500  px-1 text-sm uppercase font-bold text-white  rounded shadow-md shadow-sky-600 hover:shadow-sky-400 "
                    >
                      view
                    </button>
                    <button
                      onClick={() => handleUpdate(items)}
                      className="bg-blue-500  px-1 text-sm uppercase font-bold text-white  rounded shadow-md shadow-blue-600 hover:shadow-blue-400 "
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(items._id)}
                      className="bg-red-500  px-1 text-sm uppercase font-bold text-white  rounded shadow-md shadow-red-600 hover:shadow-red-400 "
                    >
                      delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
