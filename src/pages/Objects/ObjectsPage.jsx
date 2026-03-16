import { useEffect, useState } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import ObjectCard from "./ObjectCard";
import AddObjectModal from "./AddObjectModal";
import "./objects.scss";

const ObjectsPage = () => {

 
  const { call: getObjects, loading } = useApi(API_URLS.GET_OBJECTS);
  const { call: filterObjects } = useApi(API_URLS.FILTER_OBJECTS);


  const [objects, setObjects] = useState([]);   
  const [ids, setIds] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

 
  useEffect(() => {
    getObjects(null, (res) => {
      setObjects(res);     
    });
  }, []);

 
  const handleFilter = () => {

    const idArray = ids
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    filterObjects(idArray, (res) => {
      setObjects(res);  
    });
  };


  const clearFilter = () => {
    setIds("");

    getObjects(null, (res) => {
      setObjects(res);   
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="objects-page">

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          placeholder="Enter IDs (3,5,10)"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
        />

        <button onClick={handleFilter}>Filter</button>
        <button onClick={clearFilter}>Clear</button>
      </div>

      <button
        className="add-btn"
        onClick={() => setShowAddModal(true)}
      >
        + Add Object
      </button>

      <div className="objects-grid">
        {objects.map((obj) => (
          <ObjectCard
            key={obj.id}
            object={obj}
            setObjects={setObjects}
          />
        ))}
      </div>

      {showAddModal && (
        <AddObjectModal
          onClose={() => setShowAddModal(false)}
          setObjects={setObjects}
        />
      )}

    </div>
  );
};

export default ObjectsPage;
