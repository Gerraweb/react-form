import React, { useState } from 'react'
import { TextInput, ToggleInput, SelectInput, RadioInput, CheckboxInput } from '@components/form';

const OPTIONS = [
    { title: "Test 1", value: "DkxmXubdm" },
    { title: "Test 2", value: "cMCin22mckl" },
    { title: "Test 3", value: "Vkck2nnod" }
]

const Demo = () => {
    const [data, setData] = useState({
        text: "",
        toggle: false,
        select: "",
        radio: "",
        checkbox: []
    });

    const onChange = (result: Partial<typeof data>) => {
        setData({ ...data, ...result });
    }

    return (
        <div className="demo">
            <TextInput
                title="Text input example"
                name="text"
                value={data.text}
                onChange={onChange}
            />
            <ToggleInput 
                title="Toggle input example"
                name="toggle"
                value={data.toggle}
                onChange={onChange}
            />
            <SelectInput
                title="Select example"
                name="select"
                value={data.select}
                options={OPTIONS}
                onChange={onChange}
            />
            <RadioInput
                title="Radio example"
                name="radio"
                value={data.radio}
                options={OPTIONS}
                onChange={onChange}
            />
            <CheckboxInput
                title="Checkbox example"
                name="checkbox"
                value={data.checkbox}
                options={OPTIONS}
                onChange={onChange}
            />
        </div>
    )
}

export default Demo;