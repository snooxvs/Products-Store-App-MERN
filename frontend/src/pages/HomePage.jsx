import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography,Modal, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { useProductStore } from '../store/product'
import { toast, ToastContainer } from 'react-toastify'

const HomePage = () => {
  const {getAllProducts,products,deleteProduct,updateProduct} = useProductStore()
  const [open,setOpen] = useState(false)
  const [selectedProduct,setSelectedProduct] = useState(products)
  const handleOpen = (product) => {
    setOpen(true)
    setSelectedProduct(product)
  }
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(()=>{
    getAllProducts()
  },[getAllProducts])

  const handleDeleteProduct = async(pid)=>{
    const {success,message} = await deleteProduct(pid)
    if(!success){
      toast.error(message,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }  
  }
  
  const handleUpdateProduct = async (pid,selectedProduct) => {
    const {success,message}=await updateProduct(pid,selectedProduct);
    handleClose()
    if(!success){
      toast.error(message,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }else{
      toast.success(message,{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
      
    } 
  };

  return (
    <Box>
      <ToastContainer />
      <Typography variant='h6' sx={{fontSize:{md:'2rem',xs:'1.4rem'},textAlign:'center',my:3,fontWeight:'bold'}}>
        Current Products
      </Typography>
      {products.length == 0 && (
        <Typography sx={{textAlign:'center',my:3}}>No Products Found 😢 {" "}
          <Box component={Link} sx={{textDecoration:'none',textAlign:'center',fontWeight:'bold'}} to='/create'>
          Create Product
          </Box>
        </Typography>
      )}
      <Grid container spacing={4} sx={{ p: 2, justifyContent: 'center' }}>
        {products.map((p)=>(
          <Grid size={{ xs: 12, sm: 6, md:4,lg:3 }} key={p._id}>
          <Card elevation={5} sx={{p:2,borderRadius:2,"&:hover":{transform: 'translateY(-10px)'},transition: 'all 0.2s ease-in-out'}}>
            <CardMedia 
              component='img'
              alt={p.name}
              image={p.image}
              sx={{height:200,width:{md:300,xs:'100%',sm:300,lg:300},objectFit:'cover',mx:'auto',objectPosition:'center'}}
            />
            <CardContent>
              <Typography variant='h6' sx={{textAlign:'center',fontWeight:'bold'}}>
                {p.name}
              </Typography>
              <Typography variant='h6' sx={{textAlign:'center',mt:2,color:'gray'}}>
                ${p.price}
              </Typography>
              <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <IconButton
                sx={{
                  borderRadius: "4px",
                  m:2,
                  backgroundColor: 'rgba(189, 201, 211, 0.56)',
                  color:'GrayText'
                }}
                onClick={()=>handleOpen(p)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                sx={{
                  borderRadius: "4px",
                  m:2,
                  backgroundColor: 'rgba(189, 201, 211, 0.56)',
                  color:'red'
                }}
                onClick={()=>handleDeleteProduct(p._id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {selectedProduct && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs: '70%', md: 400 },
            bgcolor: 'background.paper',
            borderRadius:2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant='h6' sx={{fontSize:{md:'2rem',xs:'1.4rem'},textAlign:'center',fontWeight:'bold'}}>
            Update New Product
          </Typography>
          <TextField 
            label="Product Name"
            fullWidth
            sx={{my:2,mt:3}}
            defaultValue={selectedProduct.name}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
          />
          <TextField 
            label="Price"
            type='number'
            fullWidth
            sx={{my:2}}
            defaultValue={selectedProduct.price}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
          />
          <TextField 
            label="Image URL"
            fullWidth
            sx={{my:2}}
            defaultValue={selectedProduct.image}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })}
          />
          <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button variant='contained' onClick={()=>handleUpdateProduct(selectedProduct._id,selectedProduct)} sx={{my:1}}>
              Update
            </Button>
            <Button variant='text' onClick={handleClose} sx={{my:1,ml:1}}>
              Cancel
            </Button>
          </Box>
          </Box>
          )}
      </Modal>
    </Box>
  )
}

export default HomePage