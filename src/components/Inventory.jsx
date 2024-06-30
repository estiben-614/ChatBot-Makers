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

      const newInventary = map(inventory, (i) => (
        i.key === newData.key ? newData : i
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
        <Title level={2} style={{ textAlign: 'center' }}>Inventory list</Title>
        <Title level={5} style={{ textAlign: 'center' }}>{`Number of records: ${size(inventory)}`}</Title>
        <div style={{ height: '450px', overflowY: 'auto' }}>
          <List
            header={
              <Row gutter={10} justify="space-between">
                {map(columns, ({ title, key }) => (
                  <Col key={key}>
                    <h3>{title}</h3>
                  </Col>
                ))}
              </Row>
            }
          >
            <Row>
              {map(inventory, (item) => (
                <Col key={item.id} span={24}>
                  <InventaryForm
                    initialValues={item}
                    onSubmit={onSubmit}
                    onSubmitDelete={onSubmitDelete}
                  />
                </Col>
              ))}
            </Row>
          </List>
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: 'rgba(  250, 249, 249  )',
              zIndex: 1000,
              border: '1px solid #ccc',
            }}
          >
            <Col span={24}>
              <InventaryForm onSubmit={onSubmit} />
            </Col>
          </div>
        </div>
        

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: 'rgba(  250, 249, 249  )' }}>
              <Chat inventory={inventory} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: 'rgba(  250, 249, 249  )' }}>
              <ChartComponent inventory={inventory} />
            </div>
          </Col>
        </Row>
        
      </>
    )
  );
};
export default Inventory;