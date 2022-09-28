import { Children, cloneElement } from "react";

function Breadcrumbs({ children }) {
  const arrayChildren = Children.toArray(children);

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
      }}
    >
      {Children.map(arrayChildren, (child, index) => {
        const isLast = index === arrayChildren.length - 1;

        if (!isLast && !child.props.link) {
          throw new Error(
            `BreadcrumbItem child no. ${index + 1}
            should be passed a 'link' prop`
          );
        }

        return (
          <>
            {child.props.link ? (
              <a
                href={child.props.link}
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                <div style={{ marginRight: "5px" }}>
                  {cloneElement(child, {
                    isLast,
                  })}
                </div>
              </a>
            ) : (
              <div style={{ marginRight: "5px" }}>
                {cloneElement(child, {
                  isLast,
                })}
              </div>
            )}
            {!isLast && <div style={{ marginRight: "5px" }}></div>}
          </>
        );
      })}
    </ul>
  );
}

export default Breadcrumbs