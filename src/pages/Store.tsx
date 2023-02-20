import StoreItems from "../data/items.json";
import { Col, Row, Dropdown, Form, Container } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useState, useEffect } from "react";
// import React, { lazy, Suspense } from "react";
// import Spinner from "react-bootstrap/Spinner";

// const StoreComponent = lazy(() => import("../components/StoreComponent"));

export function Store() {
  const [data, setData] = useState(StoreItems);
  const [searchedData, setSearchedData] = useState<any>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSort = (sortType: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortType === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setData(sortedData);
  };

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchedData(filteredData);
  }, [searchedData, searchInput]);

  return (
    <>
      {/* <h1>Our Store</h1> */}
      <Container className="d-flex mb-3">
        <Form className="me-auto">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchInput}
            onChange={handleSearch}
          />
        </Form>
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
            Sort by Price
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSort("desc")}>
              High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort("asc")}>
              Low to High
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      <Row md={2} xs={1} lg={3} className="g-4">
        {searchedData.length > 0
          ? searchedData.map((item) => (
              <Col key={item.id}>
                <StoreItem {...item} />
              </Col>
            ))
          : data.map((item) => (
              <Col key={item.id}>
                <StoreItem {...item} />
              </Col>
            ))}
      </Row>
    </>
  );
}
export default Store;
