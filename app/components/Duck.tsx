import React from 'react';

const Duck: React.FC = () => {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
/*
      _
   >(.)__
    (___/ 
    "Quack!"
*/
        `,
            }}
            type="text/plain"
            data-ascii-duck
        />
    );
};

export default Duck;