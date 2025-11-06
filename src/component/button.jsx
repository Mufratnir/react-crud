import React from 'react';

const Button = (props) => {
    return (
        <div>
            <button className={"pt-2.5 pb-2.5 pl-6 pr-6 border-2 border-black rounded-full cursor-pointer"} onClick={props.value}>{props.title}</button>
        </div>
    );
};

export default Button;