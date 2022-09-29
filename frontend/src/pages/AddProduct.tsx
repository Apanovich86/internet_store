import React, {useState, ChangeEvent} from "react";
import {multipleFilesUpload} from "../services/file-upload.service";
import ProductService from "../services/product.service";
import {IProduct} from "../types/type";

const AddProduct: React.FC = () => {
    const initialProductState = {
        id: 0,
        imagePath: "",
        categoryId: 0,
        title: "",
        price: 0,
        description: "",
        availability: false
    };

    const [product, setProduct] = useState<IProduct>(initialProductState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [multipleFiles, setMultipleFiles] = useState<File[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProduct({...product, [name]: value});
    };

    const saveProduct = () => {
        var data = {
            id: product.id,
            imagePath:product.imagePath,
            categoryId: product.categoryId,
            title: product.title,
            price: product.price,
            description: product.description,
            availability: product.availability
        };

        ProductService.create(data)
            .then((response: any) => {
                setProduct({
                    id: response.product.id,
                    imagePath:response.product.imagePath,
                    categoryId: response.product.categoryId,
                    title: response.product.title,
                    price: response.product.price,
                    description: response.product.description,
                    availability: response.product.availability
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    };

    const newProduct = () => {
        setProduct(initialProductState);
        setSubmitted(false);
    }

    const MultipleFilesChange = (e: any) => {
        setMultipleFiles(e.target.files)
        console.log('multipleFiles', e.target.files);
    }

    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);

        }
        console.log('multipleFile[i]', multipleFiles);
        await multipleFilesUpload(formData);

    }

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Ви успішно додали!</h4>
                    <button
                        className="btn btn-success"
                        onClick={newProduct}
                    >
                        Додати
                    </button>
                </div>
            ) : (
                <div className="cartProduct">
                    <div className="form-group">
                        <input type="number"
                               className="form-control"
                               id="categoryId"
                               required
                               value={product.categoryId}
                               onChange={handleInputChange}
                               name="categoryId"
                               placeholder="Категорія"
                        />
                    </div>

                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id="title"
                               required
                               value={product.title}
                               onChange={handleInputChange}
                               name="title"
                               placeholder="Назва"
                        />
                    </div>

                    <div className="form-group">
                        <input type="number"
                               className="form-control"
                               id="price"
                               required
                               value={product.price}
                               onChange={handleInputChange}
                               name="price"
                               placeholder="Ціна"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={product.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    
                    <div>
                    <h1>Select your files</h1>
                    <input
                        type="file"
                        multiple//To select multiple files
                        onChange={MultipleFilesChange}
                    />
                    <button onClick={UploadMultipleFiles}
                    >Send Files
                    </button>
                    </div>
                    
                    <button onClick={saveProduct} className="btn btn-success">
                        Додати
                    </button>
                    
                </div>
                    )}
                </div>
            );
            };

            export default AddProduct;
