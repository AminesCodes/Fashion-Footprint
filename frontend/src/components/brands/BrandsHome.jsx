import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Feedback from '../Feedback';
import ProductCard from './ProductCard';

export default function BrandsHome (props) {
    const brandID = props.loggedUser.id;
    const [ productsList, setProductsList ] = useState([])
    const [ typesList, setTypesList ] = useState([]);
    const [ targetType, setTargetType ] = useState('0');
    const [ materialsList, setMaterialsList ] = useState([]);
    const [ targetMaterial, setTargetMaterial ] = useState('0');
    const [ productName, setProductName ] = useState('');
    const [ productDescription, setProductDescription ] = useState('');
    const [ closingDate, setClosingDate ] = useState('');
    const [ productPic, setProductPic ] = useState(null);
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ updateProduct, setUpdateProduct ] = useState(false)
    const [ targetProduct, setTargetProduct ] = useState(false)
    const [ networkErr, setNetworkErr ] = useState(null);

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`/api/products/${brandID}/all`);
            setProductsList(data.payload)
        } catch (err) {

        }
    }

    const getAllTypes = async () => {
        try {
            const { data } = await axios.get('/api/types/all');
            setTypesList(data.payload);
        } catch (err) {
            setNetworkErr(err);
        }
    }

    const getAllMaterials = async () => {
        try {
            const { data } = await axios.get('/api/materials/all');
            setMaterialsList(data.payload);
        } catch (err) {
            setNetworkErr(err);
        }
    }

    useEffect(() => {
        getProducts();
        getAllTypes();
        getAllMaterials();
    }, [])

    const image_preview = event => {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
            }
        reader.readAsDataURL(event.target.files[0]);
    }

    const handleFileInput = event => {
        setProductPic(event.target.files[0]);
        image_preview(event);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!updateProduct
                && targetType !== '0' 
                && productPic 
                && productName
                && productDescription
                && closingDate
                && new Date(closingDate) > new Date()
                && targetMaterial !== '0') {

                    const product = new FormData();
                    product.append('productPic', productPic);
                    product.append('type_id', targetType);
                    product.append('name', productName);
                    product.append('description', productDescription);
                    product.append('closing_date', closingDate);
                    product.append('material_id', targetMaterial);
                
                    const { data } = await axios.post(`/api/products/add/${brandID}`, product);
                    if (data.payload) {
                        setTargetType('0');
                        setTargetMaterial('0');
                        setProductName('');
                        setProductDescription('');
                        setClosingDate('');
                        setProductPic(null);
                        setImagePreview(null);
                        getProducts();
                    }

            } else if (updateProduct
                && targetType !== '0'  
                && productName
                && productDescription
                && closingDate
                && new Date(closingDate) > new Date()
                && targetMaterial !== '0'
                && imagePreview) {
                    let product = null;
                    if (productPic) {
                        product = new FormData();
                        product.append('productPic', productPic);
                        product.append('type_id', targetType);
                        product.append('name', productName);
                        product.append('description', productDescription);
                        product.append('closing_date', closingDate);
                        product.append('material_id', targetMaterial);
                        product.append('default_pic', imagePreview);

                    } else {
                        product = {
                            type_id: targetType,
                            name: productName,
                            description: productDescription,
                            closing_date: closingDate,
                            default_pic: imagePreview,
                            material_id: targetMaterial,
                        }
                    }

                    const { data } = await axios.put(`/api/products/${targetProduct}`, product);
                    if (data.payload) {
                        setTargetType('0');
                        setTargetMaterial('0');
                        setProductName('');
                        setProductDescription('');
                        setClosingDate('');
                        setProductPic(null);
                        setImagePreview(null);
                        setUpdateProduct(null);
                        getProducts();
                    }
                }

        } catch (err) {
            setNetworkErr(err);
        }
    }

    const handleApprobation = async (productId) => {
        try {
            await axios.patch(`/api/products/${productId}`)
            getProducts()
        } catch (err) {
            setNetworkErr(err)
        }
    }

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`)
            getProducts();
        } catch (err) {
            setNetworkErr(err)
        }
    }

    const handleUpdateProduct = (product) => {
        setTargetProduct(product.id)
        setUpdateProduct(true);
        setTargetType(product.type_id);
        setTargetMaterial(product.textile_id);
        setProductName(product.name);
        setProductDescription(product.description);
        setClosingDate(product.closing_date.slice(0, 10));
        setImagePreview(product.default_pic);
    }

    const hideFeedbackDiv = () => {
        setNetworkErr(null);
    }
    
    if (networkErr) {
        return <Feedback err={networkErr} hideFeedbackDiv={hideFeedbackDiv}/> 
    }

    return(
        <div className='container m-1'>
            <form className='row md-form' onSubmit={handleFormSubmit}>

                <div className='col-md-6'>
                    <select
                        className='custom-select mb-2 mr-sm-2'
                        value={targetType} 
                        onChange={e => setTargetType(e.target.value)}>
                            <option value='0'>-- Please Select a Type --</option>
                            {typesList.map(type => 
                                <option key={type.name+type.id} value={type.id}>{type.name}</option>
                            )}
                    </select>

                    <input 
                        className='form-control mb-2 mr-sm-2'
                        type='text' 
                        placeholder='Enter product name'
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    />
                
                    <textarea 
                        className='form-control mb-2 mr-sm-2'
                        placeholder='Enter your product description'
                        value={productDescription}
                        onChange={e => setProductDescription(e.target.value)}
                    />
                    
                    <input 
                        className='form-control mb-2 mr-sm-2'
                        type='date' 
                        placeholder='Vote closing date'
                        value={closingDate}
                        onChange={e => setClosingDate(e.target.value)}
                    />

                    <select
                        className='custom-select mb-2 mr-sm-2'
                        value={targetMaterial} 
                        onChange={e => setTargetMaterial(e.target.value)}>
                            <option value='0'>-- Main Material --</option>
                            {materialsList.map(material => 
                                <option key={material.name+material.id} value={material.id}>{material.name}</option>
                            )}
                    </select>
                </div>

                <div className='col-md-6'>
                    <div className='custom-file'>
                        <input 
                            className='custom-file-input' 
                            id='fileUpload' 
                            type='file' 
                            accept='image/*' 
                            onInput={handleFileInput} 
                            onChange={e => e.target.value = null} 
                        />
                        
                        <label className='custom-file-label' htmlFor='fileUpload'>
                            Choose the default image
                        </label>
                    </div>

                    {imagePreview 
                        ? <img 
                            className='w-75' 
                            src={imagePreview} 
                            alt='Product preview' 
                            style={{objectFit: 'scale-down'}}
                            />
                        : null
                    }
                </div>

                <button className='btn btn-dark mb-2 mr-sm-2'>Submit</button>              
            </form>
            
            <div className='row text-center'>
                {productsList.map(product => 
                        <ProductCard 
                            key={product.id+product.name+product.default_pic}
                            product={product}
                            handleApprobation={handleApprobation}
                            handleDeleteProduct={handleDeleteProduct}
                            handleUpdateProduct={handleUpdateProduct}
                        />
                    )}
            </div>
        </div>
    )
}