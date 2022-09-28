import { Children, cloneElement } from "react";

const ViewLogicContainer = ({ children }) => {
  const arrayChildren = Children.toArray(children);

  return Children.map(arrayChildren, (child, index) => {
    const isLast = index === arrayChildren.length - 1;
    // console.log("Child: ", child);

    if (!isLast && !child.props.data.url) {
      throw new Error(
        `BreadcrumbItem child no. ${index + 1}
              should be passed a 'src' prop`
      );
    }

    return (
      <>
        {child.props.data.url
          ? cloneElement(child, {
              isLast,
            })
          : //   <div style={{ marginRight: "5px" }}>
            //     {cloneElement(child, {
            //       isLast,
            //     })}
            //   </div>
            null}
        {!isLast && <div style={{ marginRight: "5px" }}></div>}
      </>
    );
  });
};

export default ViewLogicContainer;
