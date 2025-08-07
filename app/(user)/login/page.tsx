"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Page: React.FC = () => {
  const { refresh } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: { login: string; password: string }) => {
    try {
      setLoading(true);
      const r = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // 确保接收和发送cookie
        body: JSON.stringify(values),
      });
      const data = await r.json();
      if (data.success) {
        await refresh(); // 登录成功后刷新登录态
        router.replace("/");
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
          name="login"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
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
