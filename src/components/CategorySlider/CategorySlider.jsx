import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function CategorySlider() {
  async function getCategoryImages() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { isLoading, isFetching, error, data } = useQuery(
    "categoryImg",
    getCategoryImages
  );
  const catImgs = data?.data.data;

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      {isLoading ? (
        <div className="h-10">Loading...</div>
      ) : (
        <Slider className="my-2" {...settings}>
          {catImgs.map(function (item, idx) {
            return (
              <div key={idx} className="cursor-pointer">
                <Link to={`/products/${item._id}`}>
                  <h3 className="text-lg text-gray-700 text-center">
                    {item.name}
                  </h3>
                  <img
                    src={item.image}
                    className="w-full h-32 px-3"
                    alt="category image"
                  />
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </>
  );
}
