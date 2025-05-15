import { jsx as _jsx } from "react/jsx-runtime";
const GoogleIconButton = ({ onClick }) => {
    return (_jsx("button", { onClick: onClick, style: {
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
        }, children: _jsx("img", { src: "/google_login.png", alt: "Google login", style: { width: '100px', height: '25px' } }) }));
};
export default GoogleIconButton;
