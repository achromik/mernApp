import * as React from 'react';

export const useInput = (initialValue: string) => {
    const [value, setValue] = React.useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(''),

        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
        },
    };
};
