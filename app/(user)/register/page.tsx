"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: { login: string; password: string; name: string }) => {
    try {
      setLoading(true);
      const r = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      const data = await r.json();
      if (data.success) {
        router.replace("/login");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-[420px]"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Please input your account!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Account"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            Log in
          </Button>
          or <Link href="/register">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Page;
