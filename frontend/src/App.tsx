import './App.css';
import React from "react";
import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import {Layout} from "./Layout";
import Register from "./Register/Register";
import Products from "./pages/Products";
import ProductDetails from "./components/MultiImagesProductsList/ProductDetails/ProductDetails";
import Profile from "./Profile/Profile";
import BoardAdmin from "./pages/BoardAdmin";
import BoardUser from "./pages/BoardUser";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import CategoryAdmin from "./Category/CategoryAdmin";
import CategoriesAdm from "./Category/CategoriesAdm";
import AddNewCategory from "./components/AddNewCategory";
import AddNewColor from "./components/AddNewColor";
import Category from "./Category/Category";
import UpdateCategory from "./components/UpdateCategory";
import CreateCategory from "./Category/CreateCategory";
import CategoryList from "./components/CategoryList";
import ColorList from "./components/ColorList";
import CategorySearch from "./components/CategoryById";
import ColorSearch from "./components/ColorById";
import ProductList from "./components/MultiImagesProductsList/ProductList/ProductList";
import AddNewProduct from "./components/MultiImagesProductsList/AddNewProduct/AddNewProduct";
import ProductsByCategory from "./components/MultiImagesProductsList/ProductsByCategory/ProductsByCategory";
import ProductById from "./components/MultiImagesProductsList/ProductById/ProductById";
import ShopingCart from "./components/Cart/ShopingCart";
import ProductByColor from "./components/MultiImagesProductsList/ProductByColor/ProductByColor";

function App() {

    return (
        <>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Products/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        {/*<Route path="products/:id" element={<ProductDetails />} />*/}
                        <Route path="admin/" element={<BoardAdmin/>}/>

                        {<Route
                            path="products/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductDetails/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="productsById/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductById/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="productsByCategory/:id/viewProducts/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductDetails/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="productsByColor/:id/viewProducts/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductDetails/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="categories/all"
                            element={
                                <Suspense fallback={null}>
                                    <CategoryList/>
                                </Suspense>
                            }
                        />}
                        {<Route
                            path="category/:id"
                            element={
                                <Suspense fallback={null}>
                                    <CategorySearch/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="productsByCategory/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductsByCategory/>
                                </Suspense>
                            }
                        />}

                        {/*{<Route*/}
                        {/*    path="productsByCategory/:id/viewProducts/:id"*/}
                        {/*    element={*/}
                        {/*        <Suspense fallback={null}>*/}
                        {/*            <ProductDetails/>*/}
                        {/*        </Suspense>*/}
                        {/*    }*/}
                        {/*/>}*/}

                        {<Route
                            path="productsByColor/:id"
                            element={
                                <Suspense fallback={null}>
                                    <ProductByColor/>
                                </Suspense>
                            }
                        />}

                        {<Route path="/category/add" element={<AddNewCategory/>}/>}
                        {<Route path="/category/update/:id" element={<UpdateCategory/>}/>}


                        {<Route
                            path="colors/all"
                            element={
                                <Suspense fallback={null}>
                                    <ColorList/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="products/add"
                            element={
                                <Suspense fallback={null}>
                                    <AddNewProduct/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="products"
                            element={
                                <Suspense fallback={null}>
                                    <ProductList/>
                                </Suspense>
                            }
                        />}

                        {<Route
                            path="cart"
                            element={
                                <Suspense fallback={null}>
                                    <ShopingCart/>
                                </Suspense>
                            }
                        />}
                        {<Route path="/color/add" element={<AddNewColor/>}/>}

                        {/*{<Route path="/products/add" element={<AddNewProduct />} />}*/}


                        {/*{<Route path="/products" element={<ProductList />} />}*/}

                        {/*{<Route path="/productsAll" element={<ProductListClient />} />}*/}

                        {/*<Route path="product/add" element={<AddProduct />} />*/}

                        <Route path="user" element={<BoardUser/>}/>
                        <Route path="products" element={<ProductsList/>}/>
                        <Route path="product/add" element={<AddProduct/>}/>

                        {/*<Route path="/category/add" element={<AddNewCategory />} />*/}
                        <Route path="/updateCategory/:id" element={<UpdateCategory/>}/>
                        {/*<Route path="/category/update/:id" element={<AddCategory />} />*/}
                    </Route>
                </Routes>
        </>
    );
}

export default App;
