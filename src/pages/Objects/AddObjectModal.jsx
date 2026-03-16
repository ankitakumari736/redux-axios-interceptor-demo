import { useState } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";

const AddObjectModal = ({ onClose, setObjects }) => {
    const { call, loading } = useApi(API_URLS.ADD_OBJECT);

    const [name, setName] = useState("");
    const [data, setData] = useState("");

    const handleSubmit = () => {
        let parsedData = {};

        try {
            parsedData = data ? JSON.parse(data) : {};
        } catch {
            alert("Invalid JSON format");
            return;
        }

        const payload = {
            name,
            data: parsedData,
        };

        call(payload, (res) => {
            setObjects((prev) => [...prev, res]);
            onClose();
        });
    };

    return (
        <div className="modal">
            <div className="modal-box">
                <h3>Add Object</h3>

                <input
                    placeholder="Object Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder='Enter JSON e.g. {"price":200}'
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <div className="modal-actions">
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>

                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddObjectModal;
