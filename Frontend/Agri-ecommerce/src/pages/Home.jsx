import Navbar from "../Component/Navbar";
import Hero from "../Component/Hero";
import Categories from "../Component/Categories";

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
        
            <Footer />
        </div>
    );
};
export default Home;
