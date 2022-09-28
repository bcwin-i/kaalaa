import React from "react";
import BreadcrumbItem from "../components/BreadcrumbItem";
import Breadcrumbs from "../components/Breadcrumbs";

const Bread = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem link="https://goibibo.com/">Goibibo</BreadcrumbItem>

      <BreadcrumbItem link="https://goibibo.com/hotels/">Hotels</BreadcrumbItem>

      <BreadcrumbItem>A Fancy Hotel Name</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default Bread;
