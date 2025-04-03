import React, { useState } from 'react'
import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { useProductStore } from '../store/product'
import { toast, ToastContainer } from 'react-toastify'
const CreatePage = () => {

  const [newProduct,setNewProduct] = useState({name: "",price:"",image:""})
  const {createProduct} = useProductStore()
  const handleAddProduct=async()=>{
    const {success,message} = await createProduct(newProduct)
    if (!success) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setNewProduct({name:"",price:"",image:""})
    }
  }
  
  return (
    <Container maxWidth='xs' sx={{mt:10,height:'78.3vh'}}>
      <ToastContainer />
      <Card elevation={5}>
        <CardContent sx={{p:4}}>
          <Typography variant='h6' sx={{fontSize:{md:'2rem',xs:'1.4rem'},textAlign:'center',fontWeight:'bold'}}>
            Create New Product
          </Typography>
          <TextField 
            label="Product Name"
            value={newProduct.name}
            name='name'
            fullWidth
            onChange={(e)=>setNewProduct({...newProduct,name: e.target.value})}
            sx={{my:2,mt:3}}
          />
          <TextField 
            label="Price"
            value={newProduct.price}
            name='price'
            type='number'
            fullWidth
            onChange={(e)=>setNewProduct({...newProduct,price: e.target.value})}
            sx={{my:2}}
          />
          <TextField 
            label="Image URL"
            value={newProduct.image}
            name='image'
            fullWidth
            onChange={(e)=>setNewProduct({...newProduct,image: e.target.value})}
            sx={{my:2}}
          />
          <Button variant='contained' onClick={handleAddProduct} fullWidth sx={{my:1}}>
            Add Product
          </Button>
        </CardContent>
      </Card>

      
      
    </Container>
  )
}

export default CreatePage