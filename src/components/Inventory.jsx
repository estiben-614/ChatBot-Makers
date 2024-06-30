import  { useEffect, useState } from 'react';
import { Col, List, Row,  Typography,  notification } from 'antd';
import InventaryForm from './InventaryForm';
import { filter, isEmpty, map, orderBy,  size } from 'lodash';
import Chat from './Chat';
import { columns, data } from '../utils/data';
import ChartComponent from './ChartComponent';

const { Title } = Typography;

const Inventory = () => {
  const [inventory, setInventory] = useState(orderBy(JSON.parse(localStorage.getItem('inventory')), 'key') || data);
  console.log(inventory);
  const onSubmitDelete = (data) => {
    const newInventary = filter(inventory, (d) => d.key !== data.key);
    setInventory(newInventary);
    notification.success({
      description: 'Element successfully deleted',
      message: 'Deletion successful',
    });
  };

  const onSubmit = (data) => {
    const newData = {
      ...data,
      key: data.key ?? size(inventory) + 1,
    };
    const exist = inventory.find((item) => item.key === newData.key);
    if(!isEmpty(exist)) {

      const newInventary = map(inventory, (d) => (
        d.key === newData.key ? newData : d
      ));
      
      setInventory(newInventary);

      notification.success({
        description: 'Element successfully edited',
        message: 'Edition successful',
      });
    }
    else{
      setInventory(
        [
          ...inventory,
          newData,
        ],
      );
      notification.success({
        description: 'Element successfully created',
        message: 'Creation successful',
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  return (
    (
      <>
        <Title level={2}>Inventory list</Title>
        <Title level={5}>{`Number of records: ${size(inventory)}`}</Title>
        <List
          header={
            (
              <Row gutter={10} justify="space-between">
                {map(columns,({ title, key }) => (
                  <Col key={key}>
                    <h3>{title}</h3>
                  </Col>
                ))}
              </Row>
            )
          }
        >
          {
            map(inventory, (d) => (
              <InventaryForm initialValues={d} onSubmit={onSubmit} onSubmitDelete={onSubmitDelete}/>
            ))
          }
          
          <InventaryForm onSubmit={onSubmit}/>
        </List>
        

        <Row gutter={16}>
          <Col span={12}>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <Chat inventory={inventory} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <ChartComponent inventory={inventory} />
            </div>
          </Col>
        </Row>
        
      </>
    )
  );
};
export default Inventory;