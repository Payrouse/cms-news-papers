import React, { useEffect, useState } from 'react';
import { FetchApi } from '../../../library/Http';
import { Complaint } from '../../../models/complaint.model';
import ComplaintCard from '../../cards/ComplaintCard';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  async function getComplaints() {
    const { data } = await FetchApi({
      url: '/complaints/public',
      method: 'GET',
    });

    setComplaints(data);
  }

  useEffect(() => {
    getComplaints();
  }, []);

  return (
<div className="w-full h-screen custom-scroll">
      <div className="w-full px-2 items-stretch">
        {complaints.map((c) => (
          <div key={c.complaintId}>
          {
            ComplaintCard(c)
          }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsList;
