import StoreItems from '../data/items.json'
import {Col, Row, Dropdown} from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { useState } from 'react';

export function Store(){

    const [data, setData] = useState(StoreItems);

    const handleSort = (sortType: string) => {
        const sortedData = [...data].sort((a, b) => {
          if (sortType === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
    
        setData(sortedData);
      };

    return (
    <>
        {/* <h1>Our Store</h1> */}
        <Dropdown className='mb-3'>
            <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                 Sort by Price
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSort("desc")}>Higher to Low</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort("asc")}>Lower to High</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Row md={2} xs={1} lg={4} className="g-3">
            {data.map(item => (
               <Col>
                  <StoreItem key={item.id}  {...item} />
               </Col> 
            ))}
            
        </Row>
    </>
    ) 
}