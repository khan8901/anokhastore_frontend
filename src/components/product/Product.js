import React from "react";
// import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./product.css";

const Product = ({ product }) => {
  console.log("product is called");
  return (
    <Card className="mt-3 p-0">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          loading="lazy"
          className="product-image"
          src={product.images[0].url}
          variant="top"
          alt={product.name}
        />
      </Link>

      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ color: "dimgray", textDecoration: "none" }}
        >
          <Card.Title className="product-title" as="p">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* 
        <Card.Text as="div">
          {product && product.rating && (
            <Rating
              value={product.rating}
              text={`${product.numReviews} Review${
                product.numReviews > 1 ? "s" : ""
              }`}
            />
          )}
        </Card.Text> */}

        <Card.Text as="h4">
          {product.price &&
            product.price.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR",
            })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;