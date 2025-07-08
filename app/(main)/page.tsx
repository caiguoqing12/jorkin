"use client";
import { useState, useEffect } from "react";
import { useModal } from "@/component/ModalProvider";
import { AddIcon } from "@/component/icons";

export default function Home() {
  const { openModal } = useModal("addLeetCode");

  const [list, setList] = useState<
    {
      id: string;
      title: string;
      content: string;
      time: string;
      answer: string;
    }[]
  >([]);
  const getList = async () => {
    const res = await fetch("/api/leetcode");
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end">
        <div
          className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[var(--color-primary)] text-white cursor-pointer"
          onClick={() => openModal({updateFunc: getList})}
        >
          <AddIcon className="w-[16px] h-[16px]" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {list.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 bg-amber-50 p-4 rounded-lg shadow-md cursor-pointer">
            <div className="flex items-center justify-between">
              <div>{item.title}</div>
              <div>{item.time}</div>
            </div>
            <div className="text-sm text-gray-500">{item.content}</div>
            <div className="text-sm text-gray-500">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
