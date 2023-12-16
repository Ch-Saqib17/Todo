"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { NewTodo } from "@/src/lib/drizzle";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  
  const { refresh } = useRouter();

  const handelsubmit = async () => {
    try {
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            task: task.task,
          }),
        });
        console.log(res.ok);
      
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <form className="w-full flex gap-x-3 mt-4">
        <input
          onChange={(e) => setTask({ task: e.target.value })}
          type="text"
          placeholder="Add Task"
          className="rounded-full w-full py-3.5 px-5 border focus:outline-secondary "
        />
        <button
          type="button"
          onClick={handelsubmit}
          className=" bg-gradient-to-b from-primary to-secondary rounded-full p-4 shrink-0"
        >
          <Image src={"/send.png"} alt={""} width={20} height={20} />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
