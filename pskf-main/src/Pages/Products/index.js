import React, { useEffect } from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext'
import { useFavorite } from '../../Context/FavoriteContext'
import Card from "../../Components/Card";
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import NAVIGATION from '../../Config/navbarItemList'
import { useAuth } from '../../Context/AuthContext'

const Products = () => {
  const { addToCart, items } = useCart()
  const { categories, setCategory } = useProduct()
  const { addToFavorite, favoriteItems } = useFavorite()
  const { productList, loading, setProductID } = useProduct();
  const { category_id } = useParams()
  const { loggedIn, setIsSubmitting, logout } = useAuth()

  useEffect(() => {
    setCategory(category_id)
  }, [category_id])

  const handleLogout = async () => {
    setIsSubmitting(true)
    try {
      await logout()
    } catch {
      alert("Error")
    }
    setIsSubmitting(false)
  }

  return (
    <>
    
      <div className="bg-zinc-900/10 mx-auto h-[1.1px] shadow-sm shadow-zinc-900/10 px-12"></div>

      <div className="bg-zinc-900/10 mx-auto h-[1px] shadow-sm shadow-zinc-900/10 px-12"></div>

      <nav className={styles.categoryNav}>
        
        <div>
          <Link
            className={styles.categoryLink}
            to="/"
            onClick={() => setCategory("")}
          >
            <h1 className="truncate">All</h1>
          </Link>
        </div>
        {categories &&
          categories.map((item, index) => {
            return (
              <div key={`${item}-${index}`}>
               <Link
  className={styles.categoryLink}
  to={`/${item.toLowerCase()}`}
  onClick={() => {
    setCategory(item.toLowerCase());
  }}
>
  
  <h1 className="truncate">{item}</h1>
</Link>

              </div>
            );
          })}
      </nav>
      <div className={styles.cardGroup}>
        {!loading ? (
          productList?.map((item, index) => {
            const findCartItem = items.find((cart_item) => cart_item.id === item.id)
            const findFavoriteItem = favoriteItems.find((favorite_item) => favorite_item.id === item.id)
            return (
              <Card key={`product-${index}`} item={item} setProductID={setProductID} findCartItem={findCartItem} findFavoriteItem={findFavoriteItem} addToCart={addToCart} addToFavorite={addToFavorite} />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Products;