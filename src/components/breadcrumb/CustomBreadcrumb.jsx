import { Link } from "react-router-dom";
import "./breadcrumb.scss";

const CustomBreadcrumb = ({ items }) => {
  return (
    <nav className="custom-breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">

          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="active">{item.label}</span>
          )}

          {index !== items.length - 1 && (
            <span className="separator"> / </span>
          )}

        </span>
      ))}
    </nav>
  );
};

export default CustomBreadcrumb;
