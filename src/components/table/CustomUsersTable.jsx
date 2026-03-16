import { useState, useMemo } from "react";
import styles from "../table/UserTable.module.scss";

const CustomUsersTable = ({ data = [], loading, columns }) => {

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.wrapper}>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className={styles.search}
      />

      <table className={styles.table}>

        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.accessorKey}
                onClick={index === 0 ? () => handleSort(col.accessorKey) : undefined}
                style={{ cursor: index === 0 ? "pointer" : "default" }}
                className={styles.th}
              >
                {col.header}

                {index === 0 && sortKey === col.accessorKey && (
                  sortOrder === "asc" ? " 🔼" : " 🔽"
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                No users found
              </td>
            </tr>
          ) : (
            paginatedData.map(row => (
              <tr key={row.id}>
                {columns.map(col => (
                  <td key={col.accessorKey} className={styles.td}>
                    {row[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>

    </div>
  );
};

export default CustomUsersTable;
