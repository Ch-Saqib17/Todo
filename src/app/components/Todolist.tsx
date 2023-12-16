"use client"
import { Todo } from "@/src/lib/drizzle";
import React, { useState, useEffect } from "react";

interface ApiResponse {
  data: Todo[];
}

const getData = async (baseUrl: string): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${baseUrl}/api/todo`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const result: ApiResponse = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Todolist: React.FC = () => {
  const [data, setData] = useState<ApiResponse>({ data: [] });

  useEffect(() => {
    const baseUrl = "";

    const fetchData = async () => {
      try {
        const result = await getData(baseUrl);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]); 
  return (
    <div className="max-h-[400px] overflow-auto">
      {data.data.length > 0 ? (
        data.data.map((item) => (
          <div
            key={item.id}
            className="bg-gray-200 py-4 px-4 flex shadow rounded-lg items-center  gap-x-3 my-2 mr-2"
          >
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-medium ">{item.task}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Todolist;

