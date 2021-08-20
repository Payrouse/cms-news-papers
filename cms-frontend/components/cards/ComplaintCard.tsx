import React from 'react';
import { Complaint } from '../../models/complaint.model';
import EventIcon from '@material-ui/icons/Event';

const ComplaintCard = (complaint: Complaint) => {
  return (
    <div className=" my-4 mx-15 items-stretch md:items-center md:justify-evenly bg-white w-full px-6 py-4 flex items:strech shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <h1 className="font-bold overflow-hidden w-1/7">{complaint.title}</h1>
      <p className="overflow-hidden w-1/2 text-justify">
        {complaint.description}
      </p>
      <div className="overflow-hidden w-1/10 flex items-stretch md:items-center md:justify-evenly">
        <EventIcon className="text-blue-600 hover: text-blue-900 mx-2" />
        <h3 className="font-italic">{complaint.updatedAt.split('T')[0]}</h3>
      </div>
    </div>
  );
};

export default ComplaintCard;
