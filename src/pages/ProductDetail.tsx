import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {removeCollectionsPrefix} from "../utiles/utiles";
import type {Swiper as SwiperClass} from 'swiper'

const ProductDetail = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const productId = removeCollectionsPrefix('/product/', pathname)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

    const [cartAdded, setCartAdded] = useState(false)
    const [selectedSize, setSelectedSize] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [notice, setNotice] = useState(false);

    const checkCartItem = ({id, image, title, price}: any) => {

    };

    const handleInputChange = (value: string) => {

    }

    const handleClick = () => {

    }
    
    return (
        <div>dd</div>
    )
};

export default ProductDetail;
