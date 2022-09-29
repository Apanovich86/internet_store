import {FC, useState} from "react";
import classNames from "classnames";
import {IColorModel} from "../components/AddNewColor/types";

interface ISelectGroupProps {
    label: string;
    field: string;
    touched?: boolean | false;
    error?: string | null;
    values: Array<any>;
    selectedValue?: IColorModel;
    colorId?: number;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const initialValue: IColorModel = {
    id: 0,
    name: ""
};



const ColorSelect: FC<ISelectGroupProps> = ({
                                                label,
                                                field,
                                                touched = null,
                                                error = null,
                                                values,
                                                selectedValue,
                                                colorId,
                                                onChange,
                                            }) => {
    const [selectColor, setSelectColor] = useState<IColorModel>(initialValue);
    return (
        <div className="mb-3">
            <label
                htmlFor={field}
                className={classNames(
                    "form-label",
                    {"is-invalid": touched && error},
                    {"is-valid": touched && !error}
                )}
            >
                {label}
            </label>
            <select
                onChange={onChange}
                id={field}
                className="form-select"
                aria-label={label}
            >
                {!selectedValue && <option value="0">Виберіть значення</option>}
                {selectedValue && <option value={colorId}>{selectedValue.name}</option>}
                {values.map((item) => {

                    if (item.name === selectedValue) {
                        setSelectColor(item.name);
                        console.log("item", item);
                        return (
                            <option selected value={item.id} key={item.name}>
                                {item.name}
                            </option>
                        );
                    } else {
                        return (
                            <option value={item.id} key={item.name}>
                                {item.name}
                            </option>
                        );
                    }
                })}
            </select>
            {touched && error && <div className="invalid-feedback">{error}</div>}
            <div>Selected {selectColor.id}-{selectColor.name}</div>
        </div>
    );
};

export default ColorSelect;