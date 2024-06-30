import  { useEffect, useState } from 'react';
import { Col, List, Row,  Typography,  notification } from 'antd';
import InventaryForm from './InventaryForm';
import { map,  size } from 'lodash';
import Chat from './Chat';
import { BASE_URL, columns } from '../utils/data';
import ChartComponent from './ChartComponent';

const { Title } = Typography;
const Inventory = () => {
  const [inventory, setInventory] = useState([{}]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchInventory = async () => {
    try {
      setIsFetching(true);
      const response = await fetch(`${BASE_URL}/inventory`, {
        method: 'GET',
      });
      if (!response.ok) {
        setIsFetching(false);
        return notification.error({
          description: 'Error making the request to the API',
          message: 'Error',
        });
      }

      setIsFetching(false);
      const data = await response.json();

      setInventory(data);

    } catch (error) {
      console.error('Error: ', error);

      notification.error({
        description: 'Error',
        message: error,
      });
      setIsFetching(false);
      return null;
    }
  };
  const onSubmitDelete = async (data) => {
    const formData = new FormData();
    formData.append('id', data?.id);
    formData.append('brand', data?.brand);
    formData.append('price', data?.price);
    formData.append('quantity', data?.quantity);

    const response = await fetch(`${BASE_URL}/inventory/delete`, {
      method: 'DELETE',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setInventory(data);
      notification.success({
        description: 'Element successfully deleted',
        message: 'Deletion successful',
      });
    } else {
      notification.success({
        description: 'Element not successfully deleted',
        message: 'Error deletion',
      });
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('brand', data?.brand);
    formData.append('price', data?.price);
    formData.append('quantity', data?.quantity);

    if(data.id) {
      formData.append('id', data?.id);

      const response = await fetch(`${BASE_URL}/inventory/update`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setInventory(data);
        notification.success({
          description: 'Element successfully edited',
          message: 'Edition successful',
        });
      } else {
        notification.success({
          description: 'Element not successfully edited',
          message: 'Error edition',
        });
      }
      

    }
    else{
      const response = await fetch(`${BASE_URL}/inventory/add`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setInventory(data);
        notification.success({
          description: 'Element successfully created',
          message: 'Creation successful',
        });
      } else {
        notification.success({
          description: 'Element not successfully created',
          message: 'Error creation',
        });
      }

      
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    (
      <>
        <Title level={2} style={{ textAlign: 'center' }}>Inventory list</Title>
        <Title level={5} style={{ textAlign: 'center' }}>{`Number of records: ${size(inventory)}`}</Title>
        <div style={{ height: '450px', overflowY: 'auto', marginBottom: 50 }}>
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
              {
                isFetching 
                  ? 'Loading...'
                  : map(inventory, (item) => (
                    <Col key={item.id} span={24}>
                      <InventaryForm
                        initialValues={item}
                        onSubmit={onSubmit}
                        onSubmitDelete={onSubmitDelete}
                      />
                    </Col>
                  ))
              }
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
        

        <Row gutter={16} style={{ marginTop: 100 }}>
          <Col span={12}>
            <div style={{ border: '1px solid #ccc', padding: '10px', background: 'rgba(  250, 249, 249  )' }}>
              <Chat />
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