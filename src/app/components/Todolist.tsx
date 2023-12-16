

import { Todo } from "@/src/lib/drizzle";
import React, { useState } from "react";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const Todolist = async () => {
  const res: { data: Todo[] } = await getData();

  return (
    <div className="max-h-[400px] overflow-auto">
        {/* {res.data.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-gray-200 py-4 px-4 flex shadow rounded-lg items-center  gap-x-3 my-2 mr-2"
          >
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-medium ">{item.task}</p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Todolist;
