import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.scss";

const Breadcrumb = () => {
    const location = useLocation();

    const pathnames = location.pathname
        .split("/")
        .filter(Boolean);

    const labels = {
        users: "Users",
        products: "Products",
        add: "Add",
        edit: "Edit",
        dashboard: "Dashboard",
        cart: "Cart",
        movies: "Movies",
    };

    const formatLabel = (value) => {
        if (labels[value]) return labels[value];

        return value
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <nav className="breadcrumb">
            <Link to="/">Home</Link>

            {pathnames.map((name, index) => {
                const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;

                // // 🔹 Hide numeric IDs
                // if (!isNaN(name)) {
                //   return null;
                // }
                if (!isNaN(name)) {
                    return (
                        <span key={name}>
                            <span className="breadcrumb-separator"> / </span>
                            <span className="breadcrumb-current">Details</span>
                        </span>
                    );
                }


                return (
                    <span key={routeTo}>
                        <span className="breadcrumb-separator"> / </span>

                        {isLast ? (
                            <span className="breadcrumb-current">
                                {formatLabel(name)}
                            </span>
                        ) : (
                            <Link to={routeTo}>
                                {formatLabel(name)}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
