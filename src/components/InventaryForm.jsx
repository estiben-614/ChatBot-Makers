import { Button, Form, Input, InputNumber, Popconfirm, Row, Space } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

const { Item, useForm } = Form;

export default function InventaryForm({ initialValues = {}, onSubmit, onSubmitDelete }) {
  const [form] = useForm();

  useEffect(() => {
    initialValues && form.setFieldsValue(initialValues);
  }, [initialValues]);
  
  return (
    <Form initialValues={initialValues} onFinish={onSubmit} form={form}>
      <Item name="id" hidden />
      <Row justify="space-between">
        <Item
          name="brand"
          style={{ width: 200 }}
          rules={[{ required: true }]}
        >
          <Input size="large" placeholder='Computer'/>
        </Item>

        <Item
          name="quantity"
          style={{ width: 100 }}
          rules={[{ required: true }]}
        >
          <InputNumber size="large" min={1} placeholder='Quantity'/>
        </Item>

        <Item
          name="price"
          style={{ width: 100 }}
          rules={[{ required: true }]}
        >
          <InputNumber size="large"   min={1} placeholder='Price'/>
        </Item>

        <Item
          name="total"
          style={{ width: 100 }}
          dependencies={['quantity', 'price']}
          initialValue={(initialValues?.quantity * initialValues?.price) ?? 0}
          rules={[
            ({ getFieldValue, setFieldValue }) => ({
              validator: () => {
                const price = getFieldValue('price');
                const quantity = getFieldValue('quantity');
                if(price && quantity) {
                  setFieldValue('total', price * quantity);
                }
                
                return Promise.resolve();
              },
            }),
          ]}
        >
          <InputNumber size="large" disabled/>
        </Item>

        {isEmpty(initialValues)
          ? (
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Save
              </Button>
            </Item>
          )
          : (
            <>
              <Space>

                <Item>
                  <Button icon={<EditOutlined />}  htmlType="submit" type="dashed">
                    Edit
                  </Button>
                </Item>
                {
                  (onSubmitDelete) && (
                    <Item>
                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this element?"
                        onConfirm={() => onSubmitDelete(initialValues)}
                        okText="Yes"
                      >
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                        />
                      </Popconfirm>
                      
                    </Item>
                  )
                }
                
                
              </Space>
            </>
          )}
      </Row>
    </Form>
  );
}
