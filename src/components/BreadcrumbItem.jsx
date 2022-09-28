function BreadcrumbItem({ isLast, children }) {
  return (
    <li
      style={{
        color: isLast ? "black" : "blue",
      }}
    >
      {children}
    </li>
  );
}

export default BreadcrumbItem