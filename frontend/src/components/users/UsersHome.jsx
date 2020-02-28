import React from 'react'
import axios from 'axios'
import UsersProductCardComponent from './UsersProductCardComponent'

class UsersHome extends React.Component {
    constructor() {
        super()
        this.state = {
            brand: '',
            material: '',
            type:'',
            brandOptions: [],
            materialOptions: [],
            typeOptions: []
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

    handleInput = (event) =>{
        event.preventDefault()
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleProductByBrand = async () => {
        const {brand} = this.state
        let getProductsQuery = `/api/products/${brand}/all`

        try{
        let productData = await axios.get(getProductsQuery)
        console.log(productData)
        } catch(error) {
            console.log(error)
        }

    }

    handleSubmit = (event) =>{
        event.preventDefault()
        console.log('submitted')
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
                <form onSubmit = {this.handleSubmit}>
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

                <UsersProductCardComponent />
            </div>
        )
    }
}

export default UsersHome