import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const RdvClient = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    // Check if email is available
    if (!email) {
      setError('Email parameter is missing');
      setLoading(false);
      return;
    }

    const fetchClientRdvs = async () => {
      try {
        setLoading(true);
        console.log('Fetching RDVs for email:', email);
        
        const response = await axios.get(
          `${API_URL}/api/demo/client-rdvs-by-email/${encodeURIComponent(email)}`
        );
        
        console.log('API Response:', response.data);
        
        if (response.data && Array.isArray(response.data.rdvs)) {
          setRdvs(response.data.rdvs);
        } else {
          setError('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching RDVs:', err);
        setError(err.response?.data?.message || 'Failed to fetch RDVs');
      } finally {
        setLoading(false);
      }
    };

    fetchClientRdvs();
  }, [email, API_URL]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      postponed: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-8">Loading RDVs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (rdvs.length === 0) {
    return <div className="text-center py-8">No RDVs found for this user.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your RDV Requests</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rdvs.map((rdv) => (
                <tr key={rdv.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rdv.metadata.name}</div>
                    <div className="text-sm text-gray-500">{rdv.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rdv.metadata.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rdv.metadata.sector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(rdv.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rdv.status === 'approved' && rdv.approvedDate && (
                      <div>
                        <div className="font-medium">Approved:</div>
                        {format(new Date(rdv.approvedDate), 'PPpp')}
                      </div>
                    )}
                    {rdv.status === 'postponed' && rdv.postponedDate && (
                      <div>
                        <div className="font-medium">Postponed:</div>
                        {format(new Date(rdv.postponedDate), 'PPpp')}
                      </div>
                    )}
                    {!['approved', 'postponed'].includes(rdv.status) && (
                      <div>
                        <div className="font-medium">Created:</div>
                        {format(new Date(rdv.createdAt), 'PPpp')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {rdv.adminNotes || 'No notes'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RdvClient;