import Router from 'next/router';
import { ControllerDate } from '../../library/Time';

interface LastNewsProps {
  title: string;
  time: Date;
}

const LastNews = ({ time, title }: LastNewsProps) => {
  const handleNews = () => {
    const parsedUrl = title.replaceAll(' ', '_');
    Router.push(`/news/${parsedUrl}`);
  };

  return (
    <div className="flex border-b py-1 cursor-pointer" onClick={handleNews}>
      <p className="font-medium text-red-500 mr-2 text-sm">
        {ControllerDate.parseOnlyTime(time)}
      </p>
      <p className="text-sm">{title}</p>
    </div>
  );
};

export default LastNews;
