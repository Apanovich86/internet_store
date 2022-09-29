import {FC, InputHTMLAttributes, useState, useRef} from "react";
import classNames from 'classnames';
import {Modal, Button, Row, Col} from 'antd';
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    type: string,
    refFormik: (field: string, value: any) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ImageInput: FC<ImageInputProps> = ({
                                             label,
                                             field,
                                             onChange,
                                             touched = null,
                                             error = null,
                                             refFormik,
                                             type = "text"
                                         }: ImageInputProps) => {

    const [curImage, setCurImage] = useState("https://image.freepik.com/free-vector/photo-frame-icon-empty-photo-blank-vector-on-isolated-transparent-background-eps-10_399089-1290.jpg");
    const [visible, setVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLImageElement>(null);

    const OnChangeHandler = async (event: any) => {

        const file = (event.target.files as FileList)[0];
        setCurImage(URL.createObjectURL(file));

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function () {
            console.log('RESULT', fileReader.result);
            refFormik(field, fileReader.result);
        }
        await setVisible(true);

    }

    return (
        <div className="mb-3 ">
            <label htmlFor={field} className="form-label m20">

                <img src={curImage}
                     alt="photo"
                     width="150"
                     style={{cursor: "pointer"}}/>
            </label>
            <input
                type="file"
                name={field}
                className={classNames("form-control mb20",
                    {"is-invalid": touched && error},
                    {"is-valid": touched && !error}
                )}
                id={field}
                onChange={OnChangeHandler}
            />
            {(touched && error) && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default ImageInput;