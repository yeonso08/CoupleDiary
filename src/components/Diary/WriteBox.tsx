import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

const WriteBox = ({ onChange, value } : { onChange : () => void, value : string }) => {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
        [{ 'header': 1 }, { 'header': 2 }, { 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }, { 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']
    ];
    const modules = {
        toolbar: toolbarOptions

    };

    return (
        <ReactQuill
            style={{ height: "40vh", background: "white", overflow: "auto" }}
            value={value}
            onChange={onChange}
            modules={modules}
        />
    );
}

export default WriteBox;
