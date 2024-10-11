import React, { useState } from "react";
import UpdateProduct from "../../components/admin/UpdateProduct";
import ListItem from "../../components/admin/ListItem";

const ListItems = () => {
  const [updateProduct, setUpdateProduct] = useState(false);

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-none max-w-7xl mx-auto px-5 relative">
      {updateProduct ? (
        <div className="w-full absolute top-1 right-0">
          <UpdateProduct setUpdateProduct={setUpdateProduct} />
        </div>
      ) : (
        <ListItem setUpdateProduct={setUpdateProduct} />
      )}
    </div>
  );
};

export default ListItems;
