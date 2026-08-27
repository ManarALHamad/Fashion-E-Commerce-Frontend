import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import * as productService from "../../services/productService"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const ProductEdit = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  const [selectedCategory, setSelectedCategory] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sub_category: "",
    in_stock: true,
  })

  const [variants, setVariants] = useState([
    {
      size: "S",
      price: "",
      inventory: "",
      available: false,
    },
    {
      size: "M",
      price: "",
      inventory: "",
      available: false,
    },
    {
      size: "L",
      price: "",
      inventory: "",
      available: false,
    },
  ])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories`)

        if (!res.ok) {
          throw new Error("Failed to fetch categories")
        }

        const data = await res.json()

        setCategories(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCategories()
  }, [])


  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/subcategories`)

        if (!res.ok) {
          throw new Error("Failed to fetch subcategories")
        }

        const data = await res.json()

        setSubCategories(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchSubCategories()
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.show(productId)

        setFormData({
          name: productData.name || "",
          description: productData.description || "",
          sub_category:
            productData.sub_category?._id ||
            productData.sub_category ||
            "",
          in_stock: productData.in_stock,
        })

        const subCategoryId =
          productData.sub_category?._id ||
          productData.sub_category

        const matchingSubCategory = subCategories.find(
          (subCategory) =>
            String(subCategory._id) === String(subCategoryId)
        )

        if (matchingSubCategory) {
          setSelectedCategory(
            matchingSubCategory.category?._id ||
            matchingSubCategory.category
          )
        }

        if (productData.variants) {
          setVariants((previousVariants) =>
          previousVariants.map((defaultVariant) => {
            const existingVariant =
              productData.variants?.find(
                (variant) =>
                  variant.size === defaultVariant.size
              )

              if (existingVariant) {
                return {
                  ...defaultVariant,
                  _id: existingVariant._id,
                  price: existingVariant.price,
                  inventory: existingVariant.inventory,
                  available: true,
                }
              }

              return defaultVariant
            })
          )
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (productId && subCategories.length > 0) {
      fetchProduct()
    }
  }, [productId, subCategories])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)

    setFormData({
      ...formData,
      sub_category: "",
    })
  }

  const handleVariantChange = (index, event) => {
    const { name, value, type, checked } = event.target

    const updatedVariants = [...variants]

    updatedVariants[index] = {
      ...updatedVariants[index],
      [name]: type === "checkbox" ? checked : value,
    }

    setVariants(updatedVariants)
  }

  const filteredSubCategories = subCategories.filter(
    (subCategory) =>
      String(
        subCategory.category?._id ||
        subCategory.category
      ) === String(selectedCategory)
  )

  const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    await productService.update(productId, formData)

    for (const variant of variants) {
        if (variant.available) {
            const variantData = {
                size: variant.size,
                price: variant.price,
                inventory: variant.inventory,
            }

        if (variant._id) {
            const res = await fetch(
                `${BASE_URL}/products/${productId}/variants/${variant._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(variantData),
                }
            )
            
            if (!res.ok) {
                throw new Error(
                    `Failed to update ${variant.size} variant`
                )
            }
        } else {
            const res = await fetch(
                `${BASE_URL}/products/${productId}/variants`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(variantData),
                }
            )

            if (!res.ok) {
                throw new Error(
                `Failed to create ${variant.size} variant`
                )
            }
        }
      }
    }

    navigate(`/admin/products/${productId}`)
  } catch (err) {
    console.log(err)
  }
}
  return (
    <div className="add-product-page">

      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            required
          />
        </div>

        <div>
          <label>Category</label>

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Sub Category</label>

          <select
            name="sub_category"
            value={formData.sub_category}
            onChange={handleChange}
            required
            disabled={!selectedCategory}
          >

            <option value="">
              Select Sub Category
            </option>

            {filteredSubCategories.map(
              (subCategory) => (
                <option
                  key={subCategory._id}
                  value={subCategory._id}
                >
                  {subCategory.name}
                </option>
              )
            )}

          </select>
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            required
          />
        </div>

        <div>

          <h3>Available Sizes</h3>

          {variants.map((variant, index) => (
            <div key={variant.size}>

              <label>

                <input
                  type="checkbox"
                  name="available"
                  checked={variant.available}
                  onChange={(event) =>
                    handleVariantChange(
                      index,
                      event
                    )
                  }
                />

                {variant.size}

              </label>

              {variant.available && (
                <>

                  <input
                    type="number"
                    name="price"
                    step="0.001"
                    min="0"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(event) =>
                      handleVariantChange(
                        index,
                        event
                      )
                    }
                    required
                  />

                  <input
                    type="number"
                    name="inventory"
                    min="0"
                    placeholder="Inventory"
                    value={variant.inventory}
                    onChange={(event) =>
                      handleVariantChange(
                        index,
                        event
                      )
                    }
                    required
                  />

                </>
              )}

            </div>
          ))}

        </div>

        <div>

          <label>In stock</label>

          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
          />

        </div>

        <button type="submit">
          Update Product
        </button>

      </form>

    </div>
  )
}

export default ProductEdit