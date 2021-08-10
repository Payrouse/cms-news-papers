import Router from 'next/router';

interface LastNewsProps {
  title: string;
  time: string;
}

const LastNews = ({ time, title }: LastNewsProps) => {
  const handleNews = () => {
    Router.push('/news/chuleta-asada');
  };

  return (
    <div className="flex border-b py-1 cursor-pointer" onClick={handleNews}>
      <p className="font-medium text-red-500 mr-2 text-sm">{time}</p>
      <p className="text-sm">{title}</p>
    </div>
  );
};

export default LastNews;


