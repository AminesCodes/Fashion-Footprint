import React from 'react'
import axios from 'axios'
import UsersProductCardComponent from './UsersProductCardComponent'

class UsersHome extends React.Component {
    constructor() {
        super()
        this.state = {
            brand_id: '',
            material_id: '',
            type_id: '',
            brandOptions: [],
            materialOptions: [],
            typeOptions: [], 
            productsArr:[]
        }
    }

    componentDidMount() {
        this.handleBrandOptions()
        this.handleTypeOfGarnment()
        this.handleAllMaterials()
    }

    handleBrandOptions = async () => {
        let allBrands = '/api/brands/'
        try {
            let { data } = await axios.get(allBrands)
            this.setState({
                brandOptions: data.payload
            })
            console.log(data.payload)
            console.log(this.state)
        } catch (error) {
            console.log(error)
        }

    }

    handleTypeOfGarnment = async () => {
        let allTypes = '/api/types/all'
        try {
            let { data } = await axios.get(allTypes)
            console.log(data.payload)
            this.setState({
                typeOptions: data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleAllMaterials = async () => {
        let allMaterials = '/api/materials/all'
        try {
            let { data } = await axios.get(allMaterials)
            console.log(data.payload)
            this.setState({
                materialOptions: data.payload
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleInput = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }



    handleProductByFilter = async () => {
        const {brand_id, material_id, type_id} = this.state
        // let brandId = Number(brand_id)
        let getProductsQuery = `/api/products/filter/${brand_id}/${material_id}/${type_id}`

        try {
            let productData = await axios.get(getProductsQuery)
            console.log(productData)
        } catch (error) {
            console.log(error)
        }

    }
    
    handleProductByBrand = async () => {
        const { brand_id } = this.state
        let brandId = Number(brand_id)
        let getProductsQuery = `/api/products/brand/${brandId}/all`

        try {
            let productData = await axios.get(getProductsQuery)
            console.log(productData)
        } catch (error) {
            console.log(error)
        }

    }

    handleProductByMaterial = async() => {
        const {material_id} = this.state
        let getProductByMaterialQuery = `/api/products/materials/${material_id}`
        try{
            let productInfo = await axios.get(getProductByMaterialQuery)
            console.log(productInfo)
        } catch(error){
            console.log(error)
        }

    }

    handleProductByType = async() =>{
        const {type_id} = this.state
        let getProductsByTypeQuery = `/api/products/type/${type_id}`
        try{
            let productByType = await axios.get(getProductsByTypeQuery)
            console.log(productByType)
        } catch(error){
            console.log(error)
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        console.log('submitted')
        this.handleProductByFilter()
        // if(Number(brand_id) !== 0){
        //     this.handleProductByBrand()
        // } 
        // if (Number(material_id) !== 0){
        //     this.handleProductByMaterial()
        // }  
        // if(Number(type_id) !==0){
        //     this.handleProductByType()
        // }
    }


    render() {
        const { brandOptions, typeOptions, materialOptions } = this.state
        let brandName = brandOptions.map(el => (
            <option key={el.name} value={el.id}>{el.name}</option>

        ))

        let typeName = typeOptions.map(el => (
            <option key={el.name} value={el.id}>{el.name}</option>
        ))

        let materialName = materialOptions.map(el => (
            <option key={el.name} value={el.id}>{el.name}</option>
        ))

        return (
            <div className='container mt-5'>
                <form onSubmit={this.handleSubmit}>
                    <select id='brand' onChange={this.handleInput}>
                        <option>Select a brand</option>
                        {brandName}
                    </select>

                    <select id='type' onChange={this.handleInput}>
                        <option>Select a type</option>
                        {typeName}
                    </select>

                    <select id='material' onChange={this.handleInput}>
                        <option>Select a material</option>
                        {materialName}
                    </select>
                    <button>Submit</button>
                </form>

                <div className='card-holder'>
                    <UsersProductCardComponent productId = {2} styleId = {1} userId= {this.props.loggedUser.id} />

                </div>
            </div>
        )
    }
}

export default UsersHome