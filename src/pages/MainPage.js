import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./MainPage.css";
function FilterModal({ isFilterOpen, closeFilter }) {
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const handlePurposeClick = (purpose) => {
        setSelectedPurpose(purpose === selectedPurpose ? '' : purpose);
    };
    const handleRegionClick = (region) => {
        setSelectedRegion(region === selectedRegion ? '' : region);
    };
    if (!isFilterOpen)
        return null;
    return (_jsx("div", { className: "filter_overlay", onClick: closeFilter, children: _jsxs("div", { className: "filter_modal_content", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "filter_text", children: "\uBAA9\uC801" }), _jsx("div", { className: "filter_line" }), _jsx("div", { className: "purpose_container", children: ["전체", "학업 / 자격증", "취업 / 면접", "개발 / 프로그래밍", "자기 계발"].map((item) => (_jsx("p", { onClick: () => handlePurposeClick(item), className: selectedPurpose === item ? "selected" : "", children: item }, item))) }), _jsx("div", { className: "filter_text", children: "\uC9C0\uC5ED" }), _jsx("div", { className: "filter_line" }), _jsx("div", { className: "purpose_container", children: ["전체", "서울특별시", "부산광역시", "인천광역시", "대전광역시", "경상남도", "경상북도"].map((item) => (_jsx("p", { onClick: () => handleRegionClick(item), className: selectedRegion === item ? "selected" : "", children: item }, item))) }), _jsxs("div", { className: "filter_buttons", children: [_jsx("button", { className: "filter_clear", onClick: closeFilter, children: "\uCDE8\uC18C" }), _jsx("button", { className: "filter_close", onClick: closeFilter, children: "\uD655\uC778" })] })] }) }));
}
function CreateRoomModal({ isOpen, onClose, onCreate }) {
    const [roomTitle, setRoomTitle] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const DEFAULT_PROFILE_IMAGE = "/profileD.jpeg";
    const [selectedImage, setSelectedImage] = useState(DEFAULT_PROFILE_IMAGE);
    const options = Array.from({ length: 30 }, (_, i) => i + 1);
    const categories = [
        { value: "all", label: "전체" },
        { value: "study", label: "학업/자격증" },
        { value: "job", label: "취업/면접" },
        { value: "game", label: "게임/프로그래밍" },
        { value: "self", label: "자기계발" },
    ];
    const regions = [
        { value: "all", label: "전체" },
        { value: "seoul", label: "서울특별시" },
        { value: "busan", label: "부산광역시" },
        { value: "incheon", label: "인천광역시" },
        { value: "daejeon", label: "대전광역시" },
        { value: "gyeongnam", label: "경상남도" },
        { value: "gyeongbuk", label: "경상북도" },
    ];
    if (!isOpen)
        return null;
    const handleCreate = () => {
        if (!roomTitle.trim())
            return alert("방 제목을 입력해주세요.");
        onCreate({
            title: roomTitle,
            description: roomDescription,
            image: selectedImage,
        });
        setRoomTitle("");
        setRoomDescription("");
        setSelectedImage(DEFAULT_PROFILE_IMAGE);
        onClose();
    };
    const handleCancelCreate = () => {
        setRoomTitle("");
        setRoomDescription("");
        setSelectedImage(DEFAULT_PROFILE_IMAGE);
        onClose();
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (_jsx("div", { className: "create_overlay", onClick: onClose, children: _jsxs("div", { className: "create_modal_content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "create_text", children: [_jsx("h3", { children: "\uC2A4\uD130\uB514 \uBC29 \uC0DD\uC131" }), _jsx("div", { className: "filter_line" })] }), _jsxs("div", { className: "create_roomtitle", children: ["\uC2A4\uD130\uB514\uBC29 \uC774\uB984", _jsx("input", { type: "text", placeholder: "\uBC29 \uC81C\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694.", value: roomTitle, onChange: (e) => setRoomTitle(e.target.value) })] }), _jsxs("div", { className: "create_explanation", children: ["\uC124\uBA85", _jsx("textarea", { placeholder: "\uBC29 \uC124\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694.", value: roomDescription, onChange: (e) => setRoomDescription(e.target.value) })] }), _jsx("div", { className: "Main-profile", children: " \uD504\uB85C\uD544 \uC774\uBBF8\uC9C0 " }), _jsxs("div", { className: "Main-profileimage", children: [_jsx("img", { src: selectedImage, alt: "\uD504\uB85C\uD544", className: "profile-wide-img" }), _jsx("input", { type: "file", accept: "image/*", id: "profile-image-upload", style: { display: "none" }, onChange: handleImageChange }), _jsx("button", { onClick: () => document.getElementById("profile-image-upload")?.click(), className: "profile-select-button", children: "\uCC3E\uAE30" })] }), _jsx("div", { className: "maximum-people", children: " \uCD5C\uB300 \uC778\uC6D0 \uC218 " }), _jsxs("select", { className: "peoplecount", id: "peopleCount", children: [_jsx("option", { value: "", children: "\uC778\uC6D0 \uC120\uD0DD" }), options.map((num) => (_jsxs("option", { value: num, children: [num, "\uBA85"] }, num)))] }), _jsx("div", { className: "purpose-select", children: " \uBAA9\uC801 " }), _jsx("select", { className: "purpose-category", id: "category", children: categories.map((cat) => (_jsx("option", { value: cat.value, children: cat.label }, cat.value))) }), _jsx("div", { className: "region-select", children: " \uC9C0\uC5ED " }), _jsx("select", { className: "region-category", id: "region", children: regions.map((region) => (_jsx("option", { value: region.value, children: region.label }, region.value))) }), _jsxs("div", { className: "create-buttons", children: [_jsx("button", { className: "create-buttons-cancel", onClick: handleCancelCreate, children: "\uCDE8\uC18C" }), _jsx("button", { className: "create-buttons-close", onClick: handleCreate, children: "\uC0DD\uC131" })] })] }) }));
}
function MainPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [studyRooms, setStudyRooms] = useState([]);
    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const toggleFilter = () => setIsFilterOpen(prev => !prev);
    const closeFilter = () => setIsFilterOpen(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);
    const addRoom = (room) => {
        setStudyRooms(prev => [...prev, room]);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "main_header", children: [_jsx("div", { className: "main_logo", children: "Logo" }), _jsxs("div", { className: "main_right", children: [_jsx("div", { className: "main_alarm" }), _jsx("div", { className: "main_profile" }), _jsx("div", { className: "main_name", children: "\uB3C4\uAD6C\uB9AC \uB2D8" }), _jsx("div", { className: "main_menu", onClick: toggleMenu })] })] }), isMenuOpen && (_jsx("div", { className: "menu_overlay", onClick: toggleMenu, children: _jsxs("div", { className: "menu_modal_content", onClick: (e) => e.stopPropagation(), children: [_jsx("p", { children: "\uB0B4 \uC2A4\uD130\uB514\uBC29" }), _jsx("p", { children: "\uB0B4 \uC815\uBCF4" }), _jsx("p", { children: "\uB85C\uADF8\uC544\uC6C3" })] }) })), _jsxs("div", { className: "main_box", children: [_jsx("form", { className: "main_search", children: _jsx("input", { className: "search_txt", type: "text", placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694." }) }), _jsx("div", { className: "main_box_search" })] }), _jsxs("div", { className: "main_button", children: [_jsx("button", { className: "main_filter", onClick: toggleFilter, children: "\uD544\uD130" }), _jsx("div", { className: "main_createroom", onClick: openCreateModal, children: "\uBC29 \uC0DD\uC131" })] }), _jsx(FilterModal, { isFilterOpen: isFilterOpen, closeFilter: closeFilter }), _jsx(CreateRoomModal, { isOpen: isCreateModalOpen, onClose: closeCreateModal, onCreate: addRoom }), _jsx("div", { className: "grid_parent", children: _jsx("div", { className: "grid-container", children: studyRooms.map((room, i) => (_jsxs("div", { className: "grid-room", children: [_jsx("img", { src: room.image, alt: "Room", className: "room-profile-img" }), _jsx("div", { className: "room-label", children: room.title })] }, i))) }) })] }));
}
export default MainPage;
