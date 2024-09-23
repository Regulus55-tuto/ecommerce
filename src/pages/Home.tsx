import Faq from "components/Home/Faq";
import Intro from "components/Home/Intro";
import Main from "components/Home/Main";
import React from "react";
import ImageRarity from "../components/Home/ImageRarity";

const Home = () => {
    return (
        <>
            <Main/>
            <Intro/>
            <ImageRarity/>
            <Faq/>
        </>
    );
};

export default Home;
