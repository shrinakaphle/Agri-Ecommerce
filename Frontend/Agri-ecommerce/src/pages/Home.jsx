import Navbar from "../Component/Navbar";
import Hero from "../component/Hero";
import Categories from "../component/Categories";
import Products from "../Component/Products";
import Footer from "../Component/Footer";
import WhatWeDO from "../Component/WhatWeDo";


import Industry from "../Component/Industry";

const Home=() => {
    return(
        <div>
            <Navbar/>
             <Hero/>
             <WhatWeDO/>
            <Industry/>
            <Categories/>
            <Products/>
            <Footer />
        </div>
    );
};
export default Home;
