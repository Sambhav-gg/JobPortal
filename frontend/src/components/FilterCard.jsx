import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from "@/redux/jobSlice";
import Select from 'react-select';

const filterData = [
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "40k-1lakh", "1Lakh to 5Lakh"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country: 'India' }),
                });
                const data = await res.json();

                // react-select expects { value: '', label: '' }
                const formattedCities = data.data.map((city) => ({
                    value: city,
                    label: city,
                }));

                setCities(formattedCities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    const handleCityChange = (selectedOption) => {
        if (selectedOption) {
            dispatch(setSearchedQuery(selectedOption.value));
        } else {
            dispatch(setSearchedQuery(''));
        }
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className="mt-3" />

            {/* ✅ Searchable City Dropdown */}
            {loading ? (
                <p>Loading cities...</p>
            ) : (
                <Select
                    options={cities}
                    onChange={handleCityChange}
                    placeholder="Search and select city"
                    isClearable
                    className="mt-4"
                />
            )}

            {/* Radio Buttons */}
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="mt-6">
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-bold text-lg mb-2'>
                            {data.filterType}
                        </h1>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
