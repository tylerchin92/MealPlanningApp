import React from 'react';
import {useState, useEffect, useCallback} from 'react';


function MealTypesRadio({typeID, onMealTypeChange}) {

    const [mealTypes, setMealTypes] = useState([]);

    const getMealTypes = async () => {
        await fetch('/mealtypes')
            .then((response) => response.json())
            .then((data) => setMealTypes(data));
        
    };

    useEffect(() => {
        getMealTypes();
    }, []);

    const changeMealType = useCallback(

        e => {
            onMealTypeChange(e.target.value)
        },
        [onMealTypeChange]
    );

    const mapping = () => {
        if (mealTypes !== null) {
            return mealTypes.map((mealType) => (
                <option key = {mealType.typeID} value={mealType.typeID}>{mealType.mealName}</option>
            ));
        };
    };

    return (
        <div>
            <label>Choose Meal Type: </label>
            <select onChange={changeMealType} val={typeID}>
                <option>--Select Meal Type--</option>
                {mapping()}
            </select>
        </div>
    )

};

export default MealTypesRadio

