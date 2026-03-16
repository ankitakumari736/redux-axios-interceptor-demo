import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";

const ObjectCard = ({ object, setObjects }) => {

    const { call: deleteObject } = useApi({
        ...API_URLS.DELETE_OBJECT,
        url: API_URLS.DELETE_OBJECT.url(object.id),
    });


    const canDelete = String(object.id).length > 2;

    const handleDelete = (e) => {
        e.stopPropagation();

        if (!canDelete) {
            alert("Default objects cannot be deleted (API limitation)");
            return;
        }

        deleteObject(null, () => {
            setObjects(prev =>
                prev.filter(o => o.id !== object.id)
            );
        });
    };

    return (
        <div className="object-card">

            <h4>{object?.name}</h4>
            <p>ID: {object?.id}</p>

            {canDelete && (
                <button onClick={handleDelete}>
                    Delete
                </button>
            )}

        </div>
    );
};

export default ObjectCard;
