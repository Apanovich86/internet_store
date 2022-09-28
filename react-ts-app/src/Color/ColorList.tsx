import React, {FC, useState, useEffect} from 'react';
import {MdKeyboardArrowDown} from "react-icons/md";
import IColor from '../types/type';
import ColorService from ".././services/color.service";
import {Link} from 'react-router-dom';

const ColorList = () => {
    const [colors, setColors] = useState<Array<IColor>>([]);
    const [currentColor, setCurrentColor] = useState<IColor | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);

    useEffect(() => {
        retrievColors();
    }, []);

    const retrievColors = () => {
        ColorService.getAll()
            .then((response: any) => {
                setColors(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    const refreshList = () => {
        retrievColors();
        setCurrentColor(null);
        setCurrentIndex(-1);
    }

    const setActiveColor = (color: IColor, index: number) => {
        setCurrentColor(color);
        setCurrentIndex(index);
        console.log("colorIndex", index);
    }

    return (
        <div className="category-list">
            КОЛІР
            <MdKeyboardArrowDown size={18}/>
            <div className="dropdown-content">
                {colors &&
                    colors.map((color, index) => (
                        <Link to={`productsByColor/${color.id}`}>
                            {color.name}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default ColorList;