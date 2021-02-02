import { Global as GlobalStyle } from "@emotion/react";

const fonts = () => (
    <GlobalStyle
        styles={`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap');
`}
    />
);

export default fonts;
