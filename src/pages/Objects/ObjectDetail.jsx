import { useEffect, useState } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";

const ObjectDetail = ({ id, onClose }) => {
  const [name, setName] = useState("");
  const [data, setData] = useState({});

  const { call } = useApi({
    ...API_URLS.GET_OBJECT_BY_ID,
    url: API_URLS.GET_OBJECT_BY_ID.url(id),
  });

  const patchApi = useApi({
    ...API_URLS.PATCH_OBJECT,
    url: API_URLS.PATCH_OBJECT.url(id),
  });

  useEffect(() => {
    call(null, (res) => {
      setName(res.name);
      setData(res.data || {});
    });
  }, [id]);

  const updateName = () => {
    patchApi.call({ name });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Object Detail</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={updateName}>Update Name</button>

        <pre>{JSON.stringify(data, null, 2)}</pre>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ObjectDetail;
