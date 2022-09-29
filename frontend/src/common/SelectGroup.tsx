import {FC} from "react";
import classNames from "classnames";

interface ISelectGroupProps {
    label: string;
    field: string;
    touched?: boolean | false;
    error?: string | null;
    values: Array<any>;
    selectedValue?: string;
    categoryId?: number;
    onChange: (e: React.ChangeEvent<any>) => void;
}

const SelectGroup: FC<ISelectGroupProps> = ({
                                                label,
                                                field,
                                                touched = null,
                                                error = null,
                                                values,
                                                selectedValue,
                                                categoryId,
                                                onChange,
                                            }) => {
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
                {selectedValue && <option value={categoryId}>{selectedValue}</option>}
                {values.map((item) => {
                    if (item.name === selectedValue) {
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
        </div>
    );
};

export default SelectGroup;