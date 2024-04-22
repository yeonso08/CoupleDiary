import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

const WriteBox = ({ onChange, value } : { onChange : () => void, value : string }) => {
    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "underline"],
            ],
        },
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
