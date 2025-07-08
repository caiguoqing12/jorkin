"use client";
import { Modal, Form, Input } from "antd";
import { useModal } from "../ModalProvider";

export default function AddLeetCodeModal() {
  const addModal = useModal("addLeetCode");
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      // 这里可以保存数据
      await fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (typeof addModal.params?.updateFunc === "function") {
        addModal.params.updateFunc();
      }
      addModal.closeModal();
      form.resetFields();
    });
  };
  return (
    <>
      <Modal
        open={addModal.open}
        onCancel={addModal.closeModal}
        onOk={handleOk}
        title="新增"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: "请输入内容" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="answer"
            label="答案"
            rules={[{ required: true, message: "请输入答案" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
