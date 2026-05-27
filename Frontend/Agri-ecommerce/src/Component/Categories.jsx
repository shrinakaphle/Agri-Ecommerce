const Categories =() =>{
    const categories =[
        "Cow Feed",
        "Buffalo Feed",
        "Pig Feed",
        "Fish Feed"
    ];
    return(
        <section className="categories">
            <h2>Shop By Animal Category</h2>
            <div classname= "category-grid">
                {categories.map((item,index)=>(
                    <div className="category-card" key={index}>
                        <h3>{item}</h3>
                        <button>Explore</button>
                    </div>

                ))}
            </div>
        </section>
    )
};
export default Categories;