import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { deleteProduct, listProducts, saveProduct } from '../actions/productAction';


export default function ProductsScreen(props) {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [id, setId] = useState('')
    const productSave = useSelector(state => state.productSave)
    const { loading: loadingSave, success:successSave, error:errorSave } = productSave

    const productDelete = useSelector(state => state.productDelete)
    const {  success:successDelete } = productDelete


    const productList = useSelector(state => state.productList)
    const { products } = productList
	const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false)
        }
        dispatch(listProducts())
        return () => {
            //
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [successSave, successDelete])
    
    const openModal = (product) => {
        setModalVisible(true)
      setId(product._id)
      setTitle(product.title)
      setStock(product.stock)
      setDescription(product.description)
      setPrice(product.price)
      setBrand(product.brand)
      setImage(product.image)
      setCategory(product.category)
    }
   
    const deleteHandler = (product) =>{
        dispatch(deleteProduct(product._id))
    }

	const submitHandler = (e) =>{
      e.preventDefault()
      if(title===''||price===''||stock==='' ||category==='' ||brand==='' ||image==='' ||description==='' ){
        document.getElementById('alert').innerText = 'please fill all required details'
        document.getElementById('alert').classList.add('red-message')
      }else{

          dispatch(saveProduct({id,title,price,stock,category,brand,image,description}))
      }
    }
	return (
        <div className="content-margined">
            <div className="prodcut-header">
                <h3>Products</h3>
                <a href='#create' className='button button-primary' onClick={() => openModal({})}>Create new Product</a>
            </div>
            <div className="product-list">
                <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                {products.map(product => 
                   <tr key={product._id}>
                    <td >{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.image}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td> 
                        <a href='#create' className='edit' onClick={() => openModal(product)}>edit</a>
                        {' '}
                        <button className='button-delete'onClick={() => deleteHandler(product)} >remove</button>
                    </td>
                    </tr>
                )}
                </tbody>
                </table>
            </div>
        { modalVisible &&
	
			<form  id='create' className='form' onSubmit={submitHandler}>
                <ul className='form-container'>
                    <li>
                        <h3>Add you product</h3>
                    </li>
                    <li id='alert'>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div className='red-message'>{errorSave}.</div>}
                    </li>
                    <li>
                        <input type="text" id='title' name='title' value = {title||''} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                    </li>
                    <li>
                        <input type="text" id='image' name='image' value = {image||''} onChange={(e) => setImage(e.target.value)} placeholder='Inset image'/>
                    </li>
                    <li>
                        <input type="text" id='category' name='category' value = {category||''} onChange={(e) => setCategory(e.target.value)} placeholder='Category'/>
                    </li>
                    <li>
                        <input type="Number" id='price' name='price' value = {price||''} onChange={(e) => setPrice(e.target.value)} placeholder='Price'/>
                    </li>
                    <li>
                        <input type="Number" id='stock' name='stock' value = {stock||''} onChange={(e) => setStock(e.target.value)} placeholder='Available stock'/>
                    </li>
                    <li>
                        <input type="text" id='brand' name='brand' value = {brand||''} onChange={(e) => setBrand(e.target.value)} placeholder='Brand name'/>
                    </li>
                    <li>
                        <textarea id='description' name='description' value = {description||''} onChange={(e) => setDescription(e.target.value)} placeholder='Description'/>
                    </li>
                    <li>
                        <button type='submit' className='button-update' >
                           {id?'Update':'Create'}
                        </button>
                        <button onClick={() => setModalVisible(false)} className='button-cancel' >
                          cancel
                        </button>
                    </li>
                </ul>
            </form>
            }
            </div>
	);
}
