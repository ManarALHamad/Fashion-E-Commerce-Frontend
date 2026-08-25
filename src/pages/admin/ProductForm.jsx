import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL

const ProductForm = () => {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [images, setImages] = useState([])

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


  const handleImageChange = (event) => {
    setImages([...event.target.files])
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
      String(subCategory.category) === String(selectedCategory)
  )

const handleSubmit = async (event) => {
  event.preventDefault()

  try {
    console.log("Sending to Django:", formData)

    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    console.log("STATUS:", res.status)
    console.log("DJANGO RESPONSE:", data)

    if (!res.ok) {
      throw new Error("Failed to create product")
    }

    console.log("Product created:", data)

    navigate("/admin/products")

  } catch (err) {
    console.log(err)
  }
}

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const res = await fetch(`${BASE_URL}/products`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     })

  //     const product = await res.json()

  //     if (!res.ok) {
  //       console.log(product)
  //       throw new Error("Failed to create product")
  //     }

  //     console.log("Product created:", product)

  //     navigate("/admin/products")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div className="add-product-page">

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>



        <div>
          <label>Product Name</label>

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product name" required />

        </div>


        <div>
          <label>Category</label>

          <select value={selectedCategory} onChange={handleCategoryChange} required >

         <option value="">Select Category</option>
        

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

          <select name="sub_category" value={formData.sub_category} onChange={handleChange} required disabled={!selectedCategory} >

            <option value=""> Select Sub Category</option>
       

            {filteredSubCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>

                {subCategory.name}
              </option>
            ))}

          </select>
        </div>


        <div>
          <label>Description</label>

          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product description" required />

        </div>


        <div>
          <label>Product Images</label>

          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

          {images.length > 0 && (
            <p>{images.length} image(s) selected</p>
          )}
        </div>


        <div>

          <h3>Available Sizes</h3>

          {variants.map((variant, index) => (
            <div key={variant.size}>

              <label>

                <input type="checkbox" name="available" checked={variant.available}

                  onChange={(event) =>
                    handleVariantChange(index, event)
                  }
                />

                {variant.size}

              </label>


              {variant.available && (
                <>
                <input type="number" name="price" step="0.001" min="0" placeholder="Price"

                    value={variant.price}
                    onChange={(event) =>
                      handleVariantChange(index, event)
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
                      handleVariantChange(index, event)
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

            <input type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleChange} />



        </div>


        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  )
}

export default ProductForm