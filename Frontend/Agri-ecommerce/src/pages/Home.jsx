
import Hero from "../Component/Hero";
import Categories from "../Component/Categories";
import Footer from "../Component/Footer";
import WhatWeDO from "../Component/WhatWeDo";
import Industry from "../Component/Industry";

const Home=() => {
    return(
        
        <div>
         
             <Hero/>
             <WhatWeDO/>
            <Industry/>
            <Categories/>
            <Footer />
        </div>
    );
};
export default Home;
