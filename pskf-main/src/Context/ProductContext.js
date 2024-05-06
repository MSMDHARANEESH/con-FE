
import axios from 'axios'
import {createContext, useContext, useEffect, useState} from 'react'
const ProductContext = createContext()


export const ProductProvider = ({children}) => {
  const [productList, setProductList] = useState([])
  const [categories, setCategories] = useState()
  const [category, setCategory] = useState("/products")
  const [productID, setProductID] = useState("")
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getCategories = async () => {

      let categoriesData
      await axios("http://localhost:3030/products/categories").then(
        (res) =>
        (categoriesData = res.data.map((item) =>
          item.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        ))
      )
      setCategories(categoriesData)
    }
    getCategories()
    setLoading(false)
  }, [])

  useEffect(() => {
  setLoading(true);
  const getProductData = async () => {
    try {
      if (category && category.length > 0) {
        const response = await axios.get(`http://localhost:3030/products/category/${category}`);
        setProductList(response.data);
        setLoading(false);
      } else {
        const response = await axios.get(`http://localhost:3030/products`);
        setProductList(response.data);
        setCategory("");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };
  getProductData();
}, [category]);


  useEffect(() => {
    setLoading(true)
    const getProductDetail = async () => {

      productID && productID.length > 0 && await axios.get(`http://localhost:3030/products/${productID}`).then(
        (res) => {
          setProduct(res.data)
          setLoading(false)
        }
      )
    }
    getProductDetail()
  }, [productID])

  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
  }

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)
