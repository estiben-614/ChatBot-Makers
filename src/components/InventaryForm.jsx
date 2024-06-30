import { Button, Form, Input, InputNumber, Row, Space } from 'antd';
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
      <Item name="key" hidden />
      <Row justify="space-between">
        <Item
          name="computer"
          style={{ width: 200 }}
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Item>

        <Item
          name="quantity"
          style={{ width: 100 }}
          rules={[{ required: true }]}
        >
          <InputNumber size="large" min={1} />
        </Item>

        <Item
          name="price"
          style={{ width: 100 }}
          rules={[{ required: true }]}
        >
          <InputNumber size="large"   min={1}/>
        </Item>

        <Item
          name="total"
          style={{ width: 100 }}
          dependencies={['quantity', 'price']}
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
                {
                  (onSubmitDelete) && (
                    <Item>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => onSubmitDelete(initialValues)}
                        danger
                      />
                    </Item>
                  )
                }
                
                <Item>
                  <Button icon={<EditOutlined />}  htmlType="submit" type="dashed">
                    Edit
                  </Button>
                </Item>
                
              </Space>
            </>
          )}
      </Row>
    </Form>
  );
}
