import React, { useState } from 'react';
import styles from './styles.module.css';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Card = ({
  item,
  addToFavorite,
  findFavoriteItem,
  addToCart,
  findCartItem,
}) => {
  const [weight, setWeight] = useState(1); // Initialize weight to 1 (or any default value)

  // Calculate the total price based on weight and the product's base price
  const totalWeightPrice = (item.price * weight).toFixed(2);

  // Function to handle changes in the weight input
  const handleWeightChange = (e) => {
    const newWeight = parseFloat(e.target.value);
    if (!isNaN(newWeight) && newWeight >= 1) {
      // Only update the weight if it's a valid number and not less than 1
      setWeight(newWeight);
    }
  };

  return (
    <div key={`${item.id}-item`} className={styles.card} title={item.title}>
      <div className={styles.cardLink}>
        <button
          className={!findFavoriteItem ? styles.favButton : styles.removeFavButton}
          onClick={() => {
            addToFavorite(item, findFavoriteItem);
          }}
        >
          <HeartIcon className={styles.heartIcon} />
        </button>
        <Link to={`/product/${item.id}`}>
          <div className={styles.cardHeader}>
            <img className={styles.cardImg} src={item.image} alt="" />
          </div>
        </Link>
        <div className={styles.cardBody}>
          <div>
            <p className={styles.cardTitle} title={item.title}>
              <span className={styles.brand} title="Brand">
                Brand,
              </span>{' '}
              {item.title}
            </p>
          </div>
          
          <div>
            <div className="my-auto" title={`Rs ${totalWeightPrice}`}>
              <span className={styles.priceSub}>Rs </span>
              <span className={styles.priceTop}>{Math.trunc(totalWeightPrice)}</span>
              {parseInt((totalWeightPrice % 1).toFixed(2).substring(2)) !== 0 ? (
                <span className={styles.priceSub}>
                  {parseInt((totalWeightPrice % 1).toFixed(2).substring(2))}
                </span>
              ) : (
                ''
              )}
            </div>
          </div>
          <div>
            {/* Input field for weight */}
            <div className={styles.weightInput}>
              <label className={styles.weightLabel}>Length (m):</label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                className={styles.weightValue}
              />
            </div>
          </div>
          <div className={styles.addToCart}>
            <button
              className={!findCartItem ? styles.addToCartButton : styles.removeButton}
              onClick={() => addToCart({...item,weight}, findCartItem)}
            >
              <ShoppingCartIcon className={styles.shoppingCartIcon} aria-hidden="true" />
              <div className="flex flex-col self-center">
                <span className={styles.buttonText}>
                  {findCartItem ? 'Remove from cart' : 'Add to Cart'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
