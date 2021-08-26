import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import { useProducts } from '../../context'
import Webgen from '../../assets/Webgen'
import './modal.scss'
const Modal = ({ setModal, modal }) => {

    const initialState = {
        id: '',
        name: '',
        price: '',
        description: '',
        image: null,
        imageLink: ''
    }
    const [state, setState] = useState(initialState)
    const { addProduct, updateProduct } = useProducts()
    console.log(state)
    useEffect(() => {
        modal.product && setState(modal.value)
    }, [modal])

    const setModalState = (event) => {
        console.log(event.target.type, event.target.id)
        if (event.target.type === 'file' && event.target.files[0]) {
            setState({ ...state, image: event.target.files[0], imageLink: URL.createObjectURL(event.target.files[0]) })
            return
        }
        setState({ ...state, [event.target.id]: event.target.value })
    }
    console.log(state)
    const closeModal = (event) => {
        console.log(event.target.tagName)
        event.target.tagName === 'DIV' && setModal({ ...modal, state: false })
    }

    const addProductAndCloseModal = () => {
        addProduct(state)
        setModal(false)
    }

    const updateProductAndCloseModal = () => {
        updateProduct(state)
        setModal(false)
    }

    const updateORaddProduct = (e) => {
        e.preventDefault()
        if (modal.product) {
            updateProductAndCloseModal()
        } else {
            addProductAndCloseModal()
        }
    }

    return (
        <div className='modal'
            onClick={closeModal}
        >

            <form onChange={setModalState} className='modal_form'>
                {state.imageLink ? <img className='modal_image'
                    src={state.imageLink}
                    alt={state.name}
                /> : <Webgen colorShadow='#1e7e9c' colorFront='#cff0fa' styleClass='modal_image' />}
                <label
                    className='label_custom'
                    for='name'>Name</label>
                <input
                    className='input_custom'
                    id='name'
                    type='text'
                    required
                    value={state.name} />
                <label
                    className='label_custom'
                    for='price' >Price</label>
                <input
                    className='input_custom'
                    id='price'
                    type='number'
                    required
                    value={state.price} />
                <label
                    className='label_custom'
                    for='description'>Description</label>
                <textarea
                    className='input_custom'
                    id='description'
                    type='text'
                    maxLength='40'
                    required
                    value={state.description} />
                <label for='image'>
                    <span className='modal_upload_image_label'> Upload Image </span>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <input className='modal_imageInput' id='image' type='file' />
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={updateORaddProduct}>
                    {modal.product ? 'Update Product' : 'Add Product'}
                </Button>
            </form>
        </div >
    )
}

export default Modal