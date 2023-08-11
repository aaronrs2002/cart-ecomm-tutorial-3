import React, { useEffect, useState } from "react";


const Shop = (props) => {
    let [loaded, setLoaded] = useState(false);
    let [randomList, setRandomList] = useState([]);


    const SelectProduct = (whichItem) => {
        console.log("JSON.stringify(whichItem): " + JSON.stringify(whichItem));
        props.setActiveModule((activeModule) => "productDetails");
        localStorage.setItem("activeModule", "productDetails");
        props.setSelectedItem((selectedItem) => whichItem)


    }


    useEffect(() => {
        if (loaded === false && (typeof props.items) == "object" && props.items.length > 0) {
            let tempRandomList = [];
            let tempNumList = [];
            while (tempRandomList.length <= 7) {
                let newNum = Math.floor(Math.random() * props.items.length);
                if (tempRandomList.indexOf(newNum) === -1 && tempNumList.indexOf(newNum) === -1) {
                    tempNumList.push(newNum);
                    tempRandomList.push(props.items[newNum]);
                }
            }
            if (tempRandomList.length === 8) {
                setRandomList((randomList) => tempRandomList);
            }
            setLoaded((loaded) => true);
        }
    });


    return (
        <div className="row navPadding animated bounceInUp">
            {randomList.length !== 0 ? (
                randomList.map((product, i) => {
                    if (product !== null) {
                        return (
                            <div className="col-md-6" key={i}>
                                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative previewPanel">
                                    <div className="col p-4 d-flex flex-column position-static">
                                        <strong className="d-inline-block mb-2 text-primary text-capitalize">
                                            {product.itemName !== undefined ? product.itemName.substring(0, 75) : null}
                                            ...
                                        </strong>


                                        <div className="card-text mb-auto desktopOnly itemDescription">
                                            {product.details !== undefined ?
                                                product.details.substring(0, 90) + "..."
                                                : null}
                                        </div>

                                        <a
                                            href="#" onClick={() => SelectProduct(randomList[i])}
                                            className="btn btn-secondary w-100" data-id={randomList[i]}

                                        >
                                            View Details
                                        </a>

                                    </div>
                                    <div
                                        className="col-auto d-none d-lg-block productPreviewImg mobileShow "
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(" +
                                                product.images[0] +
                                                ")",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    }
                })
            ) : (
                <div className="loader center"></div>
            )}
        </div>
    )
}
export default Shop;

/*

 

*/