import React from "react";
import { useNavigate } from "react-router";
import images from "../../assets/images/images";

function SearchFoodCard({ id, name, price, img, toggleSerachBox }) {
  const navigate = useNavigate();

  const foodDetails = () => {
    navigate(`/fooddetail/${id}`);
    toggleSerachBox();
  };

  return (
    <div onClick={foodDetails}>
      <section className="rounded-lg w-full bg-white p-1 h-full  flex justify-between max-h-20  ">
        <div className="flex gap-2 ">
          <div>
            <img
              className="w-full h-full rounded-md"
              src={img}
              onError={(e) => {
                e.target.src = images?.fallbackimage;
              }}
              alt=""
            />
          </div>
          <div className="py-2 px-1 flex flex-col justify-between">
            <h2 className="line-clamp-1 font-semibold text- ">{name}</h2>
            <p className="text-sm pt-1 md:text-base">
              <span>${price}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchFoodCard;
