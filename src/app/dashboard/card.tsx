import React from "react";

const Card = ({
  title,
  value,
  date,
}: {
  title: string;
  value: string;
  date: string;
}) => {
  return (
    <div className="flex flex-col justify-between p-6 bg-white shadow-md rounded-lg w-full max-w-[370px]">
      <div>
        <h3 className="text-gray-500 font-medium text-sm mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <p className="text-xs text-gray-400 mt-4">{date}</p>
    </div>
  );
};

const DashboardCards = ({
  data,
}: {
  data: { title: string; value: number; date: string }[];
}) => {
  return (
    <div className="flex flex-wrap gap-1 items-center justify-between w-full">
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          value={String(item.value)}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
